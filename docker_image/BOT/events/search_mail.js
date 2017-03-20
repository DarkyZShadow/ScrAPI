let Promise = require('promise');
let url = require('url');
let mailcheck = require('email-existence');

exports.event = (socket, data) => {
    let myurl = url.parse(data.url).hostname;
    console.log(myurl);
    for (let i in data.members) {
	let name = data.members[i].fullname;
	let tmp = name.toLowerCase().replace(' ', '.');
	console.log(tmp);
	var adr = tmp + '@' + myurl;
	console.log(adr)
	mailcheck.check(adr, function(err,res){
	    console.log('res: '+res);
	});
    }
}
