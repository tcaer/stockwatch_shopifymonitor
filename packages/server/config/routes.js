const expressjwt = require('express-jwt');
const { isUserAuthenticated } = require('../app/middlware/auth');

const jwt = expressjwt({
  secret: 'shhhhh',
  getToken: function(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
})

module.exports = {
  'post /user/create': 'auth@create_user',
  'post /user/login': 'auth@login_user',

  'get /user/get': {
    middleware: [jwt, isUserAuthenticated],
    action: 'user@get'
  }
}