const express = require('express');
const fs = require('fs');

const app = express();

app.use('/',express.static('./public'));

app.listen( 3002, () => console.log("server is running on port 3002"));

app.get('/catalogData', (req,res) => {
    fs.readFile('/server/db/catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.get('/cart', (req,res) => {
    fs.readFile('/server/db/cart.json', 'utf-8', (err,data) => {
        res.send(data);
    });
});