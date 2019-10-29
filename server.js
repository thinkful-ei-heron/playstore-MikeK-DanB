const express = require('express');
const dataStore = require('./dataStore');
const morgan = require('morgan')
const app = express();
app.use(morgan('dev'));


app.get('/apps', (req, res) => {
  const { sort, genres } = req.query
  const genresArr = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
  if(!sort && !genres){
    res.status(200)
    res.json(dataStore)
  }
  if(sort && genres){
    let genresArray = dataStore.filter(obj => obj["Genres"] === genres)
    genresArray = genresArray.sort((a,b) => b[sort] - a[sort])
    if(sort === 'Rating'){
      genresArray = genresArray.sort((a,b) => {
        return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0
      })
    }
    if(sort === 'App'){
      genresArray = genresArray.sort((a,b) => {
        return a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0
      })
    }
    res.status(200)
    res.json(genresArray)
  }
  if(sort){
    if(sort == 'Rating'){
      let sortByRating = dataStore.sort((a,b) => {
        return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0
      })
      res.status(200).json(sortByRating)
    }
    else if(sort === 'App'){
      let sortByApp = dataStore.sort((a,b) => {
        return a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0
      })
      res.status(200).json(sortByApp)
    }
    else {
      return res.status(404).send('sort must contain "Rating" or "App"')
    }
  }
  if(genresArr.includes(genres)){
    let genresArray = dataStore.filter(obj => obj["Genres"] === genres)
    res.status(200).send(genresArray)
  }
  else{
    res.status(404).send("Genre must contain: 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'")
  }
})

app.listen(8000, () => {
})
