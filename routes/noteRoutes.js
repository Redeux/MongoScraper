const noteController = require('../controllers/noteController');

module.exports = (app) => {
  app.route('/note/:id')
    .post((req, res) => {
      noteController.saveNote(req.params.id, req.body, (response) => {
        res.json(response);
      });
    })
    .delete((req, res) => {
      noteController.deleteNote(req.params.id, (response) => {
        res.json(response);
      });
    });
};
