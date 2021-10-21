// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:id', (req, res) => {
  const restaurantOne = restaurantList.results.find((restaurant) => String(restaurant.id) === req.params.id)
  res.render('show', { restaurant: restaurantOne })
})

// queryString : search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword))
  res.render('index', { restaurants: restaurants })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
