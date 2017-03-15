let cheerio = require('cheerio');
let io = require('socket.io')();
let events = require('./events/events.js');

io.on('connection', events.connection);

io.listen(9999, function(){
	console.log('listening on *:9999');
});

/*
let clients = Array();

io.on('connection', function(socket){
	if (!containsSocket(clients, socket))
	{
		console.log("New client");
		
		socket.on('event', function(data){
			console.log("event");
		});
		socket.on('disconnect', function(){
			console.log("disconnect");
			clients.splice(clients.indexOf(5), 1);
		});
		clients.push(socket);
	}
});

function containsSocket(arr, sock)
{
	var i = arr.length;
	
	while (i--)
		if (arr[i].address === sock.address && arr[i].port === sock.port)
           return true;
    return false;
}
*/