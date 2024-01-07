const router = require("express").Router()
const postsController = require("../controllers/posts-controller")

// const multer = require("multer")


// const storage = multer.diskStorage({
//   destination: function(req, file, cd){
//     return cd(null, './public/images')
//   },
//   filename: function (req,file,cb){
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })
// const upload = multer({storage: storage})


router
  .route("/posts")
  .get(postsController.getPosts)
  .post(postsController.makePost)
router
  .route("/posts/:id")
  .get(postsController.getUserPosts)

module.exports = router