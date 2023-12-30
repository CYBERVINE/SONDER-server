const router = require("express").Router()
const loginController = require("../controllers/login-controller")

router
  .route("/login")
  .post(loginController.loginUser)

module.exports = router