const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// eslint-disable-next-line no-unused-vars
const db = require('./models')

// Tout actualiser
db.sequelize.sync()

// Tout supprimer et actualiser
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.')
// })

const corsOptions = {
  origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Maxime api application.' })
})

require('./routes/tache.routes')(app)
require('./routes/ressource.routes')(app)

// set port, listen for requests
const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
