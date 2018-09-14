'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Instituicao', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
       titulo: {
           type: DataTypes.STRING,
           allowNull: false
       },
       descricao: DataTypes.STRING 
    });
}