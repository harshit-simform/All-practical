require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connection to database is established!!");
  })
  .catch((err) => {
    console.log("error connecting to database", err.message);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is started on port: ${port}`);
});
