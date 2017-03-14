/*
**
**  Project : ScrAPI
**  File : This is the logger middleware
**
*/

let fs = require('fs');
let config = require('../../config/default.js');

module.exports = {
    log_route: function (req, res, next)
    {
        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress;
        var logs = `\n[${date}] : ${ip.slice(7)}\n`
            + `Method : ${req.method}\n`
            + `Path : ${req.url}\n`
            + `Body : ${JSON.stringify(req.body)}`;

        console.log(logs);
        fs.appendFileSync(config.log_file, logs + '\n');
        next();
		}
}
