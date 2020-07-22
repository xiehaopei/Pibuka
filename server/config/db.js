let mysql = require('mysql');
// 配置数据库线程池连接
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'blog',
});

function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
}

exports.query = query;
