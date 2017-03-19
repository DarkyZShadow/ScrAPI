'use strict';

const express = require('express');

// Constants
const PORT = 3031;

// App
const app = express();
app.get('/', function (req, res) {
  res.send('On va gagner ce Code Camp EASY!\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

