const jwt = require("jsonwebtoken");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Portfolio = require("../models/portfolioModel");
const ErrorHandler = require("../utils/errorHandler");

const signtToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const verifyToken = async (token) => {
  const isVerfied = await jwt.verify(token, process.env.JWT_SECRET, {
    complete: true,
  });
  return isVerfied;
};

exports.signup = catchAsync(async (req, res, next) => {
  const userDataObj = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const user = await User.create(userDataObj);

  const newpPortfolio = await Portfolio.create({ totalBalance: 0 });

  await User.findByIdAndUpdate(user._id, { portfolio: newpPortfolio._id });

  req.user = user;
  fs.mkdir(`./public/${req.user.email}`, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });

  const token = await signtToken(req.user._id.toHexString());

  res.status(200).json({
    status: "succeed",
    message: "user succesfully Signed up",
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const currentUser = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!currentUser) throw new ErrorHandler("wrong details", 401);

  const isPasswordCorrect = await currentUser.comparePassowrds(
    req.body.password,
    currentUser.password
  );

  if (!isPasswordCorrect) throw new ErrorHandler("wrong details", 401);

  const token = await signtToken(currentUser._id.toHexString());

  res.status(200).json({
    status: "succeed",
    message: "user succesfully logged in",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) throw new Error("no authorization provided ");
  const token = req.headers.authorization.split(" ")[1];

  const isVerfied = await verifyToken(token);
  const userId = isVerfied.payload.id;
  const user = await User.findById(userId);

  if (!user) throw new Error("Please log in to get this data!");

  req.user = user;

  next();
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const currentUser = await User.findOne({ _id: req.user._id }).select(
    "+password"
  );

  const isPasswordCorrect = await currentUser.comparePassowrds(
    req.body.password,
    currentUser.password
  );

  if (!isPasswordCorrect) throw new ErrorHandler("Wrong Password", 401);

  currentUser.password = req.body.newPassowrd;

  currentUser.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "Succed",
    message: "your new password avalable on Email",
  });
});
