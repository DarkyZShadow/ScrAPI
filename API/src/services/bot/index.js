
/*
**
**	Project : ScrAPI
**	File : This is the list route index
**	Method : POST
**
*/

let io = require('socket.io-client')("http://localhost:9999");
let logger = require('../../middleware/logger.js');

function to_siren(SIREN)
{
	let output = String(SIREN);

	while (output.length < 9)
		output = '0' + output;
	return output;
}

function to_siret(SIREN, NIC)
{
  let output = String(NIC);

  while (output.length < 5)
	   output = '0' + output;
  return (to_siren(SIREN) + output);
}

module.exports = {
	bot_run: function(req, res)
		{
			if (!req.body || !req.body.SIREN || !req.body.NIC
					|| !req.body.SIREN instanceof String || !req.body.NIC instanceof String) {
				res.sendStatus(400);
				return;
			}

			let SIRET = to_siret(req.body.SIREN, req.body.NIC);
			var data = {
				SIRET: SIRET
				};
			io.emit("zombie_mode", data);
			res.sendStatus(200);
		}
}

