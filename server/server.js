const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

mongoose.connect(
  process.env.DATABASE_URI.replace("<password>", process.env.DATABASE_PASSWORD),
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("DB CONNECTED ");
  }
);

app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});
