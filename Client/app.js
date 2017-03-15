let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

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

app.get('/',function(req, res){
	res.sendFile(__dirname  + '/static/' + 'index.html');
});
app.use('/', express.static(__dirname + '/static'));

server.listen(80, function(){
    console.log('listening on *:80');
});

function containsSocket(arr, sock)
{
	var i = arr.length;
	
	while (i--)
		if (arr[i].address === sock.address && arr[i].port === sock.port)
           return true;
    return false;
}
