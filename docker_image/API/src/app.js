/*
**
**	Project : ScrAPI
**	File : This is the app's entry point
**
*/

let express = require('express');
let logger = require('./middleware/logger.js');
let config = require('../config/default.js');
let route_handler = require('./middleware/route_handler.js');
let bodyParser = require('body-parser');
let router = express.Router();
let io = require('socket.io-client')("http://localhost:9999");
let app = express();

io.on('connect',function() {
  console.log('Connected to the Bot!');
});

io.on('insert',function(data) {
	route_handler.company.comp_add_or_up_bot(data);
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, cache-control, Authorization, X-Requested-With");
	next();
});

router.use(logger.log_route)
  .post('/company', route_handler.company.comp_get)
	.put('/company', route_handler.company.comp_add_or_up)
	.post('/bot', (req, res) => route_handler.bot.bot_run(req, res, io))

app.use(bodyParser.json());
app.use(router);
app.listen(config.port);

console.log("API Server just successfully started at port " + config.port);
