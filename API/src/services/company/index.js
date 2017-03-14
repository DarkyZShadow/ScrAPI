/*
**
**	Project : ScrAPI
**	File : This is the list route index
**
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let logger = require('../../middleware/logger.js');
let	db = require('../../../config/db.js');
//db.mongoose = mongoose

var schema = new db.mongoose.Schema({
	name: String
});
schema.set('collection', 'test');
var Model = mongoose.model('Test', schema);

module.exports = {
    GET: function (req, res)
				{
					Model.find({},function(err,models) {
        		console.log(models);
         		if (err) {
            	res.render('error', {
                status: 500
            	});
        		} else {
            	res.jsonp(models);
        		}
    			});

					/*Model.findOne({ 'name': 'test' }, 'name', function (err, person) {
  					if (err) return handleError(err);
  					console.log(person);
					})
					res.send("Hello World");*/
				}
}

