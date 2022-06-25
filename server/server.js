// imports
const express = require('express');
const bodyParser = require('body-parser');
const calculationList = require('./modules/calculationHistory.js')

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

// localhost:5000/calculations
app.get('/calculations', (req, res) => {
    console.log('in GET /calculations');
    res.send(calculationList);
});

app.post('/calculations', (req, res) => {
    // The calculation is here
    console.log('POST /calculations', req.body);

    // save the calculation
    calculationList.push(req.body);

    // send back response
    res.sendStatus(201);
})

// post from client side

// the server will run on...
app.listen(PORT, function() {
    console.log('SERVER RUNNING ON PORT', PORT);
});