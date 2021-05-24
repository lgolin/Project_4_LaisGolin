const {response} = require('express');
var express = require('express');
var router = express.Router();
var connection = require('./config/db'); // calling the connection from the database

// login user with dashboard
router.post('/login', (req, res) => {
  connection.query('SELECT * FROM users', (error, response) => {
      const emailForm = req.body.email,
        passwordForm = req.body.password;

      if (response) {
        const validated = response.find(row => {
          return row.email == emailForm && row.password == passwordForm;
        })
        if (validated == undefined) {
          res.end('Invalid User');
        } else {
          req.session.user = req.body.email;
          res.redirect('dashboard');
        }
      }
    });
});

// route for dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', {user: req.session.user});
  } else {
    res.send('Unauthorize User');
  }
});

// route for logout
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      res.render('base', {title: 'Express', logout: 'Logout Successfully'});
    }
  });
});

module.exports = router;
