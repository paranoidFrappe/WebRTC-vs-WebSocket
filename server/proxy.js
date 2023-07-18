const express = require('express');
const app     = express();
const path    = require('path');
const port    = 8002;


app.use(express.static(path.join(__dirname,'../client')));

app.get('/stream', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/stream.html'));
});

app.get('/view', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/view.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, ()=> {
    console.log("Proxy is listening to port# ", port);
});