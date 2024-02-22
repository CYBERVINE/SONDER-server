const sonder = require('../database')

const getUser = async (req,res) => {

  try{
    const user = await sonder.getUser(req.params.id)
    res.send(user)
  } catch (err) {
    res.send(err)
  }
}


const makeUser = async (req,res) => {


  try{
    const users = await sonder.allUsers()
    let emailTaken = false

    users.forEach(user => {
      if (user.email === req.body.email){
        emailTaken = true
      }
    })
    
    if (!emailTaken){
      const user = await sonder.makeUser(req.body)
      res.send(user)
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
      const user = await sonder.editUser(req.params.id)
      .where("id", req.params.id)
      .update("username", req.body.username)
      .update("description", req.body.description)
      .update("avatar",`http://127.0.0.1:8080/avatars/${avatar}`)
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