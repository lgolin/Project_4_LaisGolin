const {response} = require('express');
var express = require('express');
var router = express.Router();
var connection = require('./config/db'); // calling the connection from the database
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
      const validated = response.find((row) => {
        return row.email == emailForm && row.password == passwordForm;
      });

      if (validated == undefined) {
        res.end('Invalid User or Password, please try again');
      } else {
        req.session.user = req.body.email;
        res.redirect('dashboard');
      }
    }
  });
});

// this script to fetch data from MySQL databse table
router.get('/dashboard', function (req, res, next) {
  var sql = `SELECT * FROM schedules 
    LEFT JOIN users ON schedules.ID_user = users.Id;`;
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('dashboard', {
      title: 'dashboard',
      userData: data,
      days: days,
    });
  });
});

// route for dashboard
router.get('/dashboard', (req, res) => {
  // res.render('dashboard', {user: req.session.user});
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
      res.render('base', {
        title: 'Schedule App',
        logout: 'Logout Successfully',
      });
    }
  });
});

router.get('/user/:ID_user', function (req, res, next) {
  var sql = `SELECT * FROM schedules 
    LEFT JOIN users ON schedules.ID_user = users.Id;`;
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('user', {
      title: 'user',
      userData: data,
      days: days,
    });
  });
});

// insert data to database
// router.get('/user/:ID_user', (req, res) => {
//   const {ID_user} = req.params;
//   console.log({ ID_user });

//    // 'Users' table connection
//   connection.query(
//     `SELECT * FROM users WHERE users.Id = ${ID_user}`,
//     (error, response) => {
//       if (error) throw error;

//       // 'Schedules' table connection
//       connection.query(
//         `SELECT * FROM schedules LEFT JOIN users ON schedules.ID_user = users.Id WHERE schedules.ID_user = ${ID_user}`,
//         (errorSchedules, schedules) => {
//           if (errorSchedules) throw error;

//           let userSchedules = [];

//           schedules.forEach((element) => {
//             let rowInformation = {
//               name: element.name,
//               lastName: element.surname,
//               email: element.email,
//               days: days,
//               startTime: element.start_time,
//               endTime: element.end_time,
//             };
//             userSchedules.push(rowInformation);
//           });

//           return res.render('user', {
//             user: response[0],
//             schedules: userSchedules,
//           });
//         }
//       );
//     }
//   );
// });

module.exports = router;
