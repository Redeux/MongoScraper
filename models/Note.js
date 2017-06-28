// Require mongoose
const mongoose = require("mongoose");

// Create Schema class
const Schema = mongoose.Schema;

// Create note schema
const NoteSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Create the Note model with in the Note Schema
const Note = mongoose.model('Note', NoteSchema);

// Export model
module.exports = Note;
