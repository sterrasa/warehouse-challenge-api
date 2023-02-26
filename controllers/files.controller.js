const fs = require('fs');
const Product = require('../models/product');
const Article = require('../models/article');
const ProductArticles = require('../models/product-article');
const { dbConection } = require('../database/config.db');
const { validateProductSchema, validateInventorySchema } = require('../helpers/jsonschema-validators');


const importProductsFromJson = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Not uploaded any File'
      });
    }
    //Check json format in order to allow upload data
    const jsonFile = JSON.parse(fs.readFileSync(req.file.path));
    const isValidJson = validateProductSchema(jsonFile);
    if (!isValidJson.valid) {
      const error = isValidJson.errors[0].message
      return res.status(400).json({ error })
    }

    const { products } = jsonFile;
    // Start a transaction to ensure data consistency
    const transaction = await dbConection.transaction();

    // Iterate over all the products and their articles and create the necessary instances
    for (const product of products) {
      const { name, price, contain_articles } = product;

      // Create the product instance
      const newProduct = await Product.create(
        { name, price },
        { transaction }
      );

      if (!newProduct || !newProduct.id) {
        return res.status(400).json({ error: 'Failed to create product' });
      }
      // Iterate over the articles of the product and create the necessary instances
      for (const article of contain_articles) {
        const { art_id, amount_of } = article;

        // Find the article instance from the database
        const existingArticle = await Article.findOne({
          where: { id: art_id }
        });

        if (!existingArticle) {
          // If the article does not exist, roll back the transaction and return an error response
          await transaction.rollback();
          return res.status(400).json({ error: `Article with id ${art_id} does not exist` });
        }

        // Check if there is enough stock for the article
        if (existingArticle.stock < amount_of) {
          // If there is not enough stock, roll back the transaction and return an error response
          await transaction.rollback();
          return res.status(400).json({ error: `Not enough stock for article with id ${art_id}` });
        }
        
        // Create the ProductArticles instance with the necessary data
        await ProductArticles.create(
          {
            ProductId: newProduct.id,
            ArticleId: existingArticle.id,
            quantity: amount_of,
          },
          { transaction }
        );
      }
    }
    //Commit the transaction and return a success response
    await transaction.commit()
    return res.status(201).json({ message: 'Products imported successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const importInventoryFromJson = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file detected'
      });
    }
    const jsonFile = JSON.parse(fs.readFileSync(req.file.path));
    const isValidJson = validateInventorySchema(jsonFile);
    if (!isValidJson.valid) {
      const error = isValidJson.errors[0].message
      return res.status(400).json({ error })
    }
    const { inventory } = jsonFile;

    // Iterate over all the products and their articles and create the necessary instances
    for (const item of inventory) {
      // search article in DB
      const [article, created] = await Article.findOrCreate({
        where: { id: item.art_id },
        defaults: { name: item.name, stock: 0 }
      });

      // Update stock
      article.stock += parseInt(item.stock);
      await article.save();
    }

    return res.status(201).json({ message: 'Inventory imported successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  importProductsFromJson,
  importInventoryFromJson
}