const { Router } = require('express');

const { importProductsFromJson, importInventoryFromJson } = require('../controllers/files.controller');
const {  upload } = require('../helpers/file-validators');

const router = Router();

/**
 * {{url}}/api/Files
*/

//Import products from JSON
router.post('/importProducts', upload.single('file'),importProductsFromJson);

//Import Inventory from JSON
router.post('/importInventory', upload.single('inventory'), importInventoryFromJson);


module.exports = router;