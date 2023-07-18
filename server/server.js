const express = require('express');
const app     = express();
const path    = require('path');
const Proxy   = require('http-proxy').createProxyServer();
const port    = 8000;

// WebSocket server setup
const io = require('socket.io')(8001, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    },
    path: '/',
    serveClient: true,
    origins: '*:*',
    cookie: true,
    pingInterval: 1000,
    pingTimeout: 1000,
    upgradeTimeout: 1000,   
    allowUpgrades: true,
    cookiePath:'/',
    cookieHttpOnly:true 
});

// Whenever the Websocket server is up and connected
io.on('connection',function(socket){
    // Receiving the video data caming from the frontend camera
    // And invoking the callback function immediately and taking the video data as argument
    socket.on('stream',function(data){
    // Sending the data from the WebSocket server to all client
        socket.broadcast.emit('streamReturnBackToClients',data);
    });
});

// Running the proxy server
app.all("/*", function(req, res) {
    Proxy.web(req, res, {target: 'http://localhost:8002'});
});

app.listen(port, ()=> {
    console.log("Server is listening to port#", port);
});