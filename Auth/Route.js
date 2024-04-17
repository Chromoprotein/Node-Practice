const express = require("express")
const router = express.Router()
// Import the user authentication functions from Auth
const { adminAuth, userAuth } = require("../middleware/auth")
const { register, login, update, deleteUser, getUsers, userStatus, logout } = require("./Auth")

// The route and the method and function that follow
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/userStatus").get(userStatus)
// Only for users and admins
router.route("/getUsers").get(userAuth, getUsers)
router.route("/logout").post(userAuth, logout)
// Only for admins:
router.route("/update").put(adminAuth, update)
router.route("/deleteUser").delete(adminAuth, deleteUser)

module.exports = router