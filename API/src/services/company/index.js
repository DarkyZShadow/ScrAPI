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
	NIC: Number,
	nomen_long: String,
	employees: Array
});
schema.set('collection', 'raw_datas');
var Model = mongoose.model('datas', schema);

let every_properties = {
	SIREN: "SIREN",
	SIRET: "SIRET",
	NIC: "NIC",
	Nom: "nomen_long",
	Adresse: "address",
	Employes: "members",
	Type: "libnj",
	Description: "libape",
	Taille: "libtef",
	Categorie: "categorie",
	Creation: "dcr"
};

var newobj = {
	SIREN:31351153,
	NIC:02145,
	nomen_long:"Atos",
	employees: [
		{
			post:"PDG",
			fullname:"Maria DB",
			phone:"0606060606",
			address:"99 rue de l'SQL, 78500 Paris",
			linkedin:"http://linkedin.com/",
			mail:"test@test.sql"
		},
		{
			post:"DRH",
			fullname:"Steve theval",
			phone:"0606060606",
			address:"50 rue de l'Arbre, 78500 Paris",
			linkedin:"http://linkedin.com/",
			mail:"test@test.fr"
		}
	]
};

module.exports = {
    comp_get: function (req, res)
				{
					if (!req.body || !req.body.name) {
						res.sendStatus(500);
						return;
					}
					Model.find({ nomen_long: new RegExp("^.*" + req.body.name + ".*$", "i") }, function(err,models) {
         		if (err) {
            	res.render('error', {
                status: 500
            	});
        		} else {
							if (!models[0]) {
								res.sendStatus(500);
								return;
							}
							let object = JSON.parse(JSON.stringify(models[0]));
							var send = {
								data: {
									employees: [
										{
											fullname: "Jean Rinro",
											post: "PDG",
											phone: "0606060606",
											address: "547 rue de l'Arbre, 75001 Paris",
											linkedin: "http://linkedin.com/"
										},
										{
											fullname: "Marie Dupont",
											post: "DRH",
											phone: "0606060606",
											address: "59 rue de l'Arbre, 75001 Paris"
										}
									]
								},
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
				},
		comp_add_or_up: function (req, res)
				{
					if (req.body) {
					r	
					}
					res.sendStatus(500);
				}
}

