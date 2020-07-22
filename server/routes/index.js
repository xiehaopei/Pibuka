const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
  res.send({
    msg: 'hello',
  });
});

router.post('/user', (req, res) => {
  console.log(req.body);
  res.send({
    statu: 200,
    data: req.body,
  });
});

module.exports = router;
