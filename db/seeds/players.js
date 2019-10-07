const csv = require("csv-parser");
const fs = require("fs");
const playersArray = [];
const statsArray = [];

fs.createReadStream("playerData.csv")
  .pipe(csv())
  .on("data", data => {if(!playersArray.find(obj => obj.Player === data.Player)){
    playersArray.push(data)
  }
    statsArray.push(data)
  })
  .on("end", () => console.log("parsing complete"));

const findOrCreatePlayer = (knex, rowOfStats) => {
    return knex("allPlayers").insert({
      player: rowOfStats.Player,
      position: rowOfStats.Pos
    })
  }

const createStats = (knex, statObj) => {
  return knex('allPlayers').where('player', statObj.Player).first()
    .then(player =>  {
      return knex('stats').insert({
          year: statObj.Year,
          assists: statObj.AST,
          points: statObj.PTS,
          player_id: player.id
    })
  })
};

exports.seed = knex => {
  return knex("stats")
    .del()
    .then(() => knex("allPlayers").del())
    .then(() => {
      let playerPromises = [];

      playersArray.forEach(row => {
        playerPromises.push(findOrCreatePlayer(knex, row));
      });
      return Promise.all(playerPromises);
    }).then(() => {
      let statsPromises = [];
      statsArray.forEach(stat => {
        statsPromises.push(createStats(knex, stat))
      })
      return Promise.all(statsPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
