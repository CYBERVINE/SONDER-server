const sonder = require('../database')

const getUser = async (req,res) => {

  try{
    const user = await sonder.getUser(req.params.id)
    console.log(user)
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
  const user = await sonder.edit(req.params.id, req.body, req.file)
  console.log("formdata", req.file)
  try{
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