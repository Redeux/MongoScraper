const scrapeController = require('./../controllers/scrapeController');

module.exports = (app) => {
  app.route('/posts')
    .get((req, res) => {
      scrapeController.getPosts((response) => {
        if (!response === 'Scrape Complete') return res.json('error');
        return res.json(response);
      });
    });
};
