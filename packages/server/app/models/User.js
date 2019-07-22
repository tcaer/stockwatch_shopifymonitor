const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  maxMonitors: {
    type: String,
    required: false,
    default: 5
  },
  stripeId: {
    type: String,
    required: true
  },
  subscriptionId: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;

      next();
    });
  });
});

UserSchema.methods.comparePassword = function(plainText) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, this.password, function(err, res) {
      if (err) return reject(err);

      resolve(res);
    });
  });
}

let User = mongoose.model('User', UserSchema);

module.exports = User;