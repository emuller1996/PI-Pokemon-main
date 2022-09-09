const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Tipo', {
      nombre: {
        type: DataTypes.STRING
      }
  
    });
  };