let request = require('request');
let cheerio = require('cheerio');
let Promise = require('promise');
let iconv = require('iconv-lite');
let scrapper = require('./scrapper.js');
let kw = require('./keywords.js');

const SOCIETE_URL = 'http://www.societe.com/cgi-bin/search?champs=';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0';

exports.event = (socket, datas) => {
    let allPromises = Array();
    let SIREN = to_siren(datas.data.SIREN);
    let name = datas.data.Nom;
    let SIRET = datas.data.SIRET;
    if (!SIRET)
	SIRET = to_siret(datas.data.SIREN, datas.data.NIC);
    /* let missings = datas.missing; */
    
    let google = promise_google(socket, name);
    let societe = promise_societe(socket, SIREN, name);
    let societe2 = promise_societe2(socket, SIRET);
    let linkedin = promise_linkedin(socket, name);
		console.log('linkedin'); 
    allPromises.push(google);
    allPromises.push(societe);
    allPromises.push(societe2);
    allPromises.push(linkedin);
    
    Promise.all(allPromises).then(() => { 
	socket.disconnect('end of datas');
    });
}

function to_siren(SIREN)
{
  let output = String(SIREN);

	while (output.length < 9)
		output = '0' + output;
	return output;
}

function to_siret(SIREN, NIC)
{
	let output = String(NIC);

	while (output.length < 5)
		output = '0' + output;
	return (to_siren(SIREN) + output);
}

function promise_google(socket, name)
{
	return new Promise(function (resolve, reject) {
		if (!name)
			resolve();
		else {
			scrapper.scrap_google(name).then(result => {
				console.log(result);
				socket.emit('google_search', result);
				resolve();
			});
		}
	});
}

function promise_societe(socket, SIREN, name)
{
	const options = {
		method: 'GET',
		encoding: null,
		url: SOCIETE_URL + encodeURIComponent(SIREN),
		headers: {
			'User-Agent': USER_AGENT
		}
	};
	
	return new Promise(function (resolve, reject) {
		request(options, function(error, response, html) {
			if (error)
				reject(error);

			let buf = iconv.decode(new Buffer(html), "ISO-8859-1");
			var result = {};
			var $ = cheerio.load(buf, {ignoreWhitespace: true, lowerCaseTags: true});

			$('table#rensjur').find('tr').filter(function(){
				var name = $(this).children().first().text().trim();
				var value = $(this).children().last().text().trim();
				
				name = kw.validProperty(kw.accent_fold(name));
				if (name)
					result[name] = value;
			});
			
			socket.emit('societe_search', result);
			resolve();
		});
	});
}

function promise_societe2(socket, SIRET)
{
	return new Promise(function (resolve, reject) {
		scrapper.scrap_societe(SIRET, function (result) {
			socket.emit('societe_search', result);
		});
		resolve();
	});
}

function promise_email(members)
{
    return new Promise(function (resolve, reject) {
	console.log("MEMBERS : " + members);
	resolve("test affichage membres");
    });
//    var usermail = $('span.name.actor-name').text().split(' ');
//    var usermaildot = (usermail[0]) + '.' + (usermail[1]) + '@orange.fr';
//    console.log("MAIL :" + usermaildot);
//    mail.check(usermaildot, function (err, res) {
//	console.log(res);
//    });
}

function promise_linkedin(socket, name)
{
    return new Promise(function (resolve, reject) {
	scrapper.scrap_linkedin(name).then(result => {
	    promise_email(result).then(result => {
		console.log("Result " + result);
		socket.emit('linkedin_search', result);
	    });
	});
    });
}
