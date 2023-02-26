const { DataTypes } = require('sequelize');
const { dbConection } = require('../database/config.db');
const Product = require('./product');
const Article = require('./article');

const ProductArticles = dbConection.define('ProductArticles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  },{
    timestamps: true
});


Product.belongsToMany(Article, { through: ProductArticles });
Article.belongsToMany(Product, { through: ProductArticles });


module.exports = ProductArticles;