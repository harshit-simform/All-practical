require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
  console.log('connection to database is established');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
