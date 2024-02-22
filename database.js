const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'sonder'

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

const user = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  const results = await users.find({id: Number(user)}).toArray();
  console.log(results)
  return results
}

const userPromos = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const promos = db.collection('promos')
  const results = await promos.find({user_id: Number(user)}).toArray();
  return results
}
  

module.exports = {
    allPosts,
    userPosts,
    userPromos,
    user
}