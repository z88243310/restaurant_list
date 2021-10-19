// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// routes setting
app.get('/', (req, res) => {
  res.send(`<h1>This is restaurant list</h1>`)
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
