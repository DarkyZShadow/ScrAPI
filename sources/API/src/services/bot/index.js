
/*
**
**	Project : ScrAPI
**	File : This is the list route index
**	Method : POST
**
*/

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
	bot_run: function(req, res, io)
		{
			if (!req.body || !req.body instanceof Array) {
				res.sendStatus(400);
				return ;
			}

			let arr = req.body;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i]) {
					arr[i].SIRET = to_siret(arr[i].SIREN, arr[i].NIC);
				}
			}
			
			io.emit("zombie_mode", arr);
			res.sendStatus(200);
		}
}

