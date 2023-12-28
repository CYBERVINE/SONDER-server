require("dotenv").config()
const express = require('express');
const cors = require('cors')
const postsRouter = require('./routes/posts-route')
const usersRouter = require('./routes/users-route')
const promosRouter = require('./routes/promos-route')
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(postsRouter)
app.use(usersRouter)
app.use(promosRouter) // add promo links



app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

      
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});