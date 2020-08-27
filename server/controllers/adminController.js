const db = require('../config/db');
const sql = require('../sql/admin');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../token/constant');

const queryAll = (req, res) => {
  db.query(sql.queryAll, (err, result) => {
    if (err) throw err;
    res.status(200).send({ data: result });
  });
};

const login = (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password,
  };
  db.query(sql.query, [params.username, params.password], (err, result) => {
    if (err) {
      res.send({
        meta: { msg: '服务器请求失败！', status: 404 },
      });
    }
    if (result.length) {
      const token = jwt.sign(params, secretKey, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      res.json({
        data: {
          id: result[0].id,
          username: result[0].username,
          password: result[0].password,
          email: result[0].email,
          avatar: result[0].avatar,
          token: token,
        },
        meta: { msg: '登录成功！', status: 200 },
      });
    } else {
      res.send({
        meta: { msg: '用户名或密码错误！', status: 400 },
      });
    }
  });
};

const queryById = (req, res) => {
  db.query(sql.queryById, [req.query.id], (err, result) => {
    if (err) throw err;
    res.status(200).json({
      data: {
        id: result[0].id,
        username: result[0].username,
        password: result[0].password,
        email: result[0].email,
        img: result[0].img,
      },
      meta: { msg: '查询成功！', status: 200 },
    });
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



module.exports = { queryAll, queryById, login, append, remote, update };
