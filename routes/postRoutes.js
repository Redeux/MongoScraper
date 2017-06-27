const postController = require('./../controllers/postController');

module.exports = (app) => {
  app.route('/post/:id')
    .post((req, res) => {
      postController.savePost(req.params.id, req.body, (response) => {
        res.json(response);
      });
    });
  // .delete((req, res) => {
  //   postController.deletePost(req.params.id, (response) => {
  //     res.json(response);
  //   });
  // });
};