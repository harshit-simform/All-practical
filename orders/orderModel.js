module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_date: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      delivery_date: {
        type: DataTypes.DATE,
        defaultValue: () => {
          const currentDate = new Date();
          const randomDays = Math.floor(Math.random() * 3) + 3;
          const deliveryDate = new Date(
            currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000
          );
          return deliveryDate;
        },
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Order;
};
