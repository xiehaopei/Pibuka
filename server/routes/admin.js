const express = require('express');
const router = express.Router();
const db = require('../config/db');
const sql = require('../sql/admin');

router.get('/query', (req, res) => {
  db.query(sql.queryAll, (err, rows) => {
    if (err) throw err;
    res.status(200).send({ data: rows });
  });
});

router.get('/login', (req, res) => {
  const params = {
    username: req.query.username,
    password: req.query.password,
  };
  db.query(sql.query, [params.username, params.password], (err, rows) => {
    if (err) throw err;
    if (rows.length) {
      res.status(200).send({
        data: rows,
      });
    } else {
      res.status(400).send({
        msg: '用户名或密码错误!',
      });
    }
  });
});

router.post('/add', (req, res) => {
  db.query(sql.insert, [req.body.username, req.body.password], (err, rows) => {
    if (err) throw err;
    res.status(201).send({
      data: req.body,
      rows: rows,
    });
  });
});

router.delete('/remote/:id', (req, res) => {
  db.query(sql.delete, [req.params.id], (err, rows) => {
    if (err) throw err;
    res.status(200).send({
      data: req.params,
      rows: rows,
    });
  });
});

// router.post('/update', (req, rows) => {
//   const param = {
//     username: req.body.username,
//     password: req.body.password,
//     id: req.body.id,
//   };
//   db.query(sql.update, [param.username, param.password, param.id], (err, res) => {
//     if (err) throw err;
//     res.status(201).send({
//       data: req.params,
//       rows: rows,
//     });
//   });
// });

module.exports = router;
