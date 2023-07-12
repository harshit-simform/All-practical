const { Sequelize, Model, DataTypes, Op } = require("sequelize");

const databaseName =
  process.env.NODE_ENV === "testing"
    ? process.env.MYSQL_DATABASE_TEST
    : process.env.MYSQL_DATABASE;

const sequelize = new Sequelize(
  databaseName,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
  }
);

const User = require("./users/userModel")(sequelize, DataTypes);

const Product = require("./product/productModel")(sequelize, DataTypes);

const Order = require("./orders/orderModel")(sequelize, DataTypes);

const OrderDetails = require("./orderDetails/orderDetailModel")(
  sequelize,
  DataTypes
);
const connection = {};
connection.sequelize = sequelize;
connection.Sequelize = Sequelize;
connection.Model = Model;
connection.DataTypes = DataTypes;
connection.Op = Op;
connection.User = User;
connection.Product = Product;
connection.Order = Order;
connection.OrderDetails = OrderDetails;

module.exports = connection;
