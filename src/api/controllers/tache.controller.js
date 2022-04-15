const db = require('../models')
const Tache = db.tache
// eslint-disable-next-line no-unused-vars
const Op = db.Sequelize.Op

// Retrieve all Tache from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom
  const condition = nom ? { nom: { [Op.iLike]: `%${nom}%` } } : null
  Tache.findAll({ where: condition })
    .then(data => {
      res.send(data)
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Tache.'
      })
    })
}

// Create and Save a new Tache
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  // Create a Tache
  const tache = {
    numero: req.body.numero,
    ordreTravail: req.body.ordreTravail,
    avis: req.body.avis,
    nom: req.body.nom,
    description: req.body.description,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    ressources: req.body.ressources
  }
  // Save Tache in the database
  Tache.create(tache)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tache.'
      })
    })
}

// Delete a Tache with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  Tache.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Tache supprimée !'
        })
      } else {
        res.send({
          message: `Impossible de supprimer la Tache ${id}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Impossible de supprimer la Tache ' + id
      })
    })
}

// Find a single Tache with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Tache.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Impossible de trouver la Tache ${id}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Impossible de trouver la Tache ' + id
      })
    })
}

// Update a Tache by the id in the request
exports.update = (req, res) => {
  const id = req.params.id
  Tache.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      console.log(num)
      if (num === 1) {
        res.send({
          message: 'Tache mise à jour.'
        })
      } else {
        res.send({
          message: `Impossible de mettre à jour la Tache N°${id}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Impossible de mettre à jour la Tache ' + id
      })
    })
}
