/*
**
**	Project : ScrAPI
**	File : This is the list route index
**	Method : POST
**
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let logger = require('../../middleware/logger.js');
let	db = require('../../../config/db.js');
//db.mongoose = mongoose

var schema = new db.mongoose.Schema({
	SIREN: Number,
	NIC: Number
});
schema.set('collection', 'raw_datas');
var Model = mongoose.model('datas', schema);

module.exports = {
    POST: function (req, res)
				{
					Model.find({ nomen_long: new RegExp("^.*" + req.body.name + ".*$", "i") }, function(err,models) {
         		if (err) {
            	res.render('error', {
                status: 500
            	});
        		} else {
            	res.jsonp(models);
        		}
    			});
				}
}

