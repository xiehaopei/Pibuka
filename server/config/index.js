module.exports = {
  db: {
    database: process.env.DATABASE || 'blog',
    username: 'root',
    password: 'admin',
    options: {
      host: 'localhost',
      dialect: 'mysql',
    },
  },
};
