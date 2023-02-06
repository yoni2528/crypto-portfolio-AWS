const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    tokens: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tokens",
        cascade: true,
      },
    ],
    transactions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Transaction",
        cascade: true,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

portfolioSchema.virtual("totalBalance").get(function () {
  const totalBalance = this.tokens.reduce((a, b) => a + b.total, 0);
  return totalBalance;
});

portfolioSchema.virtual("totalProfit").get(function () {
  const totalProfit = this.tokens.reduce((a, b) => a + b.profitOrLoss, 0);
  return totalProfit;
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
