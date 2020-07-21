const db = require('../db/connection')

module.exports = {
 find,
 findById,
 findByName, 
 add,
 filterBy
  };


  function find() {
    return db('users')
    .select('id', 'username')
    .orderBy('id')
  }

  function findById(id) {
      return db('users')
      .where({id})
      .first()
      .select('id', 'username')
  }
  function findByName(username){
      return db('users')
      .where(username)
      .first()
      .select('username')
  }
  
  function add(credentials){
      return db('users')
      .insert(credentials, 'id')
      .then( ([id]) => {
        return  findById(id)
      })
  }

  function filterBy(username){
    return db('users')
    .where(username)
    .first()
    
}