const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.get('/query', controller.queryAll);

router.get('/login', controller.login);

router.post('/add', controller.append);

router.delete('/remote/:id', controller.remote);

router.put('/update', controller.update);

module.exports = router;
