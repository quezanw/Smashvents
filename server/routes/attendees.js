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
  let query = `SELECT * FROM attendees`;
  pool.query(query, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

router.get('/event/:id', (req, res, next) => {
  let event_id = req.params.id;
  console.log(req.params);
  console.log('cheese')
  let query = `SELECT users.user_id, users.username 
               FROM attendees
               JOIN users ON attendees.user_id=users.user_id
               JOIN events ON attendees.event_id=events.event_id
               WHERE attendees.event_id=${event_id}`;
  pool.query(query, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

router.post('/join', (req,res,next)=> {
  let {user_id, event_id} = req.body;
  let joinQuery = `INSERT INTO attendees 
                   (user_id, event_id) 
                   VALUES (${user_id}, ${event_id})`;
  pool.query(joinQuery, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json(results);
  })
});

router.post('/leave', (req,res,next)=> {
  let {user_id, event_id} = req.body;
  let leaveQuery = `DELETE FROM attendees 
                   WHERE user_id = ${user_id} AND  event_id = ${event_id}`;
  pool.query(leaveQuery, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json(results);
  })
});




module.exports = router;