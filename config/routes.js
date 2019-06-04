'use strict';

const express = require('express');
const router = express.Router();
const methods = require('../middleware/methods');


// Add the list of controllers.
const categoryController = require('../controller/category');

router.all('/category', methods([`GET`, `POST`]), categoryController.category);
router.all('/category/:uuid',  methods([`GET`, `PUT`, `DELETE`]), categoryController.singleCategory);


// Export routes.
module.exports = router;