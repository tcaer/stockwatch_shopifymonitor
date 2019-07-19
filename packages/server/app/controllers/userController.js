const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {

  get: async function(req, res) {
    const user = req.user.toObject();
    delete user.password;

    const token = jwt.sign(user, 'shhhhh');

    res.json({user, jwt: token, success: true});
  }

}