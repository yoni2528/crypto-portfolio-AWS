const catchAsync = require("../utils/catchAsync");

module.exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find({ portfolio: req.user.portfolio }).select(
      "-portfolio"
    );
    res.status(200).json({
      status: "succed",
      message: "well done",
      data,
    });
  });

module.exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.deleteOne({ _id: req.params.id });
    req.deleteTokenId = req.params.id;
    if (!data) throw new Error("no token found with those details");

    next();
  });

module.exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    if (!data) throw new Error("no token found with those details");
    next();
  });
