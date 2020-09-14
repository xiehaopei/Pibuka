const express = require('express');
const router = express.Router();
const controller = require('../controllers/tagsController');

router.get('/getTags', controller.getTags);
router.post('/addTag', controller.addTag);
router.delete('/delTag', controller.delTag);
router.get('/linkArticles', controller.linkArticles);
router.delete('/delTagLink', controller.delTagLink);

module.exports = router;
