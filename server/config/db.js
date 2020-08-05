const mysql = require('mysql2');
// 配置数据库线程池连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'blog',
  connectionLimit: 10,
  supportBigNumbers: true,
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
