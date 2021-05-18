const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const router = require('./router');

const app = express();

const port = process.env.PORT || 5000;

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ejs engine
app.set('view engine', 'ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.use('/route', router);

// Home route
app.get('/', (req, res) => {
  res.render('base', {title: 'Login System'});
});

// listen port
app.listen(port, () =>
  console.log('Listening to the server http://localhost:5000')
);
