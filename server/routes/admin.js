const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const token = require('../token/index');

router.use(token);
router.use((req, res, next) => {
  console.log('this is a api request!');
  next();
});

router.get('/query', controller.queryAll);
router.post('/login', controller.login);
router.get('/query/:id', controller.queryById);
router.post('/add', controller.append);
router.delete('/remote/:id', controller.remote);
router.put('/update', controller.update);

module.exports = router;
