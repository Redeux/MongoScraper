const scrapeController = require('./../controllers/scrapeController');

module.exports = (app) => {
  app.route('/posts')
    .get((req, res) => {
      // scrapeController.getNewPost();
      res.json('hello world');
    });
};
