const catchAsync = require("../utils/catchAsync");
const Token = require("../models/tokensModel");
const factory = require("./handlerFactory");

exports.createToken = catchAsync(async (req, res, next) => {
  let tokenData;
  const tokenObj = {
    name: req.body.name,
    price: req.body.data.price,
    initialPrice: req.body.data.price,
    quantity: req.body.quantity,
    img: req.body.data.img,
    lastDayProfit: req.body.data.lastDayProfit,
    symbol: req.body.data.symbol,
    portfolio: req.user.portfolio.toHexString(),
  };

  const TokenExist = await Token.findOne({ name: req.body.name });

  if (TokenExist) {
    if (req.body.side === "buy") {
      tokenObj.quantity += TokenExist.quantity;
    }
    if (req.body.side === "sell") {
      tokenObj.quantity = TokenExist.quantity - tokenObj.quantity;
    }
    await TokenExist.update(tokenObj, { new: true });
    tokenData = await TokenExist.save();
  } else {
    // tokenObj.total = tokenObj.price * tokenObj.quantity;
    tokenObj.averegaeBuyPrice = tokenObj.price;
    tokenData = await Token.create(tokenObj);
  }
  req.token = tokenObj;
  req.newTokenId = tokenData;
  next();
});

module.exports.getAllTokens = factory.getAll(Token);
module.exports.deleteOneToken = factory.deleteOne(Token);
