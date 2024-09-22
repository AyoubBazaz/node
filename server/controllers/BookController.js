const Book = require("../models/Book");
exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books", error: error.message });
    }
  };
  

exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete({ _id: req.params.id }).exec();
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
};

exports.addBook = async (req, res) => {
    const { title, author, description } = req.body;
  
    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }
  
    try {
      const newBook = new Book({
        title,
        author,
        description,
      });
  
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: "Error adding book", error: error.message });
    }
  };
  