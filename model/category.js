'use strict';

const db = require('../config/database');
const uuid = require('uuid/v1');
const moment = require('moment');


// List all the categories.
exports.listAll = (result) => {
    db.query("SELECT id, uuid, name, parent AS parentid FROM `categories`", (err, rows) => {
        if(err) {
            result(err, null);
        }
        else {
            rows.forEach((r, i) => {
                r.links  = {products : '/category/' + r.uuid + '/product'};
            });
            result(null, rows);
        }
    })
};

// Get a single Category.
exports.listSingle = (uuid, result) => {
    db.query("SELECT id, uuid, name, parent AS parentid FROM `categories` WHERE uuid = ?", uuid, (err, rows) => {
        if(err) {
            result(err, null);
        }
        else {
            result(null, rows);
        }
    })
};

// Create a new Category.
exports.createCategory = (data, result) => {
    let insertData = [uuid(), data.name, data.parent, moment().unix(), moment().unix()];
    db.query("INSERT INTO `categories` (uuid, name, parent, created, modified) VALUES (?, ?, ?, ?, ?)", insertData, (err, rows) => {
        if(err) {
          result(err, null);
        }
        else {
          result(null, rows);
        }
  })
};

// Update one existing category.
exports.updateCategory = (uuid, data, result) => {
    let updateData = [data.name, data.parent, moment().unix(), uuid];
    db.query("UPDATE `categories` SET name = ?, parent = ?, modified = ? WHERE uuid = ?", updateData, (err, rows) => {
        if(err) {
            result(err, null);
        }
        else {
            result(null, rows);
        }
    })
};

// Delete one category.
exports.deleteCategory = (uuid, result) => {
    db.query("DELETE FROM `categories` WHERE uuid = ?", uuid, (err, rows) => {
        if(err) {
            result(err, null);
        }
        else {
            result(null, rows);
        }
    })
};

// List all products by category.
exports.categoryProducts = (uuid, result) => {
    db.query("SELECT p.id, p.uuid, p.name, p.description, p.sku, p.price, p.quantity, p.in_stock FROM `products` AS p " +
        "LEFT JOIN `categories_products` AS cp ON p.id = cp.product_id " +
        "INNER JOIN `categories` AS c ON c.id = cp.category_id WHERE c.uuid = ?",  uuid, (err, rows) => {
        result(err, rows);
    });
};