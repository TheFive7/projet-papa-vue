module.exports = app => {
  const tache = require('../controllers/tache.controller.js')
  const router = require('express').Router()

  // Retrieve all Taches
  router.get('/', tache.findAll)

  // Create a new Tache
  router.post('/', tache.create)

  // Delete a Tache with id
  router.delete('/:id', tache.delete)

  // Retrieve a single Tache with id
  router.get('/:id', tache.findOne)

  // Update a Tache with id
  router.put('/:id', tache.update)

  app.use('/api/tache', router)
}
