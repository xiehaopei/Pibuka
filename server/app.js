const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = new express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', require('./routes'));
app.use('/admin', require('./routes/admin'));

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('server running at port 3000');
});
