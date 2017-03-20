let request = require('request');
let cheerio = require('cheerio');
let Promise = require('promise');
let iconv = require('iconv-lite');
let kw = require('./keywords.js');
let Nightmare = require('nightmare');
let mail = require('email-existence');

const GOOGLE_URL = 'https://www.google.fr/search?q=';
const SOCIETE_URL = 'http://www.societe.com/cgi-bin/search?champs=';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0';

module.exports = {
    scrap_google: function (name) {
	const options = {
	    method: 'GET',
	    url: GOOGLE_URL + encodeURIComponent(name),
	    headers: {
		'User-Agent': USER_AGENT
	    }
	};
	return new Promise(function (resolve, reject) {
	    request(options, function (error, response, html) {
		if (error)
		    reject(error);
		
		let result = {
		    "Nom": kw.capitalize(name)
		};
		let $ = cheerio.load(html, {
		    ignoreWhitespace: true,
		    xmlMode: true,
		    lowerCaseTags: true
		});
		
		$('._RBg div').find('div._eFb').filter(function () {
		    let name = $(this).find('._xdb a').text();
		    if (!name)
			name = $(this).find('._xdb').text();
		    let value = $(this).find('._Xbe').text();
		    
		    if (!value)
			value = $(this).find('._Map').text();
		    name = kw.validProperty(kw.accent_fold(name));
		    value = kw.accent_fold(value);
		    
		    if (name)
			result[name] = value;
		});
		let url = $('#rso').children().first().children().first().children().first()
		    .children().first().children().last().children().first()
		    .children().first().children().first().text();
		
		if (!url)
		    url = $('#rso').children().first().children().first().children().first()
		    .children().last().children().first()
		    .children().first().children().first().text();
		result.Url = url;
		resolve(result);
	    });
	});
    },
    scrap_societe: function (SIRET, callback) {
	const options = {
	    method: 'GET',
	    encoding: null,
	    url: SOCIETE_URL + encodeURIComponent(SIRET),
	    headers: {
		'User-Agent': USER_AGENT
	    }
	};
	
	request(options, function (error, response, html) {
	    if (error)
		reject(error);
	    
	    let buf = iconv.decode(new Buffer(html), "ISO-8859-1");
	    let result = {};
	    if (SIRET && parseInt(SIRET) > 100) {
		let SIREN = SIRET.substr(0, 9);
		result.SIREN = SIREN;
	    }
	    let $ = cheerio.load(buf, {
		ignoreWhitespace: true,
		lowerCaseTags: true
	    });
	    
	    $('table#etab').find('tr').filter(function () {
		let name = $(this).children().first().text().trim();
		let value = $(this).children().last().text().trim();
		
		name = kw.validProperty(name);
		if (name)
		    result[name] = value;
	    });
	    callback(result);
	});
    },
    scrap_linkedin: function (name) {
	return new Promise(function (resolve, reject) {
	    let result = new Array();
	    let nightmare = Nightmare({
		show: true
	    });
	    nightmare
		.goto('https://linkedin.com')
		.type('input[name="session_key"]', 'teamscrapi@gmail.com')
		.type('input[name="session_password"]', 'poiuytreza')
		.click('input[id="login-submit"]')
		.wait('#extended-nav-search')
		.goto('https://www.linkedin.com/search/results/companies/?keywords=' + name)
		.wait('.results-list')
		.wait('.search-result__result-link.ember-view')
		.click('.search-result__result-link.ember-view')
		.wait('.org-company-employees-snackbar__details-highlight.snackbar-description-see-all-link.ember-view')
		.click('.org-company-employees-snackbar__details-highlight.snackbar-description-see-all-link.ember-view')
		.inject('js', './js/jquery-3.2.0.min.js')
		.wait('li.search-result:first-child p.subline-level-1')
		.scrollTo(500, 0)
		.wait('li.search-result:not(:first-child):not(:last-child)')
		.scrollTo(1200, 0)
		.wait('li.search-result:last-child p.subline-level-1')
		.screenshot('toto.png')
		.evaluate(() => {
		    let result = $('li.search-result').toArray();
		    for (var i in result)
			result[i] = result[i].innerHTML;
		    return result;
		})
		.end()
		.then((res) => {
		    for (var i in res) {
			$ = cheerio.load(res[i]);
			let member = {
			    'fullname': $('span.name.actor-name').text().trim(),
			    'post': $('p.subline-level-1').text().trim(),
			    'from': $('p.subline-level-2').text().trim().replace('\n', ''),
			    'linkedin': 'https://www.linkedin.com' + $('a.search-result__result-link').attr('href')
			};
			if (member.fullname)
			    result.push(member);
		    }
		    resolve(result);
		})
		.catch((error) => {
		    console.error('Search failed : ', error);
		    reject(error);
		})
		    });
	/*nightmare
	  .goto('https://linkedin.com')
	  .type('input[name="session_key"]', 'teamscrapi@gmail.com')
	  .type('input[name="session_password"]', 'poiuytreza')
	  .click('input[id="login-submit"]')
	  .wait('#extended-nav-search')
	  .goto('https://www.linkedin.com/search/results/companies/?keywords=' + name)
	  .wait('.results-list')
	  .wait('.search-result__result-link.ember-view')
	  .click('.search-result__result-link.ember-view')
	  .wait('.org-company-employees-snackbar__details-highlight.snackbar-description-see-all-link.ember-view')
	  .click('.org-company-employees-snackbar__details-highlight.snackbar-description-see-all-link.ember-view')
	  .inject('js', '../js/jquery-3.2.0.min.js')
	  .wait('li.search-result:first-child span.name.actor-name')
	  .scrollTo(500, 0)
	  .wait('li.search-result:not(:first-child):not(:last-child)')
	  .scrollTo(1000, 0)
	  .wait('li.search-result:last-child span.name.actor-name')
	  .evaluate(() => {
				console.log('qwertyuiopoiuhygfhjklkjhgfcd');
				let result = $('li.search-result').toArray();
				for (var i in result)
				result[i] = result[i].innerHTML;
				return result;
				})
				.end()
				.then((res) => {
				let employees = [];
			for (var i in res)
			{
			$ = cheerio.load(res[i]);
			
			let employee = {
				'fullname': $('span.name.actor-name').text().trim(),
				'post': $('p.subline-level-1').text().trim(),
				'from': $('p.subline-level-2').text().trim().replace('\n', ''),
				'linkedin': 'https://www.linkedin.com' + $('a.search-result__result-link').attr('href')
				}
				if (employee.fullname) {
				console.log(employee);
				employees.push(employee);
				}
				}
				resolve(employees);
				})
		    .catch((error) => {
		    reject(error);
		    });*/
    }
}
