require("dotenv").config({ path: "../config.env" });
const express = require("express");
const helloRoute = require("./route/helloRoute");

const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => [
  console.log(`server is running on port ${port}`),
]);

app.use("/", helloRoute);

app.all("*", (req, res) => {
  res.status(404).send("These routes are yet not implemented!");
});
