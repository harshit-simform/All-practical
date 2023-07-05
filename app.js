const express = require("express");
const app = express();
const dbConfig = require("./databaseConfig");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = YAML.load("./apidocs.yaml");

const userRouter = require("./users/userController");
const productRouter = require("./product/productController");
const orderRouter = require("./orders/orderController");
const orderDetailRouter = require("./orderDetails/orderDetailsController");
const {
  undeliverOrders,
  mostRecentOrders,
  topActiveUser,
  leastExpensiveOrder,
  mostExpensiveOrder,
  mostPurchasedProduct,
  inactiveUser,
  userData,
} = require("./queries");

app.use(express.json());

dbConfig.User.hasMany(dbConfig.Order);
dbConfig.Order.belongsTo(dbConfig.User);

dbConfig.Order.belongsToMany(dbConfig.Product, {
  through: { model: dbConfig.OrderDetails, unique: false },
});
dbConfig.Product.belongsToMany(dbConfig.Order, {
  through: { model: dbConfig.OrderDetails, unique: false },
});

dbConfig.Product.hasMany(dbConfig.OrderDetails);
dbConfig.OrderDetails.belongsTo(dbConfig.Product);

dbConfig.sequelize.sync();
// dbConfig.sequelize.sync({ force: true });

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/order_details", orderDetailRouter);

app.get("/user-data", userData());
app.get("/undeliver-orders", undeliverOrders());
app.get("/most-recent-orders", mostRecentOrders());
app.get("/top-active-user", topActiveUser());
app.get("/inactive-user", inactiveUser());
app.get("/most-purchased-product", mostPurchasedProduct());
app.get("/most-expensive-order", mostExpensiveOrder());
app.get("/least-expensive-order", leastExpensiveOrder());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
