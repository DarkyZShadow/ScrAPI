/*
**
**	Project : ScrAPI
**	File : This is the app's entry point
**
*/

let express = require('express');
let logger = require('./middleware/logger.js');
let config = require('../config/default.js');
let route_handler = require('./middleware/route_handler.js');
let bodyParser = require('body-parser');
let router = express.Router();
let app = express();

router.use(logger.log_route)
  .post('/company', route_handler.company.POST);

app.use(bodyParser.json());
app.use(router);
app.listen(config.port);

console.log("API Server just successfully started at port " + config.port);
