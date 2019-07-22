const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const stripe = require('stripe')(env.stripe);

module.exports = {

  get: async function(req, res) {
    const user = req.user.toObject();

    try {
      let invoice = await stripe.invoices.retrieveUpcoming({
        customer: user.stripeId,
        subscription: user.subscriptionId});

      user.balance = invoice.amount_due;

      delete user.password;
      delete user.stripeId;
      delete user.subscriptionId;

      console.log(user);

      const token = jwt.sign(user, 'shhhhh');

      res.json({user, jwt: token, success: true});
    } catch (err) {
      console.error(err);
      res.json({success: false});
    }
  }

}