const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://cybervine:gny9g4UyeMBNigIm@cluster0.4tzbbxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const postSchema = new mongoose.Schema({
  comment: String,
  likes: Number,
  lat: Number,
  lng: Number,
  id: String,
  user_id: String
})
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  description: String,
  id: String
})
const promoSchema = new mongoose.Schema({
  user_id: String,
  promo: String,
  link: String
})
const likesSchema = new mongoose.Schema({
  user_id: Number,
  post_id: Array,
})

const Post = mongoose.model("Post", postSchema)
const User = mongoose.model("User", userSchema)
const Promo = mongoose.model("Promo", promoSchema)
const Likes = mongoose.model("Likes", likesSchema)
const seedPosts = require('./seed-data/posts')
const seedPromos = require('./seed-data/promos')
const seedUsers = require('./seed-data/users')

async function seedDB () {
  await Post.deleteMany({})
  await User.deleteMany({})
  await Promo.deleteMany({})
  await Likes.deleteMany({})
  await Post.insertMany(seedPosts)
  await User.insertMany(seedUsers)
  await Promo.insertMany(seedPromos)
}

seedDB().then(()=>{
  mongoose.connection.close()
})
