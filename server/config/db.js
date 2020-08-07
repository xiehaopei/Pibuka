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

function query(sql, sqlArr, callback) {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, sqlArr, (err, result) => {
      callback(err, result);
      connection.release();
    });
  });
}

exports.query = query;
