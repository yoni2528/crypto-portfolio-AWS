const express = require("express");
const authContoller = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(authContoller.signup);
router.post("/login", authContoller.login);

router.use(authContoller.protect);

router.route("/").patch(userController.updateUser).get(userController.getUser);
router
  .route("/image")
  .post(
    userController.createImageFolder,
    userController.uploadUserImage,
    userController.setUserImage
  );

router.patch("/changePassword", authContoller.changePassword);

module.exports = router;
