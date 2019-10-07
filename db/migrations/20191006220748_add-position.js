
exports.up = function(knex) {
    return knex.schema.table("allPlayers", table => {
        table.string("position");
      });
};

exports.down = function(knex) {
    return knex.schema.table("allPlayers", table => {
        table.dropColumn("position");
      });
};
