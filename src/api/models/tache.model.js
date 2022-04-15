module.exports = (sequelize, Sequelize) => {
  const Tache = sequelize.define('tache', {
    numero: {
      type: Sequelize.INTEGER
    },
    ordreTravail: {
      type: Sequelize.BOOLEAN
    },
    avis: {
      type: Sequelize.BOOLEAN
    },
    nom: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    dateDebut: {
      type: Sequelize.STRING
    },
    dateFin: {
      type: Sequelize.STRING
    },
    ressources: {
      type: Sequelize.STRING
    }
  })
  return Tache
}
