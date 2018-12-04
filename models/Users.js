const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  userName: String,
  password: String
});

mongoose.model('users', userSchema);
