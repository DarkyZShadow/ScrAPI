let Promise = require('promise');
let scrapper = require('./scrapper.js');

exports.event = (socket, data) => {
	let allPromises = Array();
	let societe = promise_societe(socket, data.SIRET);
	console.log(data.SIRET);
	allPromises.push(societe);

	//Promise.all(allPromises).then(() => socket.disconnect('end of datas'));
}

function promise_societe(socket, SIRET)
{
	return new Promise(function (resolve, reject) {
			scrapper.scrap_societe(SIRET);
			resolve();
	});
}
