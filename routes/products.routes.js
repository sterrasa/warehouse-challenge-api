const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { sellProduct, getAllProducts } = require('../controllers/products.controller');
const { existPoductById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/Products
 */

//get all products
router.get('/', getAllProducts);

// Sell Product
router.post('/sell/:id', [
  check('id').custom(existPoductById),
  validateFields
], sellProduct);


module.exports = router;