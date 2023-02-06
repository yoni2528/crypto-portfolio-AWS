const customError = (title, message, status, res) => {
  res.status(status).json({
    title: title,
    message: message,
  });
};

const errorControl = (err, req, res, next) => {
  if (err.code === 11000) {
    customError(
      "Duplication Error",
      `An account with the email ${err.keyValue.email} already exists.`,
      400,
      res
    );
  } else if (err.status === 401) {
    if (err.message === "Wrong Password") {
      customError(
        "Wrong password",
        "Invalid password, Please check your information and try again",
        401,
        res
      );
    } else {
      customError(
        "Login faild",
        "Invalid email or password, Please check your information and try again",
        401,
        res
      );
    }
  } else if (err.errors) {
    if (err.errors.passwordConfirm.properties.path === "passwordConfirm") {
      customError("Password Mismatch", "Passwords do not match", 401, res);
    }
  } else {
    res.status(404).json({
      title: "Server Error",
      message: "Somthing Went Wrong..",
    });
  }
};

module.exports = errorControl;
