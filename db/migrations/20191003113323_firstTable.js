
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('allPlayers', function(table){
            table.increments('id').primary();
            table.string('player');

            table.timestamps(true, true)
        })
    ]),
  
    knex.schema.createTable('stats', function(table){
        table.increments('id').primary()
        table.string('year')
        table.string('assists')
        table.string('points')
        table.integer('player_id').unsigned()
        table.foreign('player_id').references('allPlayers.id')
  
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('allPlayers'),
        knex.schema.dropTable('stats')
    ])
};
