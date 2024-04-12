const bcrypt = require("bcryptjs")
// The user schema
const User = require("../User")
const Book = require("../Book")

// User authentication with JSON Web Token
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET;

// Lists all the users
exports.getBooks = async (req, res) => {
    try {
        // User id comes from the auth middleware
        const userId = req.id;

        // Find the user by ID and populate the books field
        const books = await Book.find({ userId: userId });

        if (!books) {
            return res.status(404).json({ message: "Books not found" });
        }

        res.status(200).json({ books });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.findBooks = async (req, res) => {
  try {
    const { title, genre } = req.query;
    
    // User id comes from the auth middleware
    const userId = req.id;

    let query = { userId: userId };
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive
    }
    if (genre) {
      query.genre = genre;
    }

    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


