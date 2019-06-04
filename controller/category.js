'use strict';

const category = require('../model/category');
const recursion = require('../utils/recursion');

// Category listing and create.
exports.category = (req, res, next) => {
    switch (req.method) {
        // List of categories.
        case 'GET':
            category.listAll((err, category) => {
                if (err) {
                    res.status(400).json(err);
                }
                // Recurse the categories to get a list of categories.
                let data = recursion(category);
                res.status(200).json(data);
            })
            break;

        case 'POST':
            let body = req.body;
            body.parent = (body.parent ? body.parent : null);
            // Request validation.
            if (!body.name) {
                res.status(400).json({
                    error:true,
                    message: 'Name field is empty'
                });
            }
            category.createCategory(body, (err, result) => {
                if (err) {
                    res.status(400).json(err);
                }
                res.status(201).json({
                    error: false,
                    message: 'Category created'
                });
            });
            break;
    }
};

// Category listing and create.
exports.singleCategory = (req, res, next) => {
    switch (req.method) {
        case 'GET':
            category.listSingle(req.params.uuid, (err, category) => {
                if (err) {
                    res.status(400).json(err);
                }
                res.status(200).json(category);
            });
            break;

        case 'PUT':
            let body = req.body;
            body.parent = (body.parent ? body.parent : null);
            // Request validation.
            if (!body.name) {
                res.status(400).json({
                    error:true,
                    message: 'Name field is empty'
                });
            }
            category.updateCategory(req.params.uuid, body, (err, result) => {
                if (err) {
                    res.status(400).json(err);
                }
                res.status(200).json({
                    error: false,
                    message: 'Category updated'
                });
            });
            break;

        case 'DELETE':
            category.deleteCategory(req.params.uuid, (err, result) => {
                if (err) {
                    res.status(400).json(err);
                }
                res.status(202).json({
                    error: false,
                    message: 'Category deleted'
                });
            });
            break;
    }
};
