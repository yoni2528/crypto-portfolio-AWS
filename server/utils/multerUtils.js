const multer = require("multer");

exports.multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, `./public/${req.user.email}`);
  },

  filename: async (req, file, cb) => {
    await cb(null, `${Date.now()}.png`);
  },
});

exports.multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("upload a image"));
  }
};
