const router = require("express").Router()
const usersController = require("../controllers/users-controller")
const multer = require("multer")


const storage = multer.diskStorage({
  destination: function(req, file, cd){
    return cd(null, './public/avatars')
  },
  filename: function (req,file,cb){
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({storage: storage})

router
  .route("/users")
  .post(usersController.makeUser)
router
  .route("/users/:id")  
  .get(usersController.getUser)
router
  .route("/users/:id/edit")  
  .get(usersController.getUser)
  .post(upload.single("file"), usersController.editUser)  
module.exports = router