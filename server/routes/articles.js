const express = require('express');
const router = express.Router();
const controller = require('../controllers/articlesController');

router.get('/queryAll', controller.queryAll);
router.get('/getList', controller.getList);
router.get('/getTotal', controller.getTotal);
router.get('/getTags', controller.getTags);
router.post('/add', controller.add);
router.put('/linkTags', controller.linkTags);
router.post('/getTagsById', controller.getTagsById);
router.post('/getArticlesById', controller.getArticlesById);
router.delete('/delArticle', controller.delArticle);
router.delete('/delArticleLink', controller.delArticleLink);

module.exports = router;
