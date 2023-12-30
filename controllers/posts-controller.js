const knex = require("knex")(require("../knexfile"))
// const OpenAI = require('openai')
// const dotenv = require("dotenv")
// dotenv.config()

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY, 
// });


  // const ask = "please responed to this with a yes and no"

  // async function main(ask) {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: `${ask}` }],
  //     model: "gpt-3.5-turbo",
  //   });
  
  //   console.log(completion.choices[0]);
  // }

// main(ask)

const getPosts = async (req,res) => {
  try {
    const posts = await knex("posts")
    res.send(posts)
  } catch (err) {
    res.send(err)
  }
}

const getUserPosts = async (req,res) => {
  try {
    const posts = await knex("posts")
      .where("user_id", req.params.id)
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
  getUserPosts,
  makePost
}