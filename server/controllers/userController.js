const multer = require("multer");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const multerUtils = require("../utils/multerUtils");

const upload = multer({
  storage: multerUtils.multerStorage,
  fileFilter: multerUtils.multerFilter,
});

exports.uploadUserImage = upload.single("image");

exports.createImageFolder = catchAsync(async (req, res, next) => {
  const directory = `./public/${req.user.email}`;
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    fs.unlinkSync(`${directory}/${file}`);
  });
  next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const objData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  const data = await User.findByIdAndUpdate(
    req.user._id,
    { firstName: objData.firstName, lastName: objData.lastName },
    { new: true }
  );

  res.status(200).json({
    status: "Succed",
    data,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const data = await User.findOne({ _id: req.user._id });

  res.status(200).json({
    status: "Succed",
    data,
  });
});

exports.setUserImage = catchAsync(async (req, res, next) => {
  const imagePath = String(req.file.filename);
  const data = await User.findByIdAndUpdate(
    req.user._id,
    {
      image: imagePath,
    },
    { new: true }
  );

  res.status(200).json({
    status: "Succed",
    data,
  });
});
