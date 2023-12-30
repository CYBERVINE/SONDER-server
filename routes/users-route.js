const router = require("express").Router()
const usersController = require("../controllers/users-controller")

router
  .route("/users")
  .post(usersController.makeUser)
router
  .route("/users/:id")  
  .get(usersController.getUser)
  
module.exports = router