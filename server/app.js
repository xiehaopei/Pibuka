const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = new express();
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/api', (req, res) => {
  res.send({
    msg: 'hello',
  });
});

app.post('/user', (req, res) => {
  console.log(req.body);
  res.send({
    statu: 200,
    data: req.body,
  });
});

app.listen('3000', () => {
  console.log('server running at port localhost:3000');
});
