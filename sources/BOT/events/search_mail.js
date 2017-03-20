let Promise = require('promise');
let url = require('tldjs');
let mailcheck = require('email-existence');

exports.event = (socket, data) => {
	let myurl = data.url;

    if (!myurl.startsWith('http'))
		myurl = 'http://' + myurl;
    let fullurl = url.getDomain(myurl);
    for (let i in data.members)
	{
		let name = data.members[i].fullname;
		let tmp = name.toLowerCase().replace(' ', '.');
		var adr = tmp + '@' + fullurl;
		
		mailcheck.check(adr, function(err,res) {
			console.log(adr);
			socket.emit(('receive_mail', {name: name, mail: adr}));
		});
    }
}
