const Post = require('../models/Post');

exports.savePost = (_id, post, callback) => {
  console.log(`Looking for ${_id} in database ...`);
  Post.find({
    _id,
  }, (err, doc) => {
    if (err) return console.log(JSON.stringify(err));
    if (doc.length > 0) {
      console.log(`${_id} already in database`);
      return callback('existing entry');
    }
    post._id = _id;
    console.log(`Adding ${JSON.stringify(post)} to database ...`);
    // Using our Post model, create a new entry
    const Entry = new Post(post);
    // Now, save that entry to the db
    Entry.save((err) => {
      // Log any errors
      if (err) return console.log(JSON.stringify(err));
      // return a success message
      return callback('success');
    });
  });
};

exports.getAllPosts = (callback) => {
  Post.find({})
    // populate all of the notes associated with it
    .populate('note')
    .exec((err, doc) => {
      if (err) return console.log(`Error getting all posts: ${err}`);
      return callback(doc);
    });
};

exports.deletePost = (_id, callback) => {
  Post.findByIdAndRemove(_id, (err) => {
    if (err) return console.log(`Error deleting post ${_id}: ${err}`);
    return callback('success');
  });
};