const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Token must have a name"],
    },
    symbol: {
      type: String,
      required: [true, "Token must have a symbol"],
    },
    initialPrice: {
      type: Number,
      required: [true, "Token must have initialPrice"],
    },
    price: {
      type: Number,
      required: [true, "Token must have price"],
    },
    quantity: {
      type: Number,
      required: [true, "Token must have quantity"],
    },
    img: {
      type: String,
      required: [true, "Token must have a image"],
    },
    lastDayProfit: {
      type: String,
      required: [true, "Token must have a image"],
    },
    portfolio: {
      type: mongoose.Schema.ObjectId,
      ref: "Portfolio",
      required: [true],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tokensSchema.virtual("total").get(function () {
  return this.price * this.quantity;
});
tokensSchema.virtual("averegaeBuyPrice").get(function () {
  return (this.initialPrice + this.price) / 2;
});
tokensSchema.virtual("profitOrLoss").get(function () {
  return this.initialPrice * this.quantity - this.price * this.quantity;
});

const Token = mongoose.model("Tokens", tokensSchema);

module.exports = Token;
