const { MongoClient } = require('mongodb')
const url = process.env.MONGO_URL
const client = new MongoClient(url)
const dbName = process.env.DB_NAME
const { v4: uuidv4 } = require('uuid');

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
    description: "New to Sonder",
    id: uuidv4()
  });
  return results
}


const edit = async (id, body, file) => {
  console.log("id", id, "body", body, "file", file)
  await client.connect()
  const db = client.db(dbName)
  const users = db.collection('users')
  if (body.username || body.description && !file){
    const results = await users.updateOne({id:id},{ $set:
      {
        username: body.username,
        description: body.description,
      }
    });
    return results
  } else {
    const results = await users.updateOne({id:id},{ $set:
      {
        avatar: `http://127.0.0.1:8080/avatars/${file.filename}`
      }
    });
    return results

  }

  
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
  if(user.email) {
    const results = await users.find({email: user.email}).toArray();
    return results[0]
  }
  const results = await users.find({id: user}).toArray();
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
  const results = await posts.find({user_id: user}).toArray();
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
    user_id: post.user_id,
    likes: 0,
    id: uuidv4()
  })
  return results
}

const checkLikes = async (user) => {
  await client.connect()
  const db = client.db(dbName)
  const likes = db.collection('likes')
  const results = await likes.find({user_id: user}).toArray();
  return results
}

const updateLikes = async (newLike) => {
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
  const results = await promos.find({user_id: user}).toArray();
  return results
}
  
const deletePromo = async (promo) => {
  await client.connect()
  const db = client.db(dbName)
  const promos = db.collection('promos')
  const results = await promos.deleteOne({id: promo});
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