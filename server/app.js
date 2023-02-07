const express = require("express");
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-require
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routers/UserRouter");
const tokenRouter = require("./routers/tokenRouter");
const portfolioRouter = require("./routers/portfolioRouter");
const transactionsRouter = require("./routers/transactionsRouter");

const errorControl = require("./utils/errorControl");

const app = express();
app.use(express.json({ limit: "19kb" }));

app.use(morgan("combined"));

app.use(
  cors({
    allowedOrigins: [
      "https://euphonious-platypus-3e9ec5.netlify.app/",
      "https://d3h8860yi34pv.cloudfront.net/",
      "http://127.0.0.1:5173",
    ],
  })
);

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(mongoSanitize());
app.use(xss());

app.use(express.static(`${__dirname}/public`));

app.use("/test", (req, res) => {
  res.send("welcome to my server this is test number 8)");
});
app.use("/app/v1/users", userRouter);
app.use("/app/v1/tokens", tokenRouter);
app.use("/app/v1/portfolio", portfolioRouter);
app.use("/app/v1/transactions", transactionsRouter);

app.use(errorControl);

module.exports = app;
