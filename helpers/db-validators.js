const { Article } = require('../models');
const { Product } = require('../models');

/**
 * Categories
 */
 const existArticleById = async( id ) => {
    const existArticle = await Article.findByPk(id);
    if ( !existArticle ) {
        throw new Error(`Article doesn't exist ${ id }`);
    }
}

/**
 * Products
 */
const existPoductById = async( id ) => {
    const existProduct = await Product.findByPk(id);
    if ( !existProduct ) {
        throw new Error(`Product doesn't exist ${ id }`);
    }
}

module.exports = {
    existArticleById,
    existPoductById
}
