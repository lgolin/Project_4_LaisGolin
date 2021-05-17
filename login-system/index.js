const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// load static assessts
app.use('/static', express.static(path.join(__dirname, 'public'))); // style
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); // images

// home route
app.get(`/`, (req, res) => {
  res.render('base', {title: 'Login System'});
});

// Start server
app.listen(port, () =>
  console.log('Listening to the server on http://localhost:3000')
);
