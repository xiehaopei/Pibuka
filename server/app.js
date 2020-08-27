const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = new express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', require('./routes'));
app.use('/admin', require('./routes/admin'));
app.use('/menu', require('./routes/menu'));

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
