const router = require("express").Router()
const postsController = require("../controllers/posts-controller")

router
  .route("/posts")
  .get(postsController.getPosts)
  .post(postsController.makePost)

module.exports = router