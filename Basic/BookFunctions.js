const bcrypt = require("bcryptjs")
// The user schema
const User = require("../User")

// User authentication with JSON Web Token
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET;

// Lists all the users
exports.getBooks = async (req, res) => {
    try {
        const userId = req.id;

        // Find the user by ID and populate the books field
        const user = await User.findById(userId).populate('books');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract books from the user object and send them as response
        const books = user.books;
        res.status(200).json({ books });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}