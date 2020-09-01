const adminSQL = {
  insert: 'insert into admin(username,password) values(?,?)',
  queryAll: 'select * from admin',
  update: 'update admin set username=?, email=?, description=? where id=?',
  delete: 'delete from admin where id=?',
  queryById: 'select * from admin where id=?',
  query: 'select * from admin where username=? and password=?',
  updatePassword: 'update admin set password=? where id=?',
};

module.exports = adminSQL;
