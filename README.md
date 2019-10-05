| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `http://localhost:3000/api/v1/players` | GET | Not Needed | An array of all players: `[{ id: 1, player: 'Lebron James'}, ... , ... , etc]` |
| `http://localhost:3000/api/v1/stats` | GET | Not Needed | An array of all stats: `[{ id: 1, year: 2017, assists: 314, points: 1,432, player_id: 1 }, ... , ... , etc.]` |
| `http://localhost:3000/api/v1/players/:id` | GET | Not Needed | A specific player: `{ id: 2, player: 'Stephen Curry }` |
| `http://localhost:3000/api/v1/stats/:id` | GET | Not Needed | A specific stats object : `{ id: 2, assists: '534', points: 1,454, player_id: 2 }` |
| `http://localhost:3000/api/v1/players` | POST | { player: `STRING` } | A New Player ID: `{ id: 10 }` |
| `http://localhost:3000/api/v1/stats` | POST | { year: `NUMBER`, assists: `NUMBER`, points: `ASSISTS`, player_id:`NUMBER` } | A New Stat ID: `{ id: 3}` |
| `http://localhost:3000/api/v1/stats/:id` | DELETE | Not Needed | A Deleted Stat: `Stat has been deleted` |
