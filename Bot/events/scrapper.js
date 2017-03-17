let request = require('request');
let cheerio = require('cheerio');
let Promise = require('promise');
let iconv = require('iconv-lite');

const GOOGLE_URL = 'https://www.google.fr/search?q=';
const SOCIETE_URL = 'http://www.societe.com/cgi-bin/search?champs=';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0';

let possible_properties = [
	"Date de création entrepriss",
	"Adresse",
	"Code postal",
	"Ville",
	"Pays",
	"Capital social",
	"SIRET (siege)",
	"Téléphe"
];

module.exports = {
	possible_properties: possible_properties,
	scrap_google: function(name)
		{
			const options = {
					method: 'GET',
					url: GOOGLE_URL + encodeURIComponent(name),
					headers: {
						'User-Agent': USER_AGENT
					}
				};

				request(options, function(error, response, html) {
					if (error)
						reject(error);

					let result = {};
					let $ = cheerio.load(html, {ignoreWhitespace: true, xmlMode: true, lowerCaseTags: true});
					
					$('._RBg div').find('div._eFb').filter(function(){
						let name = $(this).find('._xdb a').text();
						if (!name)
							name = $(this).find('._xdb').text();
						let value = $(this).find('._Xbe').text();
															
						if (!value)
								value = $(this).find('._Map').text();
						result[name] = value;
					});
					console.log(options.url);
					console.log(result);
					return (result);
				});
		},
		scrap_societe: function(SIRET, callback)
			{
				const options = {
					method: 'GET',
					encoding: null,
					url: SOCIETE_URL + encodeURIComponent(SIRET),
					headers: {
						'User-Agent': USER_AGENT
				  }
				};

				request(options, function(error, response, html) {
					if (error)
						reject(error);

					let buf = iconv.decode(new Buffer(html), "ISO-8859-1");
					let result = {};
					let $ = cheerio.load(buf, {ignoreWhitespace: true, lowerCaseTags: true});

					$('table#etab').find('tr').filter(function(){
						let name = $(this).children().first().text().trim();
						let value = $(this).children().last().text().trim();
						if (possible_properties.indexOf(name) > -1)
							result[name] = value;
					});
					console.log(SIRET);
					console.log(result);
					callback (result);
				});
			}
}
