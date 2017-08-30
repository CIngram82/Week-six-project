const mongoose = require('mongoose');

//////// SCHEMA ////////

const snippySchema = new mongoose.Schema({
  title: { type: String, required: true, unique:true },
  body: { type: String, required: true }, // dose this need to be a string literal?
  notes: { type: String },
  language: { type: String, required: true },
  tags: { type:String, required: true }, // have this as an array of strings? make it easer to search for hard mode?
  createdBy: { type:String, required:true}
});

const Snipps = mongoose.model('Snipps', snippySchema);

/////// END OF SCHEMA /////////

module.exports = Snipps;


// At a minimum, snippets should have:
// a title
// a body (the code)
// optional notes
// a language
// tags -- that is, user-defined words or phrases that classify the code,
//  like "authentication", "front-end", "middleware", or "database".
