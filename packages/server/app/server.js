const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('../config/routes');

mongoose.connect('mongodb://localhost:27017/stockwatch-dev', {useNewUrlParser: true});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

for (let route in routes) {
  let type = route.split(' ')[0];
  let url = route.split(' ')[1];


  if (typeof routes[route] == 'string') {
    let controller = routes[route].split('@')[0];
    let method = routes[route].split('@')[1];

    app[type](url, function(req, res) {
      require(`./controllers/${controller}Controller.js`)[method](req, res);
    });
  } else {
    let controller = routes[route].action.split('@')[0];
    let method = routes[route].action.split('@')[1];
    let middleware = routes[route].middleware;

    if (middleware) {
      app[type](url, ...middleware, function(req, res) {
        require(`./controllers/${controller}Controller.js`)[method](req, res);
      });
    } else {
      app[type](url, function(req, res) {
        require(`./controllers/${controller}Controller.js`)[method](req, res);
      });
    }
  }
}

app.listen(3000, () => console.log(`Server listening on 3000`));
/*
fastify.get('/@me', async (req, rep) => {
  let authorizationHeader = req.headers.authorization;
  let token = authorizationHeader.split(' ')[1];

  try {
    var decoded = jwt.verify(token, 'shhhhh');
    
    var user = await User.findById(decoded._id);

    if (user) {
      const rinsedUser = {
        email: user.email,
        name: user.name,
        _id: user._id
      };

      return { user: rinsedUser, success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.error(err);

    return { success: false };
  }
});*/