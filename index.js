require("dotenv").config()
const express = require('express');
const cors = require('cors')

const knex = require("knex")(require("./knexfile"))

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/posts', async (req,res) => {
  const posts = await knex("posts") /// need to add precsison to lat long
  console.log(posts)
  res.send(posts)
})
app.post('/posts', (req,res) => {
  console.log("go")
})

      
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});