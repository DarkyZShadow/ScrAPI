let cheerio = require('cheerio');
let io = require('socket.io')();
let events = require('./events/events.js');

let clients = Array();

io.on('connection', (socket) =>
{
	console.log('New client !');
		
	socket.on('search_missings', (msg) => (events.search(socket, msg)));
	socket.on('zombie_mode', (msg) => (events.zombie(socket, msg)));
		
	socket.on('disconnect', function(){
		console.log("disconnect");
	});
});

console.log('listening on *:9999');
io.listen(9999);

function containsSocket(arr, sock)
{
	var i = arr.length;
	
	while (i--)
		if (arr[i].address === sock.address && arr[i].port === sock.port)
           return true;
    return false;
}
