const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});

const File = mongoose.model("Files", fileSchema);

module.exports = File;
