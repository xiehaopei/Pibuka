const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const token = require('../token/index');

router.use(token);

router.get('/query', controller.queryAll);
router.post('/login', controller.login);
router.get('/query/:id', controller.queryById);
router.post('/add', controller.append);
router.delete('/remote/:id', controller.remote);
router.put('/update', controller.update);
router.put('/updatePassword', controller.updatePassword);

module.exports = router;
