// Require mongoose
const mongoose = require('mongoose');

// Create Schema class
const Schema = mongoose.Schema;

// Create post schema
const PostSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
}, {
  _id: false,
});

// Create the Post model with in the Post Schema
const Post = mongoose.model('Post', PostSchema);

// Export model
module.exports = Post;