const sonder = require('../database')

const getPosts = async (req,res) => {
  try {
    const posts = await sonder.allPosts()
    res.send(posts)
  } catch (err) {
    res.send(err)
  }
}

const getUserPosts = async (req,res) => {
  try {
    const posts = await sonder.userPosts(req.params.id)
    res.send(posts)
  } catch (err) {
    res.send(err)
  }
}


const likePost = async (req,res) => {
  try {
    let alreadyLiked = false
    let user = await sonder.checkLikes(req.body.user_id)
    
    if (!user){
      user = await sonder.createLiker(req.body.user_id)
    }
    user.post_id.forEach(like => {
      if (like === req.body.post_id){
        alreadyLiked = true
      }
    })
    
    if(!alreadyLiked){
      const post = await sonder.likePost(req.body.post_id)      
      await sonder.updateLikes(req.body.user_id, req.body.post_id)
        res.status(200).send("post boosted");
    } else {
      res.send("User already boosted this post.")
    }
    } catch (err) {
      res.send(err)
    }
  }
  
const makePost = async (req,res) => {

  try{
  const post = await sonder.makePost(req.body)
    res.send(post)
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  getPosts,
  getUserPosts,
  makePost,
  likePost
}