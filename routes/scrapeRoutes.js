const scrapeController = require('./../controllers/scrapeController');

module.exports = (app) => {
  app.route('/scrape')
    .get((req, res) => {
      scrapeController.scrapePosts((response) => {
        if (!response === 'Scrape Complete') return res.json('error');
        return res.json(response);
      });
    });
};
