const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  title: String,
  description: String,
  rating: Number,
  imageUrl: String,
  author: {
    type: Schema.Types.ObjectId,
    // this is telling us taht in author property of each book model we will have
    // saved ObjectId that belongs to Author model
    ref: "Author" // this is the collection
  }
},{
  timestamps: true
});
  
const Book = mongoose.model("Book", booksSchema);

module.exports = Book;