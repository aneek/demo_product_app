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