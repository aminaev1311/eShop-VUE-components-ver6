const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use( express.json() ); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static( '../public' ));

app.listen( 3002, () => {
    console.log("server is running on port 3002");
    console.log(__dirname);
});

//get catalog items
app.get('/catalogData', (req,res) => {
    fs.readFile( path.join(__dirname, 'db/catalog.json') , 'utf-8', (err, data) => {
        if (err) res.sendStatus(404, JSON.stringify({result: 0, text: err}) )
        else res.send(data);
    });
});

//get cart items
app.get('/cart', (req,res) => {
    fs.readFile( path.join(__dirname, 'db/cart.json') , 'utf-8', (err,data) => {
        if (err) res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        else res.send(data);
    });
});

//post new cart item
app.post('/cart', (req,res) => {
    fs.readFile( path.join(__dirname, 'db/cart.json') , 'utf-8', (err,data) => {
        if (err) res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        else {
            const cart = JSON.parse(data); //create an array of JSON cart objects
            cart.push( req.body );//add a new item)
            fs.writeFile( path.join(__dirname, 'db/cart.json'), JSON.stringify(cart), err => {
                if (err) res.send( JSON.stringify({result: 0, text: err}) )
                else {
                    res.send( JSON.stringify( {result: 1}));
                }
            })
        }
    });
});

app.put('/cart/:id', (req,res) => {
    fs.readFile( path.join(__dirname, 'db/cart.json') , 'utf-8', (err,data) => {
        if (err) res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        else {
            const cart = JSON.parse(data); //create an array of JSON cart objects
            console.log(cart);
            const elem = cart.find( el => el.id_product === +req.params.id );
            console.log("element:" + elem);
            console.log("element quantity:" + elem.quantity);
            console.log("request body: " + req.body);
            if (elem) elem.quantity++;
            else console.log("no such element in the cart!");
            fs.writeFile( path.join(__dirname, 'db/cart.json'), JSON.stringify(cart), err => {
                if (err) res.send( JSON.stringify({result: 0, text: err}) )
                else {
                    res.send( JSON.stringify( {result: 1}));
                }
            })
        }
    });
});

app.delete('/cart/:id', (req,res) => {
    fs.readFile( path.join(__dirname, 'db/cart.json') , 'utf-8', (err,data) => {
        if (err) res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        else {
            const cart = JSON.parse(data); //create an array of JSON cart objects
            console.log(cart);
            const elem = cart.find( el => el.id_product === +req.params.id );
            console.log("element:" + elem);
            console.log("element quantity:" + elem.quantity);
            console.log("request body: " + req.body);
            if (elem) elem.quantity--;
            else console.log("no such element in the cart!");
            if (elem.quantity === 0 ) {
                cart.splice( cart.indexOf(elem) ,1);
            }
            fs.writeFile( path.join(__dirname, 'db/cart.json'), JSON.stringify(cart), err => {
                if (err) res.send( JSON.stringify({result: 0, text: err}) )
                else {
                    res.send( JSON.stringify( {result: 1}));
                }
            })
        }
    });
});

app.post('/stats', (req,res) => {
    fs.readFile( path.join(__dirname, 'db/stats.json') , 'utf-8', (err,data) => {
        if (err) res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        else {
            const stats = JSON.parse(data); //create an array of JSON cart objects
            stats.push( req.body );//add a new item)
            fs.writeFile( path.join(__dirname, 'db/stats.json'), JSON.stringify(stats), err => {
                if (err) res.send( JSON.stringify({result: 0, text: err}) )
                else {
                    res.send( JSON.stringify( {result: 1}));
                }
            })
        }
    });
});