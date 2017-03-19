/*
**
**	Project : ScrAPI
**	File : This is the database config file
**
*/

let mongoose = exports.mongoose = require('mongoose');

var opts = { db: { native_parser: true }}
const DB_C = exports.mongoose.connection = mongoose.createConnection('mongodb://localhost:27017/scrapi', opts);
