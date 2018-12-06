const mongoose = require('mongoose');
const Users = mongoose.model('users');
const bcrypt = require('bcrypt');

module.exports = app => {
  app.post('/api/register', (req, res, next) => {
    const { email, userName, password } = req.body;

    Users.findOne({ email })
      .exec()
      .then(user => {
        if (user) {
          res.json({ message: 'This email is already registered' });
          next();
        } else {
          return bcrypt
            .genSalt(10)
            .then(salt => {
              return bcrypt.hash(password, salt);
            })
            .then(hash => {
              const user = new Users({
                email,
                userName,
                password: hash
              });

              //Check here after deleting if condition
              //if (user.email && user.userName && user.password) {
              return user.save();
              //}
            })
            .then(user => {
              res.json(user);
              next();
            });
        }
      })
      .catch(err => console.log('Error ', err.message));
  });

  app.get('/api/register', (req, res) => {
    console.log('Request is successfull ');
    res.send({ name: 'Prakash' });
  });
};
