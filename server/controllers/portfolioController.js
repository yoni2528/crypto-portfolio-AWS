const mongoose = require("mongoose");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const Portfolio = require("../models/portfolioModel");
const Tokens = require("../models/tokensModel");

const getTokenPrices = async (tokenList) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenList.join(
      ","
    )}&vs_currencies=usd`
  );
  return res.data;
};

exports.createPortfolio = catchAsync(async (req, res, next) => {
  const newpPortfolio = await Portfolio.create({ totalBalance: 0 });
  req.portfolio = newpPortfolio;
  res.status(200).json({
    status: "succeed",
    message: "You succesfully signed up",
  });
});

exports.updatePortfolio = catchAsync(async (req, res, next) => {
  const currPortfolio = req.user.portfolio.toHexString();
  if (req.newTokenId) {
    const currTokenId = req.newTokenId._id.toHexString();
    const transactionId = req.transaction._id.toHexString();
    await Portfolio.findByIdAndUpdate(
      currPortfolio,
      {
        $addToSet: { tokens: currTokenId, transactions: transactionId },
      },
      { new: true }
    );
  }
  if (req.deleteTokenId) {
    Portfolio.updateMany({ $pull: { tokens: req.deleteTokenId } }).exec();
  }

  res.status(200).json({
    status: "success",
    message: "You succesfully submitted a new token",
  });
});

exports.getPortfolioDetails = catchAsync(async (req, res, next) => {
  const currPortfolio = req.user.portfolio.toHexString();
  const portfolio = await Portfolio.findById(currPortfolio).populate("tokens");

  res.status(200).json({
    status: "Succeed",
    data: portfolio,
  });
});

exports.refreshTokenPrices = catchAsync(async (req, res, next) => {
  const currPortfolio = req.user.portfolio.toHexString();
  const portfolio = await Portfolio.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(currPortfolio) },
    },
    {
      $unwind: "$tokens",
    },
    {
      $lookup: {
        from: "tokens",
        localField: "tokens",
        foreignField: "_id",
        as: "token_docs",
      },
    },
    {
      $unwind: "$token_docs",
    },
    {
      $group: {
        _id: null,
        names: { $push: "$token_docs.name" },
      },
    },
  ]);
  const tokenList = portfolio[0].names;

  const fetchUpdatedPrices = await getTokenPrices(tokenList);

  tokenList.forEach(async (token) => {
    await Tokens.updateOne(
      { name: token },
      {
        price: fetchUpdatedPrices[token].usd,
      }
    );
  });

  res.status(200).json({
    status: "Succeed",
    data: portfolio,
  });
});
