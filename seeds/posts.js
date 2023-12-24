const usersData = require('../seed-data/users');
const postsData = require('../seed-data/posts');


exports.seed = async function(knex) {
  console.log(postsData[9].lng)
  await knex('posts').del();
  await knex('users').del();
  await knex('users').insert(usersData);
  await knex('posts').insert(postsData); // code precision here
};



// exports.seed = function (knex) {
//   // Deletes ALL existing entries
//   return knex("your_table_name")
//     .del()
//     .then(function () {
//       // Inserts seed entries
//       return knex("your_table_name").insert([
//         { 
//           id: 1, 
//           user_id: 1, 
//           lat: parseFloat(49.2827.toFixed(4)), 
//           lng: parseFloat(-123.1207.toFixed(4)), 
//           comment: "Your comment here", 
//           likes: 15 
//         },
//         { 
//           id: 2, 
//           user_id: 2, 
//           lat: parseFloat(49.2816.toFixed(4)), 
//           lng: parseFloat(-123.1316.toFixed(4)), 
//           comment: "Your comment here", 
//           likes: 20 
//         },
//         // ..