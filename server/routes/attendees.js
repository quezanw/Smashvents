const express = require('express');
const router = express.Router();
const config = require('../../config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: config.PSQL_USER,
  host: config.PSQL_HOST,
  database: config.PSQL_DATABASE,
  password: config.PSQL_PASSWORD,
  port: config.PSQL_PORT
})

router.get('/all', (req, res, next) => {
  let query = `SELECT * FROM attendees JOIN users WHERE attendees.user_id=users.user_id`;
  pool.query(query, (error, results) => {
    if(error) {
      throw error
    }
    console.log(req.body);
    res.status(200).json(results.rows);
  })
});

module.exports = router;