let express = require('express');
let app = express();
let server = require('http').createServer(app);

app.get('/',function(req, res){
	res.sendFile(__dirname  + '/static/' + 'index.html');
});
app.use('/', express.static(__dirname + '/static'));

server.listen(80, function(){
    console.log('listening on *:80');
});
