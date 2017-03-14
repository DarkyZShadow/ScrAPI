var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log("connection");
    io.on('event', function(data){
        console.log("event");
    });
    io.on('disconnect', function(){
        console.log("disconnect");
    });
});

app.use ('/', express.static(__dirname));
server.listen(80, function(){
    console.log('listening on *:80');
});
