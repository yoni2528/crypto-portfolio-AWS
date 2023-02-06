const Transaction = require("../models/transactionsModel");
const catchAsync = require("../utils/catchAsync");
const Portfolio = require("../models/portfolioModel");

exports.createTrans = catchAsync(async (req, res, next) => {
  const dataObj = {
    token: req.body.name,
    side: req.body.side,
    price: req.body.data.price,
    quantity: req.body.quantity,
    portfolio: req.user.portfolio,
  };

  const data = await Transaction.create(dataObj);

  req.transaction = data;
  if (!data) throw new Error("no token found with those details");
  next();
});

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const data = await Portfolio.aggregate([
    {
      $match: { _id: req.user.portfolio },
    },
    {
      $unwind: "$transactions",
    },
    {
      $lookup: {
        from: "transactions",
        localField: "transactions",
        foreignField: "_id",
        as: "transactions_docs",
      },
    },
    { $unwind: "$transactions_docs" },
    {
      $group: {
        _id: { month: { $month: "$transactions_docs.date" } },
        totalBuy: {
          $sum: {
            $cond: [
              { $eq: ["$transactions_docs.side", "buy"] },
              {
                $multiply: [
                  "$transactions_docs.quantity",
                  "$transactions_docs.price",
                ],
              },
              0,
            ],
          },
        },
        totalSell: {
          $sum: {
            $cond: [
              { $eq: ["$transactions_docs.side", "sell"] },
              {
                $multiply: [
                  "$transactions_docs.quantity",
                  "$transactions_docs.price",
                ],
              },
              0,
            ],
          },
        },
      },
    },
  ]);

  if (!data) throw new Error("no token found with those details");
  res.status(200).json({
    status: "Succed",
    message: "Well Done",
    data,
  });
});
