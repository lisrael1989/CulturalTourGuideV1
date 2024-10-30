/*
The server/remote api will supply all our backEnd funconalty by:
    * supply remote acess to our data base 

In practice:
    * our server will comunicate with our database and supply all the needed data and backend functonalty to the app.
*/ 
const express = require('express');
const fns = require('./serviceUtil.js');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/destinationsPrev', (req, res) => {
  const destinationsPrev = fns.getLoadedData('destinationsPrev');
  res.json(destinationsPrev);
});

app.get('/places', (req, res) => {
  const destinations = fns.getLoadedData('destinations');
  res.json(destinations);
}); 

app.get('/desGames/:desId', (req, res) => {
   const gameDataLst = fns.getLoadedData('desGames');
   const gameData = gameDataLst.find((gameDes) => gameDes.destenationId == req.params.desId);
  if (gameData) {
    res.json(gameData);
  } else {
    res.status(404).json({ message: 'gameData not found' });
  }
});

app.get('/destinations/:desId', (req, res) => {
  const destinations = fns.getLoadedData('destinations');
  const destination = destinations.find((des) => des.id === req.params.desId);
  if (destination) {
    res.json(destination);
  } else {
    res.status(404).json({ message: 'Destination not found' });
  }
});

app.get('/destinations/:desId', (req, res) => {
  const destinations = fns.getLoadedData('destinations');
  for (let des of destinations) {
    if (des.id === req.params.desId) {
      res.json({ des });
      return;
    }
  }
  res.json({ id: -1 });
  return;
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
