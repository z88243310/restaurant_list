const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost/restaurant-list'

mongoose.connect(MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
