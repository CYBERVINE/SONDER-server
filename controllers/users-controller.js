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
    const users = await knex("users")
    let emailTaken = false

    users.forEach(user => {
      if (user.email === req.body.email){
        emailTaken = true
      }
    })
    
    if (!emailTaken){
      const user = await knex("users")
      .insert(req.body)
      res.send(user)
      res.send(err)
    } else {
      res.status(403).send("That email is already in use")
    }
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
      .update("description", req.body.description)
      .update("avatar",`http://localhost:8080/avatars/${avatar}`)
    } else {
      const user = await knex("users")
      .where("id", req.params.id)
      .update("username", req.body.username)
      .update("description", req.body.description)
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