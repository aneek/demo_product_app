'use strict';

const db = require('../config/database');
const uuid = require('uuid/v1');
const moment = require('moment');


// List all Products.
exports.listAllProducts = (result) => {
    db.query("SELECT p.id, p.uuid, p.name, p.description, p.sku, p.price, p.quantity, p.in_stock " +
        "FROM `products` AS p", (err, products) => {
        if(err) {
            result(err, null);
        }
        else {
            result(null, products);
        }
    });
};


// Create a new Product.
exports.createProduct = (data, result) => {
    let insertData = [uuid(), data.name, data.description, data.sku, data.price, data.quantity, data.in_stock, moment().unix(), moment().unix()];
    db.query("INSERT INTO `products` (uuid, name, description, sku, price, quantity, in_stock, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", insertData, (err, rows) => {
        if(err) {
            result(err, null);
        }
        else {
            // Map the category as well.
            if (typeof data.category !== 'undefined' && data.category.length > 0) {
                let productCategoryMapping = [];
                data.category.forEach((value, index) => {
                    productCategoryMapping[index] = [value, rows.insertId];
                });
                db.query("INSERT INTO `categories_products` (category_id, product_id) VALUES ?", [productCategoryMapping]);
            }
            result(null, rows);
        }
    })
};

// Update a Product.
exports.updateProduct = (uuid, data, result) => {
    let updateData = [data.name, data.description, data.sku, data.price, data.quantity, data.in_stock, moment().unix(), uuid];
    db.query("UPDATE `products` SET name = ?, description = ?, sku = ?, price =  ?,  quantity = ?, in_stock  = ?, modified = ? WHERE uuid = ?", updateData, (err, rows) => {
        if(err) {
            result(err, null);
        }
        else {
            // Map the category as well if present.
            if (typeof data.category !== 'undefined' && data.category.length > 0) {
                // Get the product id.
                db.query("SELECT id FROM `products` WHERE uuid = ?", uuid, (err, rows) => {
                    // Delete all values from mapping table via Product id.
                    db.query("DELETE FROM `categories_products` WHERE product_id = ?", rows[0].id);
                    let productCategoryMapping = [];
                    data.category.forEach((value, index) => {
                        productCategoryMapping[index] = [value, rows[0].id];
                    });
                    db.query("INSERT INTO `categories_products` (category_id, product_id) VALUES ?", [productCategoryMapping]);
                });
            }
            result(null, rows);
        }
    })
};

// Delete a Product.
exports.deleteProduct = (uuid, result) => {
    db.query("DELETE FROM `products` WHERE uuid = ?", uuid, (err, rows) => {
        if(err) {
            result(err, null);
        }
        else {
            // Remove the mapping as well.
            db.query("SELECT id FROM `products` WHERE uuid = ?", uuid, (err, rows) => {
                db.query("DELETE FROM `categories_products` WHERE product_id = ?", rows[0].id);
            });
            result(null, rows);
        }
    })
};
