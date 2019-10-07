# BYOB
## Build Your Own Backend

### Background

The learning goal of this project was to build a backend with a database that included a one-to-many relationship.
The data in the project is a parsed CSV of professional basketball players' yearly stats. The one-to-many relationship is that one player has many years of stats. 

### Tools used

For this project, I utilized the framework express, to help with routes and requests, knex, for SQL building with PostgreS, and I deployed the app to Heroku. 

https://byobanderson.herokuapp.com/


### Calls

#### GET

#### /api/v1/players

Will query for all players and return an array of player objects.
      
*example successful response* 
        
> [    {
        "id": 36244,
        "player": "Anderson Varejao",
        "created_at": "2019-10-04T22:22:41.976Z",
        "updated_at": "2019-10-04T22:22:41.976Z"
    },
    {
        "id": 36248,
        "player": "Anthony Tolliver",
        "created_at": "2019-10-04T22:22:41.977Z",
        "updated_at": "2019-10-04T22:22:41.977Z"
    }, ..etc
   ]

#### /api/v1/stats

Will query for all players and return an array of stat objects.
      
*example successful response* 
        
> [    {
        "id": 50310,
        "year": "2017",
        "assists": "200",
        "points": "100",
        "player_id": 36920,
        "created_at": "2019-10-05T23:35:32.257Z",
        "updated_at": "2019-10-05T23:35:32.257Z"
    },
    {
        "id": 50311,
        "year": "2017",
        "assists": "200",
        "points": "100",
        "player_id": 36920,
        "created_at": "2019-10-07T00:25:06.808Z",
        "updated_at": "2019-10-07T00:25:06.808Z"
    }    
    {
        "id": 48387,
        "year": "2014",
        "assists": "140",
        "points": "546",
        "player_id": 36244,
        "created_at": "2019-10-04T22:22:42.885Z",
        "updated_at": "2019-10-04T22:22:42.885Z"
    }, ..etc]
    

#### /api/v1/players/:id

Will query for all players and return an array of stat objects that match the id.
      
*example successful response* 

> [
    {
        "id": 36252,
        "player": "D.J. White",
        "created_at": "2019-10-04T22:22:41.990Z",
        "updated_at": "2019-10-04T22:22:41.990Z"
    }
]

*example error response*

> {
    "error": "Could not find player with and id of 43f34c"
}

#### /api/v1/stats/:id

Will query for all players and return an array of stat objects that match the id.
      
*example successful response* 

> [
    {
        "id": 48398,
        "year": "2014",
        "assists": "0",
        "points": "0",
        "player_id": 36252,
        "created_at": "2019-10-04T22:22:42.890Z",
        "updated_at": "2019-10-04T22:22:42.890Z"
    }
]


*example error response*

> {
    "error": "Could not find stat with and id of 43f34c"
}

#### POST

#### /api/v1/players/

Will post to the allPlayers table and return an the id of the successfully posted player.

*example body*

> { "player": "Boom Shakalaka" }
      
*example successful response* 

> {"id": 36925}

*example unsuccessful response*

> { error: "Expected format: { player: <String> }. You're missing a player property." }

#### /api/v1/stats/

Will post to the stats table and return an the id of the successfully posted stat.

*example successful body*

> { "year": 2013, "assists": 2039, "points": 2943, "player_id": 32455 }
      
*example successful response* 

> { "id": 50312 }

*example unsuccessful response*

> { "error": "Expected format: { \"year\": <Number>, \"assists\": <Number>, \"points\": <Number>, \"player_id\": <Number> }, You're missing a property." }
   

#### DELETE

#### /api/v1/stats/:id

Will delete a stat year from the stats table and return a string of "Stat has been deleted. 

*example successful response*

> "Stat has been deleted."

*example error response*

> "Could not find stat with id of 245354343"








| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `http://localhost:3000/api/v1/players` | GET | Not Needed | An array of all players: `[{ id: 1, player: 'Lebron James'}, ... , ... , etc]` |
| `http://localhost:3000/api/v1/stats` | GET | Not Needed | An array of all stats: `[{ id: 1, year: 2017, assists: 314, points: 1,432, player_id: 1 }, ... , ... , etc.]` |
| `http://localhost:3000/api/v1/players/:id` | GET | Not Needed | A specific player: `{ id: 2, player: 'Stephen Curry }` |
| `http://localhost:3000/api/v1/stats/:id` | GET | Not Needed | A specific stats object : `{ id: 2, assists: '534', points: 1,454, player_id: 2 }` |
| `http://localhost:3000/api/v1/players` | POST | { player: `STRING` } | A New Player ID: `{ id: 10 }` |
| `http://localhost:3000/api/v1/stats` | POST | { year: `NUMBER`, assists: `NUMBER`, points: `ASSISTS`, player_id:`NUMBER` } | A New Stat ID: `{ id: 3}` |
| `http://localhost:3000/api/v1/stats/:id` | DELETE | Not Needed | A Deleted Stat: `Stat has been deleted` |
