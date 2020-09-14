const db = require('../config/db');
const sql = require('../sql/tags');

const getTags = (req, res) => {
  db.query(sql.getTags, (err, result) => {
    if (err) throw err;
    res.json({
      meta: { status: 200, msg: '查询成功！' },
      data: result,
    });
  });
};

const addTag = (req, res) => {
  db.query(sql.addTag, [req.body.tag], err => {
    if (err) throw err;
    res.json({
      meta: { status: 200, msg: '添加成功！' },
      data: req.body,
    });
  });
};

const delTag = (req, res) => {
  db.query(sql.delTag, [req.body.tagId], (err, result) => {
    if (err) throw err;
    res.json({
      meta: { status: 200, msg: '删除成功！' },
      data: result,
    });
  });
};

const linkArticles = (req, res) => {
  db.query(sql.linkArticles, [req.query.tagId], (err, result) => {
    if (err) throw err;
    res.json({
      meta: { status: 200, msg: '查询成功！' },
      data: result,
    });
  });
};

const delTagLink = (req, res) => {
  db.query(sql.delTagLink, [req.body.tagId], (err, result) => {
    if (err) throw err;
    res.json({
      meta: { status: 200, msg: '删除成功！' },
      data: result,
    });
  });
};

module.exports = { getTags, addTag, delTag, linkArticles, delTagLink };
