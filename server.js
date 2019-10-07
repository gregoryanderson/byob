//this is node framework
const express = require("express");
//this assigns 'app' to call the node framework express
const app = express();
//this is asking if we are in a production enviroment or development
const environment = process.env.NODE_ENV || 'development';
//this is where to go to determine our settings depending on our environment
const configuration = require('./knexfile')[environment];
//this will determine what database we will be working with 
const database = require('knex')(configuration);

//if we are in production, process.env.PORT will be true, otherwise go to localhost 3000
app.set("port", process.env.PORT || 3000);
//this assigns the title of the app
app.locals.title = "BYOB";

//this says when we are at the "/" endpoint and using the GET verb..
app.get("/", (request, response) => {
//..that we should send back "This is the main page"
  response.send("This is the main page");
});

//this says that when the app is open and loaded..
app.listen(app.get("port"), () => {
  //..to console log the name of the app and where it is running
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}`
  );
});

//this tells us that we will be using json for our GET, POST, and DELETE functions
app.use(express.json());

//this says that we are at the "/api/v1/players" endpoint and using the GET verb..
app.get('/api/v1/players', (request, response) => {
  //..we should select all players in the allPlayers table..
  database('allPlayers').select()
    //..then send a response with the status code 200 and all the players in json..
    .then((players) => {
      response.status(200).json(players);
    })
    //..but if there was an error to catch that error and send back a status code of 500 and send the error in json
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//this says that when we are at the "/api/v1/stats" endpoint and using the GET verb..
app.get('/api/v1/stats', (request, response) => {
  //..we should select all stats in the stats table..
  database('stats').select()
    //..then send a response with the status code 200 and all the stats in json..
    .then((stats) => {
      response.status(200).json(stats);
    })
    //..but if there was an error to catch that error and send back a status code of 500 and send the error in json
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//this says that when we are at the "/api/v1/players/:id" and using the GET verb..
app.get('/api/v1/players/:id', (request, response) => {
  //..we will go to the allPlayers table and goes to the id column and matched that against the id in the url endpoint and selects it..
  database('allPlayers').where('id', request.params.id).select()
    //..and responds with a status code of 200 and returns a json object of that player..
    .then((player) => {
      response.status(200).json(player);
    })
    //..but if there was an error to catch that error and send back a status code of 500 and send the error in json
    .catch((error) => {
      response.status(500).json({ error: `Could not find player with and id of ${request.params.id}` });
    });
});

//this says that when we are at the "/api/v1/stats/:id" and using the GET verb..
app.get('/api/v1/stats/:id', (request, response) => {
  //..we will go to the stats table and goes to the id column and matched that against the id in the url endpoint and selects it..
  database('stats').where('id', request.params.id).select()
    //..and responds with a status code of 200 and returns a json object of that stat..
    .then((stat) => {
      response.status(200).json(stat);
    })
    //..but if there was an error to catch that error and send back a status code of 500 and send the error in json
    .catch((error) => {
      response.status(500).json({ error: `Could not find stat with and id of ${request.params.id}` });
    });
});

//this says that when we are at the "/api/v1/players" and using the POST verb..
app.post('/api/v1/players', (request, response) => {
  //..we assign a variable so that we may examine the request body
  const player = request.body;

  //we are going to iterate through every key quality that a player will have and..
  for (let requiredParameter of ['player']) {
    //..if that key is not satisfied..
    if (!player[requiredParameter]) {
      //..we are going to return a response of a status code of 422..
      return response
        .status(422)
        //along with the error explaining what was missing
        .send({ error: `Expected format: { player: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  //..otherwise we are going into the allPlayers table in the database and inserting player with an assigned id..
  database('allPlayers').insert(player, 'id')
  //..then we are sending back the 201 status code along with the json object of the new players id
  .then(player => {
    response.status(201).json({ id: player[0] })
  })
    //..but if there was an error to catch that error and send back a status code of 500 and send the error in json  
  .catch(error => {
    response.status(500).json({ error });
  });
});

//this says that when we are at the "/api/v1/stats" and using the POST verb..
app.post('/api/v1/stats', (request, response) => {
  //..we assign a variable so that we may examine the request body
  const stat = request.body;

  //we are going to iterate through every key quality that a stat will have and..
  for (let requiredParameter of ['year', 'assists', 'points', 'player_id']) {
    //..if those keys is not satisfied..
    if (!stat[requiredParameter]) {
      //..we are going to return a response of a status code of 422..
      return response
        .status(422)
        .send({ error: `Expected format: { "year": <Number>, "assists": <Number>, "points": <Number>, "player_id": <Number> }. You're missing a property.` });
    }
  }
  //..otherwise we are going into the stats table in the database and inserting the stat with an assigned id..
  database('stats').insert(stat, 'id')
  //..then we are sending back the 201 status code along with the json object of the new stats id
  .then(stat => {
    response.status(201).json({ id: stat[0] })
  })
    //..but if there was an error to catch that error and send back a status code of 500 and send the error in json  
  .catch(error => {
    response.status(500).json({ error });
  });
});

//this says that when we are at the '/api/v1/stats/:id' endpoint using the DELETE verb..
app.delete('/api/v1/stats/:id', (request, response) => {
  //..we will go into the stats table and into the id column and find the id that matches the id in the url endpoint..
  database('stats').where('id', request.params.id).del()
  //..then sends a response with the 200 status code and a message that says the stat has been deleted
  .then((res) => {
    if(res){
    response.status(200).send(`Stat has been deleted`);
    } else {
    //..or it sends a response with a 404 status code where the stat could not be found
    response.status(404).send(`Could not find stat with id of ${request.params.id}`)
    }
  })
    //..but if there was an error to catch that error and send back a status code of 500 and send the error in json  
  .catch((error) => {
    response.status(500).send({error})
  })
})