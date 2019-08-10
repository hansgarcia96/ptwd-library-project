const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  // firstName: { type: String }
  firstName: String,
  lastName: String,
  nationality: String,
  birthday: Date,
  imageUrl: { type: String, default: ""}
}, {
  timestamps: true // keeps record of creation and update date
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
