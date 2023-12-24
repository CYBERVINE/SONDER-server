const usersData = require('../seed-data/users');
const postsData = require('../seed-data/posts');


exports.seed = async function(knex) {
  console.log(postsData[9].lng)
  await knex('posts').del();
  await knex('users').del();
  await knex('users').insert(usersData);
  await knex('posts').insert(postsData); // code precision here
};

