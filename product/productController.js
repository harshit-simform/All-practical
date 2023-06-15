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
  .get(getAllData(dbConfig.Product, "Products"))
  .post(
    createData(dbConfig.Product, "Product", ["title", "amount", "description"])
  );

router
  .route("/:id")
  .get(getData(dbConfig.Product, "Product"))
  .patch(
    updateData(dbConfig.Product, "Product", ["title", "amount", "description"])
  )
  .delete(deleteData(dbConfig.Product, "Product"));

module.exports = router;
