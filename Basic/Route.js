const express = require("express")
const router = express.Router()
// Import the user authentication function from Auth
const { userAuth } = require("../middleware/auth")

const { getBooks } = require("./BookFunctions")

// The route and the method and function that follow
router.route("/getBooks").get(userAuth, getBooks)

module.exports = router