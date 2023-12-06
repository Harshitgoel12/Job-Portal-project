const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  aboutyourself: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  date1: {
    type: String,
    required: true,
  },
  Qualification: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
