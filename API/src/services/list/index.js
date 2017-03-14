/*
**
**	Project : ScrAPI
**	File : This is the list route index
**
*/

let logger = require('../../middleware/logger.js');

module.exports = {
    GET: function (req, res)
        {
					res.send("Hello World");
				}
}

