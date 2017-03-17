
/*
**
**	Project : ScrAPI
**	File : This is the list route index
**	Method : POST
**
*/


let logger = require('../../middleware/logger.js');

module.exports = {
	bot_run: function(req, res)
		{
			if (req.body && req.body.command) {
			console.log(req.body.command);	
			}
		}
}

