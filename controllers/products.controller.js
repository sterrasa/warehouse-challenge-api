const { response } = require('express');
const { Product, Article, ProductArticles } = require('../models');



const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Article,
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                    nested: true
                },
                through: {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'ArticleId']
                    }
                }
            }
        });

        const sellableProducts = [];

        products.forEach(product => {

            let sellable = true;
            product.Articles.forEach(article => {
                if (article.stock < article.ProductArticles.quantity) {
                    sellable = false;
                }
            });
            if (sellable) {
                sellableProducts.push(product);
            }
        });

        res.status(200).json({ products: sellableProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const sellProduct = async (req, res = response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Article,
                    through: {
                        model: ProductArticles,
                        attributes: ['quantity']
                    }
                }
            ]
        });
        if (product) {
            const articleQuantities = {};
            for (const article of product.Articles) {
                const articleQuantity = article.ProductArticles.quantity;
                //check if stock is available to sell the product
                if (article.stock < articleQuantity) {
                    return res.status(409).json({ error: `Not enough stock available to sell this product` });
                }
                articleQuantities[article.id] = articleQuantity;
            }
            // Update the stock of each article
            for (const [articleId, quantity] of Object.entries(articleQuantities)) {
                const article = await Article.findByPk(articleId);
                article.stock -= quantity;
                await article.save();
            }
        }
        // here we can update the stock or remove the product
        await product.destroy();

        res.status(204).json({ message: 'Product sold successfully' });

    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
}


module.exports = {
    sellProduct,
    getAllProducts
}