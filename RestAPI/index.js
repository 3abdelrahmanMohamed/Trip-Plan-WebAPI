const express = require('express');
const routes = require('./api');
const bodyParser = require('body-parser');
const sql = require('mysql');
var cors = require('cors');




// set up an express app
const app = express();
app.use(express.json());

app.use(
    cors({origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://127.0.0.1:3000']})
  );

//initialize routes 
app.use('/api/v1.1',routes);

// parser for reading request
app.use(bodyParser.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// listen for requests
app.listen(8080,function(){
    console.log('Listening...')
});