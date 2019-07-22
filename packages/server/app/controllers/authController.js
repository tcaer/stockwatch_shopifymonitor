const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const stripe = require('stripe')(env.stripe);
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
      let customer = await stripe.customers.create({
        description: `Customer for ${body.email}`,
        email: body.email,
        name: `${body.firstName} ${body.lastName}`
      });

      let subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            plan: 'plan_FU2dkxEtutY2GG'
          }
        ]
      });

      user.stripeId = customer.id;
      user.subscriptionId = subscription.id;

      await user.save();

      const rinsedUser = user.toObject();

      delete rinsedUser.password;
      delete user.stripeId;
      delete user.subscriptionId;
      
      let token = jwt.sign(rinsedUser, 'shhhhh');
      
      res.json({jwt: token, success: true});
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
          delete user.stripeId;
          delete user.subscriptionId;

          const token = jwt.sign(rinsedUser, 'shhhhh');

          res.json({jwt: token, success: true});
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