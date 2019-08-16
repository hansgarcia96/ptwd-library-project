const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const Author = require("../models/Author");

// GET 
router.get("/books/new", (req, res, next) => {
  Author
  .find()
  .then(allAuthors => res.render("book-views/new-book", { allAuthors}))
  .catch(err => console.log(" while displaying form for new book: ", err));
  res.render("book-views/new-book")
});

// POST
router.post("/books/create", (req, res, next) => {
  // console.log("THE FORM ", req.body);
  Book
    .create(req.body)
    .then( newBook => console.log("NEW BOOK: ", newBook))
    .catch(err => console.log('error while creating a new book'))
});

router.get("/books", (req, res, next) => {
  Book
    .find() // ALWAYS RETURNS AND ARRAY
    .then(booksFromDB => res.render("book-views/allBooks", { books: booksFromDB }))
    .catch(err => console.log("Error while getting the books from the DB: ", err));
});


// POST Route to delete the book
router.post("/books/:theId/delete", (req, res, next) => {
  Book
    .findByIdAndDelete(req, param.theId)
    .then()
    .catch()
});

// GET route to display the form for updating 
router.get("/books/:theId/edit", (req, res, next) =>{
  Book
    .then( theBook => {
      Author
        .find()
        .then(allAuthors => {
          allAuthors.forEach(theAuthor => {
            if(theBook.author.equals(theAuthor._id)){
              theAuthor.isWriter = true;
            }
          });
        res.render("book-views/editBook", {theBook, allAuthors });
        })
        .catch(err => console.log("Error while getting all the authors: ", err));
    })
    .catch(err => console.log("Error while getting the book from the DB: ", err));
})

// POST Route to save the update
router.post("/books/:id/update", (req, res, next) => {
  Book
    // find by id and pass new req.body"theform" to replace prev doc in the DB
    .findByIdAndUpdate(req.params.id, req.body)
    .then(updatedBook => res.redirect(`/book/${updatedBook._id}`))
    .catch(err => console.log("Error while updating the book: ", err))
});

// GET route for displaying book details page
router.get("/books/:bookId", (req, res, next) => {
  Book
    .findById(req.params.bookId)
    .populate('author')
    .then(theBook => {
      // console.log("Details page: ", theBook)
      // Author.findById(theBook.author)
      res.render("book-views/bookDetails", { theBook });
    })
    .catch(err => console.log("Error while getting the details of the book: ", err));
});


// in order to use routes anywhere else in the app, we have to export them 
module.exports = router;