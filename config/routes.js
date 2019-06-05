'use strict';

const express = require('express');
const router = express.Router();
const methods = require('../middleware/methods');


// Add the list of controllers.
const categoryController = require('../controller/category');
const productController = require('../controller/product');

router.all('/category', methods([`GET`, `POST`]), categoryController.category);
router.all('/category/:uuid',  methods([`GET`, `PUT`, `DELETE`]), categoryController.singleCategory);
router.all('/category/:uuid/product', methods([`GET`]), categoryController.categoryProducts);

router.all('/product', methods([`GET`, `POST`]), productController.product);
router.all('/product/:uuid', methods([`GET`, `PUT`, `DELETE`]), productController.singleProduct);


// Export routes.
module.exports = router;