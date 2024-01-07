const usersData = require('../seed-data/users');
const postsData = require('../seed-data/posts');
const promosData = require('../seed-data/promos')


exports.seed = async function(knex) {
  await knex('posts').del();
  await knex('users').del();
  await knex('promos').del();
  await knex('users').insert(usersData);
  await knex('posts').insert(postsData); 
  await knex('promos').insert(promosData); 
};

