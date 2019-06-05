'use strict';

const product = require('../model/product');

// Action for GET and POST product.
exports.product = (req, res, next) => {
    switch (req.method) {
        case 'GET':
            product.listAllProducts((err, products) => {
                if (err) {
                    res.status(400).json(err);
                }
                res.status(200).json(products);
            })
            break;

        case 'POST':
            // Create a new product.
            let validation = validateProduct(req.body);
            if (validation == null) {
                product.createProduct(req.body, (err, result) => {
                    if (err) {
                        res.status(400).json(err);
                    }
                    res.status(201).json({
                        error: false,
                        message: 'Product created'
                    });
                });
            }
            else {
                res.status(400).json({
                    error:true,
                    message: validation
                });
            }
            break;
    }
};


// Action for view single, update or delete a product.
exports.singleProduct = (req, res, next) => {
    switch (req.method) {
        case 'GET':
            break;

        case 'PUT':
            // Update a new product.
            let validation = validateProduct(req.body);
            if (validation == null) {
                product.updateProduct(req.params.uuid, req.body, (err, result) => {
                    if (err) {
                        res.status(400).json(err);
                    }
                    res.status(200).json({
                        error: false,
                        message: 'Product updated'
                    });
                });
            }
            else {
                res.status(400).json({
                    error:true,
                    message: validation
                });
            }
            break;
    }
};



const validateProduct = (body) => {
    let errorMessage = [];
    // Validation checks.
    if  (!body.name) {
        errorMessage.push("Please provide a product name.");
    }
    else if (!body.description) {
        errorMessage.push("Please provide some product description.");
    }
    else if (!body.sku) {
        errorMessage.push("Please provide a product SKU.");
    }
    else if (!body.price) {
        errorMessage.push("Please provide a product price.");
    }
    else if (!body.quantity) {
        errorMessage.push("Please provide a product quantity.");
    }
    else if (!body.in_stock) {
        errorMessage.push("Please select whether product in stock or not.");
    }
    else if (!body.category) {
        errorMessage.push("Please provide product category.");
    }

    // Show error message.
    if (typeof errorMessage !== 'undefined' && errorMessage.length > 0) {
        let message = errorMessage.join(", ");
        return message;
    }
    else {
        return null;
    }
};