const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');

router.get('/getMenu', controller.getMenu);

module.exports = router;
