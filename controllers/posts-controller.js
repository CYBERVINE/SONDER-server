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
    const userLikes = await knex("likes")
      .where("user_id", req.body.user_id)

      userLikes.forEach(like => {
        if (like.post_id === req.body.post_id){
          alreadyLiked = true
        }
      })

      if(!alreadyLiked){

      const post = await knex("posts")
        .where("id", req.body.post_id)
        .first();
      
      await knex("posts")
        .where("id", req.body.post_id)
        .update("likes", post.likes + 1);

      await knex("likes")
        .insert(req.body)
      
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