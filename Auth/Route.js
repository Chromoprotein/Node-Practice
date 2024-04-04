const express = require("express")
const router = express.Router()
// Import the user authentication functions from Auth
const { adminAuth, userAuth } = require("../middleware/auth")
const { register, login, update, deleteUser, getUsers } = require("./Auth")

// The route and the method and function that follow
router.route("/register").post(register)
router.route("/login").post(login)
// Only for users and admins
router.route("/getUsers").get(userAuth, getUsers)
// Only for admins:
router.route("/update").put(adminAuth, update)
router.route("/deleteUser").delete(adminAuth, deleteUser)

module.exports = router