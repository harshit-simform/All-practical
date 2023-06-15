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
  .get(getAllData(dbConfig.Order, "Orders"))
  .post(
    createData(dbConfig.Order, "Order", [
      "userId",
      "order_status",
      "order_date",
      "delivery_date",
    ])
  );

router
  .route("/:id")
  .get(getData(dbConfig.Order, "Order"))
  .patch(
    updateData(dbConfig.Order, "Order", [
      "userId",
      "order_status",
      "order_date",
      "delivery_date",
    ])
  )
  .delete(deleteData(dbConfig.Order, "Order"));

module.exports = router;
