const mongoose = require('mongoose');
const Users = mongoose.model('users');
const bcrypt = require('bcrypt');

module.exports = app => {
  app.post('/api/login', (req, res, next) => {
    const { email, password } = req.body;

    console.log('Req body ', req.body);
    Users.findOne({ email })
      .then(user => {
        if (user) {
          return bcrypt.compare(password, user.password).then(result => {
            if (result) {
              res.json({ message: 'Logged in', user });
            } else {
              res.status(400).json({ message: 'Invalid email or password' });
            }
          });
        } else {
          res.status(400).json({ message: 'Invalid email or password' });
        }
      })
      .catch(err => {
        console.log('Error', err.message);
      });
  });

  app.get('/api/login', (req, res, next) => {
    console.log('Login request is  successful');
    res.send({ message: 'Logged in with user' });
  });
};
