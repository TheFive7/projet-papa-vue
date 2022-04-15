const db = require('../models')
const Ressource = db.ressource
// eslint-disable-next-line no-unused-vars
const Op = db.Sequelize.Op

// Retrieve all Ressource from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom
  const condition = nom ? { nom: { [Op.iLike]: `%${nom}%` } } : null
  Ressource.findAll({ where: condition })
    .then(data => {
      res.send(data)
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Ressource.'
      })
    })
}

// Create and Save a new Ressource
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  // Create a Ressource
  const ressource = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    description: req.body.description,
    assignation: req.body.assignation
  }
  // Save Ressource in the database
  Ressource.create(ressource)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Ressource.'
      })
    })
}

// Delete a Ressource with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  Ressource.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Ressource supprimée !'
        })
      } else {
        res.send({
          message: `Impossible de supprimer la Ressource ${id}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Impossible de supprimer la Ressource ' + id
      })
    })
}

// Find a single Ressource with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Ressource.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Impossible de trouver la Ressource ${id}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Impossible de trouver la Ressource ' + id
      })
    })
}

// Update a Ressource by the id in the request
exports.update = (req, res) => {
  const id = req.params.id
  Ressource.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      console.log(num)
      if (num === 1) {
        res.send({
          message: 'Ressource mise à jour.'
        })
      } else {
        res.send({
          message: `Impossible de mettre à jour la Ressource N°${id}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Impossible de mettre à jour la Ressource ' + id
      })
    })
}
