const { DataTypes } = require('sequelize');
const { dbConection } = require('../database/config.db');

const Product = dbConection.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    paranoid: true,
    timestamps: true
});


module.exports = Product;
