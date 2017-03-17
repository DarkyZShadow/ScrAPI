let Promise = require('promise');
let scrapper = require('./scrapper.js');

exports.event = (socket, data) => {
	let allPromises = Array();
	let SIRET = to_siret(data.SIREN, data.NIC);
	let societe = promise_societe(socket, SIRET);
	
	allPromises.push(societe);

	Promise.all(allPromises).then(() => socket.disconnect('end of datas'));
}

function to_siret(SIREN, NIC)
{
	let output = NIC;
	
  while (output.length < 5)
		output = '0' + output;
  return (SIREN + output);
}

function promise_societe(socket, SIRET)
{
	return new Promise(function (resolve, reject) {
			scrapper.scrap_societe(SIRET);
			resolve();
	});
}






























