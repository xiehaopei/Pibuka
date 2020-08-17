// jwt.js,token中间件
const expressJwt = require('express-jwt');
const { secretKey } = require('./constant');

const jwtAuth = expressJwt({ secret: process.env.JWT_SECRET || secretKey, algorithms: ['RS256'] }).unless({
  path: ['/admin/login'],
});

module.exports = jwtAuth;
