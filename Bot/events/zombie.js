let Promise = require('promise');
let scrapper = require('./scrapper.js');

exports.event = (socket, data) => {
	let allPromises = Array();

	for (let i = 0; i < data.length; i++) {
		if (data[i] && data[i].SIRET && data[i].SIREN && data[i].NIC) {
			scrapper.scrap_societe(data[i].SIRET, function(result) {
				result.SIREN = parseInt(data[i].SIREN);
				result.NIC = parseInt(data[i].NIC);
				result.nomen_long = result.Nom;
				delete result.Nom;
				socket.emit('insert', result);
			});
		}
	}
}
