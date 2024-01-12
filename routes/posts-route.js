const router = require("express").Router()
const postsController = require("../controllers/posts-controller")


router
  .route("/posts")
  .get(postsController.getPosts)
  .post(postsController.makePost)
router
  .route("/posts/:id")
  .get(postsController.getUserPosts)
  .patch(postsController.likePost)


module.exports = router