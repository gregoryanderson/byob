const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("smallData.csv")
  .pipe(csv())
  .on("data", data => results.push(data))
  .on("end", () => console.log(results));

const createPlayer = (knex, player) => {
  return knex("allPlayers")
    .insert(
      {
        player: player.Player
      },
      "id"
    )
    .then(playerId => {
      let statsPromises = {
        year: player.Year,
        assists: player.AST,
        points: player.PTS,
        player_id: playerId[0]
      };
      return createStats(knex, statsPromises);
    });
};

const createStats = (knex, statObj) => {
  return knex('stats').insert(statObj);
};

exports.seed = knex => {
  return knex("stats")
    .del() 
    .then(() => knex("allPlayers").del())
    .then(() => {
      let playerPromises = [];

      results.forEach(player => {
        playerPromises.push(createPlayer(knex, player));
      });

      return Promise.all(playerPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
