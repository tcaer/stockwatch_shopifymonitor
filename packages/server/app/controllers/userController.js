const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {

  get: async function(req, res) {
    try {
      const user = await User.findById(req.user._id);

      const rinsedUser = user.toObject();
      delete rinsedUser.password;

      const token = jwt.sign(rinsedUser, 'shhhhh');

      res.json({user: rinsedUser, jwt: token, success: true});
    } catch (err) {
      res.json({success: false});
    }
  }

}