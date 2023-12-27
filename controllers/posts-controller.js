const knex = require("knex")(require("../knexfile"))

const getPosts = async (req,res) => {
  const posts = await knex("posts")
  res.send(posts)
}

const makePost = async (req,res) => {
  console.log(req.body)
  const post = await knex("posts")
    .insert(req.body)
  res.send(post)
}

module.exports = {
  getPosts,
  makePost
}