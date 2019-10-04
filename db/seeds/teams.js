const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const playersArray = [];
const statsArray = []

fs.createReadStream("playerStats.csv")
  .pipe(csv())
  //look up what data as string is
  .on("data", data => {if(!playersArray.find(obj => obj.Player === data.Player)){
    playersArray.push(data)
  }
    statsArray.push(data)
  })
  .on("end", () => console.log("parsing complete"));

const findOrCreatePlayer = (knex, rowOfStats) => {
  // let player = knex('allPlayers').where('player', rowOfStats.Player)
  // let morePlayer = player._statements.filter(data => data.value)
  // let name = morePlayer[0].value
  // console.log('this is the name', name)

  // let potato = knex('allPlayers').whereNotExists(function() {
  //   this.select('*').from('allPlayers').whereRaw('allPlayers.player = rowOfStats.Player');
  // })

  // console.log(potato)

  // if (playerNameArray.includes(rowOfStats.Player)) {
  //   // console.log(`your player is ${rowOfStats.Player}`);
  //   let stats = {
  //     year: rowOfStats.Year,
  //     assists: rowOfStats.AST,
  //     points: rowOfStats.PTS,
  //     player_id: playerObjArray.find(player => {
  //       if (true){
  //         console.log('my guy', player.name)
  //         return player.id 
  //       }
  //     })
  //   };
  //   return createStats(knex, stats);

  // } else {
    // playerNameArray.push(rowOfStats.Player)
    // console.log("you are making a new player");
    return knex("allPlayers").insert({
      player: rowOfStats.Player
    })
  }

      // .insert(
      //   {
      //     player: rowOfStats.Player
      //   },
      //   "id"
      // )

      // .then(playerId => {
      //   let stats = {
      //     year: rowOfStats.Year,
      //     assists: rowOfStats.AST,
      //     points: rowOfStats.PTS,
      //     player_id: playerId[0]
      //   };

        // let playerObj = {
        //   name: rowOfStats.Player,
        //   id: playerId[0]
        // }

        // playerObjArray.push(playerObj)
        // return createStats(knex, stats);
//       });
//   }
// };

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
      // console.log('the obj array', playerObjArray)
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
