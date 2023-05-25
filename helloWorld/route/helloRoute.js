const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("incoming request");
  res.status(200).send("Hello, world!");
});

module.exports = router;
