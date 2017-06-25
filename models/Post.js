// Require mongoose
const mongoose = require('mongoose');

// Create Schema class
const Schema = mongoose.Schema;

// Create post schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  // author: {
  //   type: String,
  //   required: true,
  // },
  // posted: {
  //   type: Date,
  // },
  created: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
});

// Create the Post model with in the Post Schema
const Post = mongoose.model('Post', PostSchema);

// Export model
module.exports = Post;
