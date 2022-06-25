// imports
const express = require('express');
const bodyParser = require('body-parser');
const calculation = require('./modules/calculationHistory.js')

// instance of a server

const app = express();
const PORT = 5000;

// server static files
app.use(express.static('server/public'));

// middlewares
app.use(bodyParser.urlencoded({extended: true}));

// Flow
// onload -> GET -> render
// POST -> GET -> render

// localhost:5000/ replace

// post from client side

// the server will run on...
app.listen(PORT, function() {
    console.log('SERVER RUNNING ON PORT', PORT);
});