var express = require('express');
var router = express.Router();
var config = require('../../config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: config.PSQL_USER,
  host: config.PSQL_HOST,
  database: config.PSQL_DATABASE,
  password: config.PSQL_PASSWORD,
  port: config.PSQL_PORT
})

pool.on('connect', () => {
  console.log('connected to the db');
});

/* GET home page. */
router.get('/all', function(req, res, next) {
  pool.query('SELECT * FROM events', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

module.exports = router;
