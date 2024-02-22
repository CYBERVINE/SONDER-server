const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/sonder')
const postSchema = new mongoose.Schema({
  comment: String,
  likes: Number,
  lat: Number,
  lng: Number,
  id: Number,
  user_id: Number
})
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  description: String,
  id: Number
})
const promoSchema = new mongoose.Schema({
  id: Number,
  user_id: Number,
  promo: String,
  link: String
})

const Post = mongoose.model("Post", postSchema)
const User = mongoose.model("User", userSchema)
const Promo = mongoose.model("Promo", promoSchema)
const seedPosts = require('./seed-data/posts')
const seedPromos = require('./seed-data/promos')
const seedUsers = require('./seed-data/users')

async function seedDB () {
  await Post.deleteMany({})
  await User.deleteMany({})
  await Promo.deleteMany({})
  await Post.insertMany(seedPosts)
  await User.insertMany(seedUsers)
  await Promo.insertMany(seedPromos)
}

seedDB().then(()=>{
  mongoose.connection.close()
})


