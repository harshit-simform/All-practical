const dbConfig = require("./databaseConfig");

exports.undeliverOrders = () => async (req, res) => {
  console.log("undeliverOrders");
  try {
    const result = await dbConfig.Order.findAll({
      where: {
        order_status: "pending",
      },
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: dbConfig.User,
          attributes: ["name", "email"],
        },
        {
          model: dbConfig.Product,
          attributes: ["id", "title"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json({
      status: "success",
      totalOrder: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.mostRecentOrders = () => async (req, res) => {
  try {
    const result = await dbConfig.Order.findAll({
      order: [["order_date", "DESC"]],
      attributes: {
        exclude: ["userId"],
      },
      include: [
        {
          model: dbConfig.User,
          attributes: ["name", "email"],
        },
        {
          model: dbConfig.Product,
          attributes: ["title", "amount"],
          through: {
            attributes: [],
          },
        },
      ],
      limit: 5,
    });
    res.status(200).json({
      status: "success",
      totalOrder: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.topActiveUser = () => async (req, res) => {
  try {
    const result = await dbConfig.Order.findAll({
      group: ["userId"],
      attributes: [
        "userId",
        [
          dbConfig.sequelize.fn("COUNT", dbConfig.sequelize.col("userId")),
          "Total Orders",
        ],
      ],
      include: [
        {
          model: dbConfig.User,
          attributes: ["name", "email"],
        },
      ],
      order: [["Total Orders", "DESC"]],
      limit: 5,
    });

    res.status(200).json({
      status: "success",
      totalUser: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.inactiveUser = () => async (req, res) => {
  try {
    const result = await dbConfig.User.findAll({
      attributes: ["id", "name", "email", "address"],
      include: {
        model: dbConfig.Order,
        required: false,
      },
      where: {
        "$orders.id$": null,
      },
    });
    res.status(200).json({
      status: "success",
      totalUser: result.length,
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.mostPurchasedProduct = () => async (req, res) => {
  try {
    const result = await dbConfig.OrderDetails.findAll({
      group: ["productId"],
      attributes: [
        "productId",
        [
          dbConfig.sequelize.fn("COUNT", dbConfig.sequelize.col("productId")),
          "TotalPurchase",
        ],
      ],
      include: [
        {
          model: dbConfig.Product,
          attributes: ["title", "description", "amount"],
        },
      ],
      order: [["TotalPurchase", "DESC"]],
      limit: 5,
    });
    res.status(200).json({
      status: "success",
      totalProduct: result.length,
      products: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.mostExpensiveOrder = () => async (req, res) => {
  try {
    const result = await dbConfig.OrderDetails.findAll({
      group: ["orderId"],
      attributes: [
        "orderId",
        [
          dbConfig.sequelize.fn("SUM", dbConfig.sequelize.col("amount")),
          "Total Amount",
        ],
        [
          dbConfig.sequelize.literal(
            "GROUP_CONCAT(product.title SEPARATOR ', ')"
          ),
          "Product Purchased",
        ],
      ],
      include: [
        {
          model: dbConfig.Product,
          attributes: [],
        },
      ],
      order: [["Total Amount", "DESC"]],
      limit: 1,
    });
    res.status(200).json({
      status: "success",
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.leastExpensiveOrder = () => async (req, res) => {
  try {
    const result = await dbConfig.OrderDetails.findAll({
      group: ["orderId"],
      attributes: [
        "orderId",
        [
          dbConfig.sequelize.fn("SUM", dbConfig.sequelize.col("amount")),
          "Total Amount",
        ],
        [
          dbConfig.sequelize.literal(
            "GROUP_CONCAT(product.title SEPARATOR ', ')"
          ),
          "Product Purchased",
        ],
      ],
      include: [
        {
          model: dbConfig.Product,
          attributes: [],
        },
      ],
      order: ["Total Amount"],
      limit: 1,
    });
    res.status(200).json({
      status: "success",
      orders: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
