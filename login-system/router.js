const {response} = require('express');
const express = require('express');
const router = express.Router();
const connection = require('./config/db'); // calling the connection from the database
const days = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

// login user with dashboard
router.post('/login', (req, res) => {
  connection.query('SELECT * FROM users', (error, response) => {
    const emailForm = req.body.email,
        passwordForm = req.body.password;

    if (response) {
      const currentUser = response.find((row) => {
        return row.email == emailForm && row.password == passwordForm;
      });

      if (currentUser == undefined) {
        res.end('Invalid User or Password, please try again');
      } else {
        req.session.user = {
          id: currentUser.Id,
          email: currentUser.email,
          name: currentUser.first_name
        }
        res.redirect('dashboard');
      }
    }
  });
});

// this script to fetch data from MySQL database table
router.get('/dashboard', function (req, res, next) {
  var sql = `SELECT * FROM schedules 
    LEFT JOIN users ON schedules.ID_user = users.Id;`;
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('dashboard', {
      title: 'dashboard',
      userData: data,
      days: days,
      userName: req.session.user.name
    });
  });
});

// route for logout
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      res.render('base', {
        title: 'Schedule App',
        logout: 'Logout Successfully',
      });
    }
  });
});

// get user ID
router.get('/user/:ID_user', function (req, res, next) {
  const {ID_user} = req.params;
  const sql = `SELECT * FROM schedules 
    LEFT JOIN users ON schedules.ID_user = users.Id WHERE schedules.ID_user = ${ID_user} `;
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user', {
      title: 'user',
      ID_user: ID_user,
      userData: data,
      days: days,
      userName: req.session.user.name
    });
  });
});

// GET new schedule
router.get('/newSchedule', (req, res) => {
  res.render('newSchedule', {userName: req.session.user.name});
});

// add new schedule
router.post('/newSchedule', (req, res) => {
  const scheduledUser = req.session.user.id;
  const days = req.body.dayWeek;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  // console.log(req.body.dayWeek)

  connection.query('INSERT INTO schedules (ID_user, week_day, start_time, end_time) VALUES(?,?,?,?)',
       [scheduledUser, days, startTime, endTime],
      (error, response) => {
        if (error) throw error;
        else {
          console.log("New schedule has been added");
          res.redirect("/dashboard")
        }
      })
})

module.exports = router;
