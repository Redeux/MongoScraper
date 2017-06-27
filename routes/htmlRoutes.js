const postController = require('./../controllers/postController');

module.exports = (app) => {
  app.get('/saved.html', (req, res) => {
    postController.getAllPosts((documents) => {
      res.render('saved');
    });
  });
};
