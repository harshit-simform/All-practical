require("dotenv").config();
const express = require("express");

const app = express();
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
module.exports = app;
