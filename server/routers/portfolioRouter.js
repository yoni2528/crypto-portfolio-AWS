const express = require("express");
const portfolioController = require("../controllers/portfolioController");
const authContoller = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authContoller.protect, portfolioController.getPortfolioDetails);

router.get(
  "/refresh-list",
  authContoller.protect,
  portfolioController.refreshTokenPrices,
  portfolioController.updatePortfolio
);

module.exports = router;
