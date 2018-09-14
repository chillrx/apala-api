'use strict';
module.exports = (sequelize, DataTypes) => {
  var Campanha = sequelize.define('Campanha', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: DataTypes.STRING,
    inicio: DataTypes.DATE,
    fim: DataTypes.DATE,
    imagem: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Campanha;
};
