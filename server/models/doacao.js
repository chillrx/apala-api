'use strict';
module.exports = (sequelize, DataTypes) => {
  var Doacao = sequelize.define('Doacao', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    meiopagamento: {
      type: DataTypes.ENUM,
      values: ['TRANSFERENCIA','PAGSEGURO','DEPÓSITO'],
      allowNull: false
    }
  }, {
    tableName: 'doacoes',
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        Doacao.belongsTo(models.Contribuinte, {
          as: 'contribuinte',
          foreignKey: 'contribuinte_id',
          targetKey: 'id'
        });
      }
    }
  });
  return Doacao;
};
