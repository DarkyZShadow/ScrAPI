/*
**
**  Project : ScrAPI
**  File : This is the router
**
*/

const PATH = "../services/";
const FILE = "/index.js";

exports.company = require(PATH + "company" + FILE);
exports.bot = require(PATH + "bot" + FILE);
