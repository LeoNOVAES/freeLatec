const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');
const expressValidator = require('express-validator');

app.set('view engine','ejs');
app.set('views','./app/views');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('./app/public'));
app.use(expressValidator());


consign().include('app/routes').then('app/controllers').into(app);

module.exports = app;