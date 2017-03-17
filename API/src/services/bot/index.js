
/*
**
**	Project : ScrAPI
**	File : This is the list route index
**	Method : POST
**
*/

let io = require('socket.io-client')("http://localhost:9999");
let logger = require('../../middleware/logger.js');

module.exports = {
	bot_run: function(req, res)
		{
			if (!req.body || !req.body.SIREN || !req.body.NIC
					|| !req.body.SIREN instanceof String || !req.body.NIC instanceof String) {
				res.sendStatus(400);
				return;
			}
			io.emit("zombie_mode", req.body);
			console.log('connection');
			res.sendStatus(200);
		}
}

