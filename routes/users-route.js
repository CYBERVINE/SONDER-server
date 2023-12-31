const router = require("express").Router()
const usersController = require("../controllers/users-controller")

router
  .route("/users")
  .post(usersController.makeUser)
router
  .route("/users/:id")  
  .get(usersController.getUser)
router
  .route("/users/:id/edit")  
  .get(usersController.getUser)
  .post(usersController.editUser)  
module.exports = router