let request = require('request');
let cheerio = require('cheerio');
let Promise = require('promise');

const GOOGLE_URL = 'https://www.google.fr/search?q=';
const SOCIETE_URL = 'http://www.societe.com/cgi-bin/search?champs=';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0';

exports.event = (socket, datas) => {
	let allPromises = Array();
	let SIREN = int_to_siren(datas.data.SIREN);
	let name = datas.data.Nom;
	/* let missings = datas.missing; */

	let google = promise_google(socket, SIREN, name);
	let societe = promise_societe(socket, SIREN, name);
	
	allPromises.push(google);
	allPromises.push(societe);
	
	Promise.all(allPromises).then(() => socket.disconnect('end of datas'));
}


function int_to_siren(SIREN)
{
	let output = SIREN + '';
	
    while (output.length < 9)
        output = '0' + output;
    return output;
}

function promise_google(socket, SIREN, name)
{
	const options = {
		method: 'GET',
		url: GOOGLE_URL + encodeURIComponent(name),
		headers: {
			'User-Agent': USER_AGENT
		}
	};

	return new Promise(function (resolve, reject) {
		request(options, function(error, response, html) {
			if (error)
				reject(error);
			
			var result = {};
			var $ = cheerio.load(html, {ignoreWhitespace: true, xmlMode: true, lowerCaseTags: true});

			$('._RBg div').find('div._eFb').filter(function(){
				var name = $(this).find('._xdb a').text();
				var value = $(this).find('._Xbe').text();
				
				if (!value)
					value = $(this).find('._Map').text();
				result[name] = value;
			});
			
			console.log(result);
			socket.emit('google_search', result);
			resolve();
		});
	});
}

function promise_societe(socket, SIREN, name)
{
	const options = {
		method: 'GET',
		url: SOCIETE_URL + encodeURIComponent(SIREN),
		headers: {
			'User-Agent': USER_AGENT
		}
	};
	
	return new Promise(function (resolve, reject) {
		request(options, function(error, response, html) {
			if (error)
				reject(error);
			
			var result = {};
			var $ = cheerio.load(html, {ignoreWhitespace: true, xmlMode: true, lowerCaseTags: true, decodeEntities: false});

			$('table#rensjur').find('tr').filter(function(){
				var name = $(this).children().first().text().trim();
				var value = $(this).children().last().text().trim();
				
				result[name] = value;
			});
			
			socket.emit('societe_search', result);
			resolve();
		});
	});
}






























