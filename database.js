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


const edit = async (id, body, file) => {
  console.log(typeof id,body, file)
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  const results = await users.updateOne({id:Number(id)},{ $set:
    {
      username: body.username,
      description: body.description,
    }
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
  console.log(user)
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  if(user.email) {
    const results = await users.find({email: user.email}).toArray();
    return results[0]
  }
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

const checkLikes = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const likes = db.collection('likes')
  const results = await likes.find({user_id: Number(user)}).toArray();
  return results
}

const updateLikes = async (newLike) => {
  console.lof(newLike)
  await client.connect()
  const db = client.db(dbName)
  const likes = db.collection('likes')
  const results = await likes.insertOne(newLike).toArray();
  return results
}


const likePost = async (post, likes) => {
  await client.connect()
  const db = client.db(dbName)
  const posts = db.collection('posts')
  const results = await posts.updateOne({post_id:post},{$set:{
    likes: likes + 1
  }}).toArray();
  return results[0]
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
    checkLikes,
    likePost,
    updateLikes,
    makePromo,
    userPromos,
    deletePromo,
    makeUser,
    edit,
    allUsers,
    getUser,
}