require("dotenv").config()
const express = require('express');
const cors = require('cors')
const postsRouter = require('./routes/posts-route')
const usersRouter = require('./routes/users-route')
const promosRouter = require('./routes/promos-route')
const loginRouter = require('./routes/login-route')
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(postsRouter)
app.use(usersRouter)
app.use(loginRouter)
app.use(promosRouter) // add promo links



app.get('/', (_req, res) => {
  res.send('Hello, Express!');
});




const fs = require("fs");

let csv = fs.readFileSync('./assets/worldcities.csv', "utf8", process.cwd)

csv = csv.split('\n').map(entry =>{
  entry = entry.split(',')
  return [entry[1], entry[2], entry[3]]
})

const string = JSON.stringify(csv)

fs.writeFileSync("./assets/cityLatLong.json", string)

const cityLatLongBuffer = fs.readFileSync('./assets/cityLatLong.json', "utf8")
const cityLatLong = JSON.parse(cityLatLongBuffer)

console.log(cityLatLong)


      
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

