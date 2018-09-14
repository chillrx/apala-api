'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Parceiro', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foto: DataTypes.STRING,
        site: DataTypes.STRING,
        posicao: DataTypes.INTEGER
    });
}