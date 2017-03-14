let express = require('express');
let logger = require('./middleware/logger.js');
let config = require('../config/default.js');
let route_handler = require('./middleware/route_handler.js');

let router = express.Router();
let app = express();

router.use(logger.log_route)
  .get('/list', route_handler.list.GET);

app.use(router);
app.listen(config.port);

console.log("API Server just successfully started at port " + config.port);
