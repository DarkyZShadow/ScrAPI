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

let every_properties = {
	SIREN: "SIREN",
	SIRET: "SIRET",
	NIC: "NIC",
	name: "nomen_long",
	address: "address",
	members: "members",
	type: "libnj",
	desc: "libape",
	size: "libtef",
	category: "categorie",
	date: "dcr"
};

module.exports = {
    POST: function (req, res)
				{
					Model.find({ nomen_long: new RegExp("^.*" + req.body.name + ".*$", "i") }, function(err,models) {
         		if (err) {
            	res.render('error', {
                status: 500
            	});
        		} else {
							let object = JSON.parse(JSON.stringify(models[0]));
							var send = {
								data: {},
								missing: []
							};
							for(let i = 0; i < Object.keys(every_properties).length; i++) {
								let key = Object.keys(every_properties)[i];
								let value = every_properties[key];
								if (object[value]) {
									send.data[key] = object[value];
								} else {
									send.missing.push(key);
								}
							}
            	res.jsonp(send);
        		}
    			});
				}
}

