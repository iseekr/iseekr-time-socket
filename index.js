var express = require("express.oi");
var app = express();
var fs = require('fs');
app.http().io();
app.io.set('transports', ['websocket']);

var log = app.io.of('log');

var iseekr = app.io.of('iseekr');

iseekr.on('connection', function(socket) {
	console.log('connected');
	socket.handshake.start = new Date().getTime();
	socket.on('set:cuid', function(data) {;
		socket.handshake.conversation = data;
		console.log(socket.handshake.conversation);
	});
	socket.on('disconnect', function() {
		console.log(socket.handshake.conversation,'disconnect');
		var time = new Date().getTime() - socket.handshake.start;
		console.log(socket.handshake.conversation, time);
	});
});

// body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


module.exports = function(option) {
	app.listen(option.port);
};