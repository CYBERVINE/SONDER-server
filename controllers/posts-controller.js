const knex = require("knex")(require("../knexfile"))

const getPosts = async (req,res) => {
  try {
    const posts = await knex("posts")
    res.send(posts)
  } catch (err) {
    res.send(err)
  }
}

const makePost = async (req,res) => {
  try{
  const post = await knex("posts")
    .insert(req.body)
    res.send(post)
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  getPosts,
  makePost
}