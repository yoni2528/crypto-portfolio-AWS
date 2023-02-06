const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    side: {
      type: String,
      enum: ["buy", "sell"],
      required: [true, "transaction must have side"],
    },
    token: {
      type: String,
      required: [true, "transaction must have token"],
    },
    quantity: {
      type: Number,
      required: [true, "transaction must have quantity"],
    },
    price: {
      type: Number,
      required: [true, "transaction must have a price"],
    },
    date: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    portfolio: {
      type: mongoose.Schema.ObjectId,
      ref: "Portfolio",
      required: [true],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
