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
	SIREN: Number,
	NIC: Number,
	nomen_long: String,
	employees: Array
});
schema.set('collection', 'raw_datas');

let Model = mongoose.model('datas', schema);

let every_properties = {
	SIREN: "SIREN",
	NIC: "NIC",
	Nom: "nomen_long",
	Adresse: "address",
	employees: "employees",
	Type: "libnj",
	Description: "libape",
	Taille: "libtef",
	Categorie: "categorie",
	Creation: "dcr",
	"Capital social": "capital",
	"SIRET (siege)": "siret"
};

/*var newobj = {
	SIREN:				31351153,
	NIC:					02145,
	nomen_long:		"Atos",
	employees:	[
		{
			post:			"PDG",
			fullname:	"Maria DB",
			phone:		"0606060606",
			address:	"99 rue de l'SQL, 78500 Paris",
			linkedin:	"http://linkedin.com/",
			mail:			"test@test.sql"
		},
		{
			fullname:	"Steve theval",
			phone:		"0606060606",
			address:	"50 rue de l'Arbre, 78500 Paris",
			linkedin:	"http://linkedin.com/",
			mail:			"test@test.fr"
		},
		{
			fullname:	"Sean Soulie",
			phone:		"0606060606",
			address:	"50 rue de l'Arbre, 78500 Paris",
			linkedin:	"http://linkedin.com/",
			mail:			"test@test.fr"
		}
	]
};*/

const splitAt = index => it => 
						  [it.slice(0, index), it.slice(index)];

function company_find(res, query) {
	Model.find(query).exec(function(err,models) {
    if (err) {
     	res.render('error', {
			status: 500
    });
    } else {
			if (!models[0]) {
				res.sendStatus(404);
				return;
			}
			let object = JSON.parse(JSON.stringify(models[0]));
			var send = {
				data: {},
				missing: []
			};
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
					company_find(res, query);
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
				}
}

