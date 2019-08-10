const express = require("express");
const router = express.Router();

// First task create the authors
// import the authors from the models folder
const Author = require("../models/Author");

// GET - to display the form for Creating the authors
router.get("/authors/new", (req, res, next) => {
  // make sure you seel all the folder that are inside the "views" folder,
  // you dont have to specify "views" folder
  res.render("author-views/new-author")
});

// POST routes to create a new author in the DB
{/* <form action="/authors/create" method="POST"></form> */}
router.post("/authors/create", (req, res, next) => {
  console.log("THE FORM ", req.body);
  Author
    .create(req.body)
    .then( newAuthor => res.redirect("/authors"))
    .catch(err => console.log('error'))
});

router.get("/authors", (req, res, next) => {
  Author
    .find() // ALWAYS RETURNS AND ARRAY
    .then(authorsFromDB => res.render("author-views/allAuthors", { authors: authorsFromDB}))
    .catch(err => console.log("Error while getting the authors from the DB: ", err));
})
// in order to use routes anywhere else in the app, we have to export them 
module.exports = router;