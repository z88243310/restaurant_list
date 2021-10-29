const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 todo model
const restaurantSeed = require('./restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// get connection
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantSeed.results.forEach((seed) => {
    Restaurant.create(seed).catch(() => console.log(`${seed.name} is error!`))
  })
  console.log('seed finish!')
})
