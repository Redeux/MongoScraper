const Post = require('../models/Post');

exports.savePost = (_id, post, callback) => {
  console.log(`Looking for ${_id} in database ...`);
  Post.find({
    _id,
  }, (err, doc) => {
    if (doc.length > 0) {
      console.log(`${_id} already in database`);
      return callback('existing entry');
    }
    post._id = _id;
    console.log(`Adding ${JSON.stringify(post)} to database ...`);
    // Using our Post model, create a new entry
    const entry = new Post(post);
    // Now, save that entry to the db
    entry.save((error, document) => {
      // Log any errors
      if (error) return console.log(JSON.stringify(error));
      // return a success message
      return callback('success');
    });
  });
};

exports.getAllPosts = (callback) => {
  Post.find({}, (err, doc) => {
    if (err) return console.log(`Error getting all posts: ${err}`);
    return callback(doc);
  });
};

// exports.deletePost = (id, callback) => {

// };
