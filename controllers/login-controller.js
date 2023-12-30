const knex = require("knex")(require("../knexfile"))

const loginUser = async (req,res) => {
  try{
    const user = await knex("users")
      .where("username", req.body.username)
    if (user.password === req.body.password){
      res.send(user)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  loginUser
}