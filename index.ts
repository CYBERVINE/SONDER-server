require("dotenv").config()
const express = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const postsRouter = require('./routes/posts-route')
const usersRouter = require('./routes/users-route')
const promosRouter = require('./routes/promos-route')
const loginRouter = require('./routes/login-route')
const app = express();
const port = process.env.PORT || 8080;
const jsonSecretKey = process.env.JWT_KEY


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  if (req.url === "/users" || "/user/:id" || req.url === "/promos"|| req.url === "/login" || req.url === '/posts'){
    next()
  } else {
    const token = getToken(req)
    if(token) {
      console.log('Auth Token:', token)
      if (jwt.verify(token, jsonSecretKey)) {
        req.decode = jwt.decode(token)
        next()
      } else {
        res.status(403).json({error: "Not Authorized"})
      }
    } else {
      res.status(403).json({error: "No Token, Unauthorized."})
    }
  }
})

function getToken(req){
  if(!req.headers.authorization) {
    return
  } else {
    return req.headers.authorization.split(" ")[1]
  }
}


app.use('/avatars', express.static("public/avatars"))
app.use('/animations', express.static("public/animations"))



app.use(postsRouter)
app.use(usersRouter)
app.use(loginRouter)
app.use(promosRouter)


app.get('/', (_req, res) => {
  res.send('hello!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
