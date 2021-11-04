const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // 載入 todo model
const restaurantSeed = require('./restaurant.json')

db.once('open', () => {
  restaurantSeed.results.forEach((seed) => {
    Restaurant.create(seed).catch(() => console.log(`${seed.name} is error!`))
  })
  console.log('seed finish!')
})
