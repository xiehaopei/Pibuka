const tagsSQL = {
  getTags: 'select * from tags',
  addTag: 'insert into tags(tag) values (?)',
  delTag: 'delete from tags where tag=?',
};

module.exports = tagsSQL;
