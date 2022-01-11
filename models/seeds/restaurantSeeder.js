// require dotenv on OS
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // 載入 Restaurant model
const User = require('../user') // 載入 User model

// restaurant and user Seeds
const restaurantSeeds = require('./restaurant.json').results
const userSeeds = [
  { name: 'user1', email: 'user1@example.com', password: '12345678', restaurantId: [1, 2, 3] },
  { name: 'user2', email: 'user2@example.com', password: '12345678', restaurantId: [4, 5, 6] }
]

db.once('open', () => {
  Promise.all(
    Array.from(userSeeds, userSeed => {
      const restaurantFiltered = []
      const { name, email, password } = userSeed
      // 加密
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash =>
          // 將 user 寫入資料庫
          User.create({ name, email, password: hash }).then(user => {
            // 找出符合 user's restaurantId 的 restaurantSeeds 資料並設定 userId
            userSeed.restaurantId.forEach(restaurantId => {
              const restaurant = restaurantSeeds.find(restaurantSeed => restaurantSeed.id === restaurantId)
              restaurant.userId = user._id
              restaurantFiltered.push(restaurant)
            })
            return restaurantFiltered
          })
        )
    })
  )
    .then(restaurantFiltereds => {
      const restaurantFilteredFinal = []
      restaurantFiltereds.forEach(restaurantFiltered => {
        restaurantFilteredFinal.push(...restaurantFiltered)
      })
      // 將 restaurantFilteredFinal 寫入資料庫
      return Restaurant.insertMany(restaurantFilteredFinal)
    })
    .catch(error => console.log(error))
    .finally(() => {
      console.log('data is created!')
      console.log('\n[ Seed Data ]\n')
      userSeeds.forEach(userSeed => {
        console.log(userSeed.email, userSeed.password)
      })
      process.exit()
    })
})
