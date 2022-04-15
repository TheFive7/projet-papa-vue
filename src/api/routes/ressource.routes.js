module.exports = app => {
  const ressource = require('../controllers/ressource.controller.js')
  const router = require('express').Router()

  // Retrieve all ressources
  router.get('/', ressource.findAll)

  // Create a new ressource
  router.post('/', ressource.create)

  // Delete a ressource with id
  router.delete('/:id', ressource.delete)

  // Retrieve a single ressource with id
  router.get('/:id', ressource.findOne)

  // Update a ressource with id
  router.put('/:id', ressource.update)

  app.use('/api/ressource', router)
}
