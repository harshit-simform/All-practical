const express = require("express");
const http = require("http");
require("dotenv").config({ path: "../config.env" });

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
