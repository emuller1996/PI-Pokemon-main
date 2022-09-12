const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, 
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
    },
    image : {
      type: DataTypes.TEXT,
      defaultValue: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c31f.png'
    }
  });
};
