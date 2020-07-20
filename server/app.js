const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./models');

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, () => {
      console.log('server running at port 3000');
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
