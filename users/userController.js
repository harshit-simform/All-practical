const express = require("express");
const dbConfig = require("../databaseConfig");
const {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
} = require("../factoryFunctions");

const router = express.Router();

router
  .route("/")
  .get(getAllData(dbConfig.User, "Users"))
  .post(
    createData(dbConfig.User, "User", ["name", "email", "password", "address"])
  );

router
  .route("/:id")
  .get(getData(dbConfig.User, "User"))
  .patch(
    updateData(dbConfig.User, "User", ["name", "email", "password", "address"])
  )
  .delete(deleteData(dbConfig.User, "User"));

module.exports = router;
