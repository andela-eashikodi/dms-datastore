'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//user schema for database
var userSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },

  name: {
    first: String,

    last: String
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});


//hash password
userSchema.pre('save', function(next) {
  var user = this;
  //hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) {
    return next();
  }

  //generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }

    //change the password to the hashed version
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', userSchema);