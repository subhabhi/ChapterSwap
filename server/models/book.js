var mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
  name: String,
  publisher: String,
  availableQuantity: Number,
  totalQuantity: Number,
  totalPrice: Number,
  totalWorth: Number,
  publicationDate: Date,
  author: String,
  username: String,
  address: String,
  status: String,
  listDate: Date,
});

module.exports = mongoose.model("Book", BookSchema);
