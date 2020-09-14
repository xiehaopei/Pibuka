const db = require('../config/db');
const sql = require('../sql/articles');

const queryAll = (req, res) => {
  db.query(sql.queryAll, (err, result) => {
    if (err) throw err;
    res.json({
      meta: {
        msg: '查询成功！',
        status: 200,
      },
      data: result,
    });
  });
};

const getList = (req, res) => {
  const params = {
    pageNum: parseInt(req.query.pageNum),
    pageSize: parseInt(req.query.pageSize),
  };
  db.query(sql.getList, [(params.pageNum - 1) * params.pageSize, params.pageSize], (err, result) => {
    if (err) throw err;
    res.json({
      meta: {
        msg: '查询成功！',
        status: 200,
      },
      data: result,
    });
  });
};

const getTotal = (req, res) => {
  db.query(sql.getTotal, (err, result) => {
    if (err) throw err;
    res.json({
      meta: {
        msg: '查询成功！',
        status: 200,
      },
      data: result[0],
    });
  });
};

const getTagsById = (req, res) => {
  db.query(sql.getTagsById, [req.body.articleId], (err, result) => {
    if (err) throw err;
    // const tagId = result.map(item => item.tagId);
    res.json({
      meta: {
        msg: '查询成功！',
        status: 200,
      },
      data: result,
    });
  });
};

const getTags = (req, res) => {
  db.query(sql.getTags, (err, result) => {
    if (err) throw err;
    // const map = new Map();
    // Object.values(result).forEach(item => {
    //   if (map.has(item.articleId)) {
    //     map.set(item.articleId, [...map.get(item.articleId), item.tagId]);
    //   } else {
    //     map.set(item.articleId, [item.tagId]);
    //   }
    // });
    const tags = {};
    Object.values(result).forEach(item => {
      if (tags[item.articleId]) {
        tags[item.articleId] = [...tags[item.articleId], item.tagId];
      } else {
        tags[item.articleId] = [item.tagId];
      }
    });
    res.json({
      meta: {
        msg: '查询成功！',
        status: 200,
      },
      data: tags,
    });
  });
};

const add = (req, res) => {
  const params = {
    title: req.body.title,
    digest: req.body.digest,
    md: req.body.md,
    time: req.body.time,
    cover: req.body.cover,
    visits: req.body.visits,
    likes: req.body.likes,
    comments: req.body.comments,
  };
  db.query(
    sql.add,
    [params.title, params.digest, params.md, params.time, params.cover, params.visits, params.likes, params.comments],
    (err, result) => {
      if (err) throw err;
      res.json({
        meta: {
          msg: '插入成功！',
          status: 200,
        },
        data: { ...req.body, articleId: result.insertId },
      });
    }
  );
};

const linkTags = (req, res) => {
  const params = req.body.params;
  db.query(sql.linkTags, [params], (err, result) => {
    if (err) throw err;
    res.json({
      meta: {
        msg: '插入成功！',
        status: 200,
      },
      data: result,
    });
  });
};

const getArticlesById = (req, res) => {
  db.query(sql.getArticlesById, [req.body.articleId], (err, result) => {
    if (err) throw err;
    res.json({
      meta: {
        msg: '查询成功！',
        status: 200,
      },
      data: result,
    });
  });
};

const delArticle = (req, res) => {
  db.query(sql.delArticle, [req.body.articleId], (err, result) => {
    if (err) throw err;
    res.json({
      meta: {
        msg: '删除成功！',
        status: 200,
      },
      data: result,
    });
  });
};

const delArticleLink = (req, res) => {
  db.query(sql.delArticleLink, [req.body.articleId], (err, result) => {
    if (err) throw err;
    res.json({
      meta: {
        msg: '删除成功！',
        status: 200,
      },
      data: result,
    });
  });
};

module.exports = {
  queryAll,
  add,
  getList,
  getTotal,
  getTagsById,
  getTags,
  linkTags,
  getArticlesById,
  delArticle,
  delArticleLink,
};
