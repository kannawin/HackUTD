var express = require("express");
var app = express();
//var app = require('http').createServer(handler)
//	, io = require('socket.io').listen(app)
//	, fs = require('fs')
//app.listen(3700);


app.get('/',function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));
var io=require('socket.io').listen(app.listen(3700));

io.sockets.on('connection',function(socket){
	socket.emit('message',{ message:'welcome to the chat',username:'Server' });
	socket.on('send',function(data){
		// io.sockets.emit('name',data);
		io.sockets.emit('message',data);
		console.log("message sent");
	});
	socket.on('draw',function(data){
		io.sockets.emit('drawable',data);
	});
});




console.log("Listening on port " + 3700);
