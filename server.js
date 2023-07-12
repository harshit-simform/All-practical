const dotenv = require("dotenv");
dotenv.config();
const dbConfig = require("./databaseConfig");
const app = require("./app.js");
(async () => {
  try {
    await dbConfig.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
// console.log(dbConfig.User);

module.exports = { server, dbConfig };
