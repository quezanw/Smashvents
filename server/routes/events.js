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

// GET single event
router.get('/', (req, res, next) => {
  pool.query(`SELECT * FROM events WHERE event_id=${req.body.event_id}`, (error, results) => {
    if(error) {
      throw error
    }
    console.log(req.body);
    res.status(200).json(results.rows);
  })
});

/* GET all events */
router.get('/all', function(req, res, next) {
  pool.query('SELECT * FROM events', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

// Create new event
router.post('/new', (req, res, next) => {
  let {title, description, ruleset, venue, online, offline, start_date} = req.body;
  let createQuery = `INSERT INTO events 
    (title, description, ruleset, venue, online, offline, start_date)
    VALUES ('${title}', '${description}', '${ruleset}', '${venue}', ${online}, ${offline}, '${start_date}')`;
  pool.query(createQuery, (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results);
  })
});

// edit event
router.put('/edit', (req, res, next) => {
  
});

// Delete event
router.delete('/delete', (req, res, next) => {
  
});

module.exports = router;
