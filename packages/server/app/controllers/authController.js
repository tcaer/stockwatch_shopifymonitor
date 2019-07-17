const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {

  create_user: async function(req, res) {
    const body = req.body;

    const user = new User({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password
    });

    try {
      await user.save();

      const rinsedUser = user.toObject();
      delete rinsedUser.password;
      let token = jwt.sign(rinsedUser, 'shhhhh');
      
      res.json({user: rinsedUser, jwt: token, success: true});
    } catch (err) {
      console.error(err);

      res.json({success: false});
    }
  },

  login_user: async function(req, res) {
    const body = req.body;

    try {
      var user = await User.findOne({email: body.email});

      if (user) {
        if (await user.comparePassword(body.password)) {
          const rinsedUser = user.toObject();
          delete rinsedUser.password;

          const token = jwt.sign(rinsedUser, 'shhhhh');

          res.json({user: rinsedUser, jwt: token, success: true});
        } else {
          res.json({success: false, message: 'No email/password combo found'});
        }
      } else {
        res.json({success: false, message: 'No email/password combo found'});
      }
    } catch (err) {
      console.error(err);

      res.json({success: false, message: 'Some error has occured. Pleas try again.'});
    }
  }

}