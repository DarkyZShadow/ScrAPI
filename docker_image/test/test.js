let Nightmare = require('nightmare');
let cheerio = require('cheerio');
 
let nightmare = Nightmare({ show: true });
const COMPANY = 'atos';
 
 
nightmare
    .goto('https://linkedin.com')
    .type('input[name="session_key"]', 'teamscrapi@gmail.com')
    .type('input[name="session_password"]', 'poiuytreza')
    .click('input[id="login-submit"]')
    .wait('#extended-nav-search')
    .goto('https://www.linkedin.com/search/results/companies/?keywords=' + COMPANY)
    .wait('.results-list')
    .wait('.search-result__result-link.ember-view')
    .click('.search-result__result-link.ember-view')
    .wait('.org-company-employees-snackbar__details-highlight.snackbar-description-see-all-link.ember-view')
    .click('.org-company-employees-snackbar__details-highlight.snackbar-description-see-all-link.ember-view')
    .inject('js', '../BOT/js/jquery-3.2.0.min.js')
    .wait('li.search-result:first-child span.name.actor-name')
    .scrollTo(500, 0)
    .wait('li.search-result:not(:first-child):not(:last-child)')
    .scrollTo(1000, 0)
    .wait('li.search-result:last-child span.name.actor-name')
    .screenshot('toto.png')
    .evaluate(() => {
        let result = $('li.search-result').toArray();
        for (var i in result)
            result[i] = result[i].innerHTML;
        return result;
    })
    .end()
    .then((res) => {
        for (var i in res)
        {
            $ = cheerio.load(res[i]);
           
            let member = {
                'fullname': $('span.name.actor-name').text().trim(),
                'post': $('p.subline-level-1').text().trim(),
                'from': $('p.subline-level-2').text().trim().replace('\n', ''),
                'linkedin': 'https://www.linkedin.com' + $('a.search-result__result-link').attr('href')
            };
            if (member.fullname)
                console.log(member);
        }
    })
    .catch((error) => {
        console.error('Search failed : ', error);
    });
