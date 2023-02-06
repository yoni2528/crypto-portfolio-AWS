const express = require("express");
const tokenController = require("../controllers/tokenController");
const authContoller = require("../controllers/authController");
const portfolioController = require("../controllers/portfolioController");
const TransactionController = require("../controllers/TransactionController");

const router = express.Router();

router.use(authContoller.protect);

router
  .route("/")
  .post(
    tokenController.createToken,
    TransactionController.createTrans,
    portfolioController.updatePortfolio
  )
  .get(tokenController.getAllTokens);

router
  .route("/:id")
  .delete(tokenController.deleteOneToken, portfolioController.updatePortfolio);

module.exports = router;
