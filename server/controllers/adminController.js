const db = require('../config/db');
const sql = require('../sql/admin');

const queryAll = (req, res) => {
  db.query(sql.queryAll, (err, result) => {
    if (err) throw err;
    res.status(200).send({ data: result });
  });
};

const login = (req, res) => {
  const params = {
    username: req.query.username,
    password: req.query.password,
  };
  db.query(sql.query, [params.username, params.password], (err, result) => {
    if (err) throw err;
    if (result.length) {
      res.status(200).send({
        data: result,
      });
    } else {
      res.status(400).send({
        msg: '用户名或密码错误!',
      });
    }
  });
};

const append = (req, res) => {
  db.query(sql.insert, [req.body.username, req.body.password], (err, result) => {
    if (err) throw err;
    res.status(201).send({
      data: req.body,
      result: result,
    });
  });
};

const remote = (req, res) => {
  db.query(sql.delete, [req.params.id], (err, result) => {
    if (err) throw err;
    res.status(200).send({
      data: req.params,
      result: result,
    });
  });
};

const update = (req, res) => {
  const param = {
    username: req.body.username,
    password: req.body.password,
    id: req.body.id,
  };
  db.query(sql.update, [param.username, param.password, param.id], (err, result) => {
    if (err) throw err;
    res.status(201).send({
      msg: '数据修改成功！',
      data: req.body,
      result: result,
    });
  });
};

module.exports = { queryAll, login, append, remote, update };
