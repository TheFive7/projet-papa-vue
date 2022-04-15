module.exports = (sequelize, Sequelize) => {
  const Ressource = sequelize.define('ressource', {
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    assignation: {
      type: Sequelize.STRING
    }
  })
  return Ressource
}
