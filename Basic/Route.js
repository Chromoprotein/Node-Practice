const express = require("express")
const router = express.Router()
// Import the user authentication function from Auth
const { userAuth } = require("../middleware/auth")

const { getBooks, findBooks } = require("./BookFunctions")

// The route and the method and function that are used in it
router.route("/getBooks").get(userAuth, getBooks)
router.route("/findBooks").get(userAuth, findBooks)

module.exports = router