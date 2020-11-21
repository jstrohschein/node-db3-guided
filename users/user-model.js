// user-model

const db = require('../data/db-config')

module.exports = {
  find,
  findById,
  findPosts,
  add,
  update,
  remove

}

function find() {
  return db('users')
}

function findById(id) {
 const user = db('users').where({id}).first()
 return user  
}

function findPosts(id) {
  const posts = 
    db('posts as p')
      .join('users as u', 'u.id', 'p.user_id')
      .where({user_id:id})
      .select('p.id', 'u.username', 'p.contents')
  return posts
}

function add(userData) {
  
}

function update(id, changes) {
  
}

function remove(id) {
  
}