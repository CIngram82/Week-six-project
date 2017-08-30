const mongoose = require('mongoose');
//////// SCHEMA ////////

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true }, //TODO Hash the password
  passHint: { type: String },
  eMail: { type: String, required: true}

});

const RegUser = mongoose.model('Users', userSchema);

/////// END OF SCHEMA /////////

module.exports = RegUser;

// Name
// Password
// password hint
// Email
