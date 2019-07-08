const fastify = require('fastify')(); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/stockwatch-dev', {useNewUrlParser: true});

/*
* We will need to refactor this into proper models, with password hashing,
* better field definitions, etc.
*/
const User = mongoose.model('User', {email: String, name: String, password: String});

fastify.register(require('fastify-cors'), {});

/*
* This whole routing will be changed to be modular, split into different files, etc.
* for now I just want it to work so that we can get the frontend further along
*/
fastify.post('/user/create', async (req, rep) => {
  const body = req.body;

  const user = new User({
    email: body.email,
    name: body.name,
    password: body.password
  });

  try {
    await user.save();

    const rinsedUser = {
      email: user.email,
      name: user.name,
      _id: user._id
    };
    const token = jwt.sign(rinsedUser, 'shhhhh');

    return { user: rinsedUser, jwt: token, success: true };
  } catch (err) {
    console.log(err);

    return { success: false };
  }
});

fastify.post('/user/login', async (req, rep) => {
  const body = req.body;

  try {
    var user = await User.findOne({email: body.email});

    if (user.password == body.password) {
      const rinsedUser = {
        email: user.email,
        name: user.name,
        _id: user._id
      };
      const token = jwt.sign(rinsedUser, 'shhhhh');

      return { user: rinsedUser, jwt: token, success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.error(err);

    return { success: false }
  }
});

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
});

const start = async () => {
  try {
    await fastify.listen(3000);
    console.log(`Server listening on ${fastify.server.address().port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start();