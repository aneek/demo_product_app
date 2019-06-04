// Add MySQL package.
const mysql = require('mysql2');

// Define the parameters for the connection.
const user = 'demoappuser';
const password = 'demoapppass';
const host = 'mysql_server';
const port = 3306;
const db = 'demo_product_app';


// Connection pool.
const pool = mysql.createPool({
    'host': host,
    'port': port,
    'user': user,
    'password': password,
    'database': db
});

module.exports = pool;