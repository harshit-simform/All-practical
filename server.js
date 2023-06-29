require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// connecting to database
mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
  console.log('connection to database is established');
});

const port = process.env.PORT || 3000;

// staritng and listening to server
const server = app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
