
exports.up = function(knex) {
  return Promise.all([
      knex.schema.createTable('teams', function(table){
          table.increments('id').primary();
          table.string('tm');

          table.timestamps(true, true)
      })
  ]),

  knex.schema.createTable('players', function(table){
      table.increments('id').primary()
      table.string('player')
      table.integer('tm_id').unsigned()
      table.foreign('tm_id').references('teams.id')

      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return Promise.all([
      knex.schema.dropTable('players'),
      knex.schema.dropTable('teams')
  ])
};
