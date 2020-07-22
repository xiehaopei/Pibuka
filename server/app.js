const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');

const app = new express();
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/', router);

app.listen(3000, () => {
  console.log('server running at port 3000');
});
