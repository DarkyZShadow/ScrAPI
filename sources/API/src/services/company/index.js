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

let schema = new db.mongoose.Schema({
	"SIREN"						: Number,
	"NIC"							: Number,
	"nomen_long"			: String,
	"Adresse"					: String,
	"Code postal"			: String,
	"Ville"						: String,
	"Pays"						: String,
	"Service client"	: String,
	"employees"				: Array,
	"url"							: String
});
schema.set('collection', 'raw_datas');

let Model = mongoose.model('datas', schema);

let every_properties = {
	"Nom"							:	"nomen_long",
	"SIRET"						:	"siret",
	"SIREN"						:	"SIREN",
	"NIC"							:	"NIC",
	"Adresse"					:	"address",
	"Code postal"			:	"Code postal",
	"Ville"						:	"Ville",
	"Pays"						:	"Pays",
	"Type"						:	"libnj",
	"Description"			:	"libape",
	"Taille"					:	"libtef",
	"Categorie"				:	"categorie",
	"Creation"				:	"dcr",
	"Capital social"	:	"capital",
	"Telephone"				:	"Telephone",
	"Url"							:	"url",
	"employees"				:	"employees"
};

const splitAt = index => it => 
						  [it.slice(0, index), it.slice(index)];

function capitalize(s)
{
	return s && s[0].toUpperCase() + s.slice(1);
}

function company_find(res, query, id) {
	Model.find(query).exec(function(err,models) {
    if (err) {
     	res.render('error', {
			status: 500
    });
    } else {
			var send = {
				data: {},
				missing: []
			};
			let name = String(query.nomen_long);
			if (!models[0]) {
				if (id.length == 9) {
					if (isNaN(parseInt(id))) {
						send.data.Nom = capitalize(id);
					} else {
						send.data.SIREN = id;
					}
				} else if (id.length == 14 && !isNaN(id))  {
					send.data.SIRET = id;
				} else {
					send.data.Nom = id;
				}

				for(let i = 0; i < Object.keys(every_properties).length; i++) {
					let key = Object.keys(every_properties)[i];
					if (!send.data[key])
						send.missing.push(key);
				}
				res.jsonp(send);
				return;
			}
			let object = JSON.parse(JSON.stringify(models[0]));
			for(let i = 0; i < Object.keys(every_properties).length; i++) {
				let key = Object.keys(every_properties)[i];
				let value = every_properties[key];
				if (object[value]) {
					if (key == 'Creation') {
						var pattern = /(\d{4})(\d{2})(\d{2})/;
						var str = object[value];
						str = String(str);
						send.data[key] = String(str.replace(pattern, '$1-$2-$3'));
					} else {
							send.data[key] = object[value];
						}
				} else {
						send.missing.push(key);
				}
			}
      res.jsonp(send);
    }
  });
}

module.exports = {
    comp_get: function (req, res)
				{
					if (!req.body || !req.body.id) {
						res.sendStatus(500);
						return;
					}
					let id = req.body.id;
					var query;
					if (id.length == 9) {
						if (isNaN(parseInt(id))) {
							query = { nomen_long: new RegExp("^.*" + id + ".*$", "i") };
						} else {
							query = { SIREN: id };
						}
					} else if (id.length == 14 && !isNaN(id))  {
						query = { SIREN: splitAt(9)(id)[0], NIC: splitAt(9)(id)[1] };
					} else {
						query = { nomen_long: new RegExp("^.*" + id + ".*$", "i") };
					}	
					company_find(res, query, id);
				},
		comp_add_or_up: function (req, res)
				{
					if (req.body) {
						let newobj = req.body;
						Model.findOneAndUpdate({ 'SIREN':newobj.SIREN, 'NIC':newobj.NIC }, newobj, { upsert:true }, function(err, doc) {
							if (err) return res.send(500, { error: err });
								console.log('[BOT] Found new company informations (Company:' + newobj.nomen_long + ')');
								res.sendStatus(200);
						});
					} else res.sendStatus(500);
				},
		comp_add_or_up_bot: function (data)
				{
					console.log(data);
					if (data) {
						Model.findOneAndUpdate({ 'SIREN':data.SIREN, 'NIC':data.NIC }, data, { upsert:true }, function(err, doc) {
							if (err) return;
							console.log('[BOT] Found new company informations');
						});
					}
				}

}

