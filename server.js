const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();
app.use(morgan('dev'));

app.listen(8000);

app.get('/apps', (req, res) => {
  const sorts = ['Rating', 'App'];
  const genres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
  let results = playstore;
  if ('genres' in req.query) {
    let genre = coerceCaps(req.query.genres);
    if (genres.includes(genre)) {
      results = results.filter(a => a.Genres.split(';').includes(genre));
    } else {
      res.status(400).send('bad genres parameter');
      return;
    }
  }
  if ('sort' in req.query) {
    let sort = coerceCaps(req.query.sort);
    if (sorts.includes(sort)) {
      results = results.sort((a, b) => {
        return a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0;
      });
      if (sort === 'Rating') {
        results = results.reverse();
      }
    } else {
      res.status(400).send('bad sort parameter');
      return;
    }
  }
  res.status(200).json(results);
});

function coerceCaps(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
