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
  .get(getAllData(dbConfig.OrderDetails, "OrderDetails"))
  .post(
    createData(dbConfig.OrderDetails, "OrderDetails", ["orderId", "productId"])
  );

router
  .route("/:id")
  .get(getData(dbConfig.OrderDetails, "OrderDetails"))
  .patch(
    updateData(dbConfig.OrderDetails, "OrderDetails", ["orderId", "productId"])
  )
  .delete(deleteData(dbConfig.OrderDetails, "OrderDetails"));

module.exports = router;
