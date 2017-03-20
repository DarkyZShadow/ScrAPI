let cheerio = require('cheerio');
let io = require('socket.io')();
let events = require('./events/events.js');

io.on('connection', (socket) => {
    console.log('New client !');
		
    socket.on('search_missings', (msg) => (events.search(socket, msg)));
    socket.on('zombie_mode', (msg) => (events.zombie(socket, msg)));
    socket.on('search_mail', msg => (events.search_mail(socket, msg)));	
    socket.on('disconnect', function(){
	console.log("disconnect");
    });
});

console.log('listening on *:9999');
io.listen(9999);
