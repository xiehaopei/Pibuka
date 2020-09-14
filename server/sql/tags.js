const tagsSQL = {
  getTags: 'select * from tags',
  addTag: 'insert into tags(tag) values (?)',
  delTag: 'delete from tags where tagId=?',
  linkArticles: 'select articleId from tags_link where tagId=?',
  delTagLink: 'delete from tags_link where tagId=?',
};

module.exports = tagsSQL;
