const { Router } = require('express');

const router = new Router();

const productController = require('../controllers/productController');

router.get('/', productController.list);
router.post('/add', productController.save);
router.get('/update/:id', productController.edit);
router.post('/update/:id', productController.update);
router.get('/delete/:id', productController.delete);

module.exports = router;