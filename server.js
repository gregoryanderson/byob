const express = require("express");
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.set("port", process.env.PORT || 3000);
app.locals.title = "BYOB";

app.get("/", (request, response) => {
  response.send("This is the main page");
});

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}`
  );
});

app.use(express.json());

app.get('/api/v1/players', (request, response) => {
  database('allPlayers').select()
    .then((players) => {
      response.status(200).json(players);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/stats', (request, response) => {
  database('stats').select()
    .then((stats) => {
      response.status(200).json(stats);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/players/:id', (request, response) => {
  database('allPlayers').where('id', request.params.id).select()
    .then((player) => {
      response.status(200).json(player);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/stats/:id', (request, response) => {
  database('stats').where('id', request.params.id).select()
    .then((stat) => {
      response.status(200).json(stat);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/players', (request, response) => {
  const player = request.body;

  for (let requiredParameter of ['player']) {
    if (!player[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('allPlayers').insert(player, 'id')
  .then(player => {
    response.status(201).json({ id: player[0] })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/stats', (request, response) => {
  const stat = request.body;

  for (let requiredParameter of ['year', 'assists', 'points', 'player_id']) {
    if (!stat[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('allPlayers').insert(stat, 'id')
  .then(stat => {
    response.status(201).json({ id: stat[0] })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.delete('/api/v1/stats/:id', (request, response) => {
  database('stats').where('id', request.params.id).del()
  .then((res) => {
    if(res){
    response.status(200).send(`Stat has been deleted`);
    } else {
    response.status(404).send(`Could not find stat with ${request.params.id}`)
    }
  })
  .catch((error) => {
    response.status(500).send({error})
  })
})