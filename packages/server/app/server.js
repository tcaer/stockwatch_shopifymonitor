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