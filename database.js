const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'sonder'

// users

const makeUser = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  const results = await users.insertOne({
    username: user.username,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
    description: "New to Sonder"
  });
  return results
}


const editUser = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  const results = await users.updateOne({email:user.email},{
    username: user.username,
    description: "New to Sonder",
    avatar: user?.avatar //might be a problem
  });
  return results
}

const allUsers = async () => {
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  const results = await users.find().toArray();
  return results
}

const getUser = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  const results = await users.find({id: Number(user)}).toArray();
  return results[0]
}

// posts
const allPosts = async () => {
  await client.connect()
  const db = client.db(dbName)
  const posts = db.collection('posts')
  const results = await posts.find({}).toArray();
  return results
}

const userPosts = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const posts = db.collection('posts')
  const results = await posts.find({user_id: Number(user)}).toArray();
  return results
}

const makePost = async (post) => {
  await client.connect()
  const db = client.db(dbName)
  const posts = db.collection('posts')
  const results = await posts.insertOne({
    lat: post.lat,
    lng: post.lng,
    comment: post.comment,
    user_id: post.user_id
  })
  return results
}

// promos
const userPromos = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const promos = db.collection('promos')
  const results = await promos.find({user_id: Number(user)}).toArray();
  return results
}
  
const deletePromo = async (promo) => {
  await client.connect()
  const db = client.db(dbName)
  const promos = db.collection('promos')
  const results = await promos.deleteOne({id: Number(promo)});
  return results
}
  
const makePromo = async (promo) => {
  await client.connect()
  const db = client.db(dbName)
  const promos = db.collection('promos')
  const results = await promos.insertOne({
    promo: promo.promo,
    link: promo.link,
    user_id: promo.user_id
  });
  return results
}
  

module.exports = {
    allPosts,
    userPosts,
    makePost,
    makePromo,
    userPromos,
    deletePromo,
    makeUser,
    editUser,
    allUsers,
    getUser,
}