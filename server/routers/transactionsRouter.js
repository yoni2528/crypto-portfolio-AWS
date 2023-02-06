const express = require("express");
const TransactionController = require("../controllers/TransactionController");
const authContoller = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authContoller.protect, TransactionController.getAllTransactions);

module.exports = router;
