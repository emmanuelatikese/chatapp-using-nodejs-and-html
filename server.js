const http = require('http');
const express = require('express');
const app = express();
const io = require('socket.io');


const server = http.createServer(app);


const Port = 5000;

server.listen(Port, ()=>{
	console.log(`listening on port:${Port}`);
});
