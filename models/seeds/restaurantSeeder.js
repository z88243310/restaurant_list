const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // 載入 todo model
const restaurantSeed = require('./restaurant.json').results

db.once('open', () => {
  Restaurant.insertMany(restaurantSeed)
    .catch(() => console.log(`${seed.name} is error!`))
    .finally(() => {
      console.log('data is created!')
      process.exit()
    })
})
