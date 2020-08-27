const db = require('../config/db');
const sql = require('../sql/menu');

const getMenu = (req, res) => {
  db.query(sql.getMenu, (err, result) => {
    res.json({
      data: result,
      meta: { msg: '查询成功！', status: 200 },
    });
  });
};

module.exports = { getMenu };
