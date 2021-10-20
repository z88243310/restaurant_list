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
  res.render('index')
})
app.get('/restaurants/:id', (req, res) => {
  res.render('show')
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
