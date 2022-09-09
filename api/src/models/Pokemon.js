const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id : {
      type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
    },
    ataque :{
      type: DataTypes.INTEGER,
    },
    defensa : {
      type: DataTypes.INTEGER,
    },
    velocidad : {
      type: DataTypes.INTEGER,
    },
    altura : {
      type: DataTypes.INTEGER,
    },
    peso : {
      type: DataTypes.INTEGER,
    }
  });
};
