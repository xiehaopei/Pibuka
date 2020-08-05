const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/login', (req, res) => {
  db.query('select * from admin', (err, rows) => {
    if (!err) {
      res.send({ data: rows });
    }
  });
});

module.exports = router;
