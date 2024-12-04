const express = require('express');
const configViewEngine = (app) => {
    app.set('views', './core/views');
    app.set('view engine', 'ejs');
    //config static files
    app.use(express.static('./core/public'));
};

module.exports = configViewEngine;