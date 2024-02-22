const jwt = require("jsonwebtoken")

const loginUser = async (req,res) => {

  try{
    const user = await knex("users")
    .where("email", req.body.email)
    .first()
    
    
    if (!user){
      res.status(404).send(err)
    }
      if (user.password === req.body.password){
        res.json({token: jwt.sign({id: user.id}, process.env.JWT_KEY)})
      } else {
        res.status(403).send("no password match")
      }
      
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  loginUser
}