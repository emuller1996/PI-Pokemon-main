const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Tipo', {
      name: {
        type: DataTypes.STRING
      }
  
    });
  };