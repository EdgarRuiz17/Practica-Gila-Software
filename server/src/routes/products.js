const { Router } = require('express');

const router = new Router();

const productController = require('../controllers/productController');

router.get('/', productController.list);
router.post('/add', productController.save);
router.post('/add/attributes', productController.saveAttributes);
router.get('/categories', productController.listCategories);
router.get('/categories/:id', productController.listProductsByCategories);
router.get('/sku/:id', productController.listSKU);
router.get('/delete/:id', productController.delete);
router.get('/delete/attributes/:id', productController.deleteAttributes);

module.exports = router;