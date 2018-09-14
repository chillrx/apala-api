'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contribuinte = sequelize.define('Contribuinte', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: DataTypes.STRING,
    tiposanguineo: {
      type: DataTypes.ENUM,
      values: ['A+','A-', 'B+', 'B-', 'AB', 'O+', 'O-']
    },
    doador: DataTypes.BOOLEAN,
    foto: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Contribuinte.hasMany(models.Doacao,{
          as: 'doacoes',
          foreignKey: 'contribuinte_id',
          sourceKey: 'id'
        });
      }
    }
  });
  return Contribuinte;
};
