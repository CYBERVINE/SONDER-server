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
    res.send(err)
  } catch (err) {
  }
}

const editUser = async (req,res) => {

  try{
    if (req.file) {
      const avatar = req.file.filename
      const user = await knex("users")
      .where("id", req.params.id)
      .update("username", req.body.username)
      .update("avatar",`http://localhost:8080/avatars/${avatar}`)
    } else {
      const user = await knex("users")
      .where("id", req.params.id)
      .update("username", req.body.username)
    }

    res.sendStatus(200)
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  getUser,
  makeUser,
  editUser
}