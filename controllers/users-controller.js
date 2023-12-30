const knex = require("knex")(require("../knexfile"))

const getUser = async (req,res) => {
  try{
    const user = await knex("users")
      .where("id", req.params.id)
      .first()
    res.send(user)
  } catch (err) {
    res.send(err)
  }
}


const makeUser = async (req,res) => {
  try{
    const user = await knex("users")
    .insert(req.body)
    res.send(user)
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  getUser,
  makeUser
}