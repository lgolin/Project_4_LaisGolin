const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project4',
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Database connected');
});

module.exports = connection;
