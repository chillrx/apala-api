'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doacoes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      meiopagamento: {
        type: Sequelize.ENUM,
        values: ['TRANSFERENCIA','PAGSEGURO','DEPÓSITO']
      },
      contribuinte_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Contribuintes',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Doacoes');
  }
};
