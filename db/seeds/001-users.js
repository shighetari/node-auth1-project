
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Francisco', password: 'lol123'},
        {username: 'Marcia', password: 'lol123'}
     
      ]);
    });
};
