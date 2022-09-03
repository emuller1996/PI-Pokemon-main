const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('tipo', {
      nombre: {
        type: DataTypes.STRING
      }
  
    });
  };