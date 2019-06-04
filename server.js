// Require Express.
const express = require('express'),
    bodyParser = require('body-parser');


// Initialize App.
const app = express();
const port = 3000;

// Add Router.
const routes = require('./config/routes');

// Add some middleware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

// Run app.
app.listen(port, () => console.log(`Rest app is running at port ${port}`));