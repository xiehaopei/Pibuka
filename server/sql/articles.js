const articlesSQL = {
  queryAll: 'select * from articles',
  getList: 'select * from articles order by articleId limit ?,?',
  getTotal: 'select count(*) as total from articles',
  getTags: 'select * from tags_link order by articleId',
  add: 'insert into articles(title,digest,md,time,cover,visits,likes,comments) values(?,?,?,?,?,?,?,?)',
  getTagsById: 'select articleId,tagId from tags_link where articleId in (?)',
  getArticlesById: 'select articleId,title from articles where articleId in (?)',
  linkTags: 'insert into tags_link(articleId,tagId) values?',
  delArticle: 'delete from articles where articleId=?',
  delArticleLink: 'delete from tags_link where articleId=?',
};

module.exports = articlesSQL;
