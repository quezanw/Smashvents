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

pool.on('connect', () => {
  console.log('connected to the db');
});

// GET single event
router.get('/', (req, res, next) => {
  // let query = `SELECT * FROM events 
  //              JOIN users ON users.user_id=events.user_id
  //              WHERE events.event_id=${req.params.event_id} AND users.user_id=events.user_id`;
  pool.query(`SELECT * FROM events WHERE event_id=${req.body.event_id}`, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json({rows: results.rows});
  })
});

router.get('/host/:user_id', (req,res,next) => {
  let { user_id } = req.params;
  let query = `SELECT username FROM users WHERE user_id=${user_id}`;
  pool.query(query, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json({rows: results.rows});
  })
});

router.get('/hosting/:user_id', (req, res, next) => {
  let { user_id } = req.params;
  let query = `SELECT * FROM events WHERE user_id=${user_id}`;
  pool.query(query, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json({rows: results.rows});
  })
});

router.get('/attending/:user_id', (req, res, next) => {
  let { user_id } = req.params;
  let query = `SELECT events.* FROM events
               JOIN attendees ON events.event_id=attendees.event_id
               WHERE attendees.user_id=${user_id}`;
  pool.query(query, (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json({rows: results.rows});
  })
});

/* GET all events */
router.get('/all', function(req, res, next) {
  pool.query('SELECT * FROM events', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({rows: results.rows});
  })
});

// Create new event
router.post('/new', (req, res, next) => {
  console.log(req.body);
  let {user_id, title, description, ruleset, venue, 
       online, start_date, start_time, end_time,
       banner_path, icon_path
      } = req.body;
  if(title === undefined) {
    return res.json({error: 'TITLE CANNOT BE BLANK'});
  } else if(venue === undefined && !online) {
    return res.json({error: 'VENUE REQUIRED FOR OFFLINE EVENTS'});
  } else if(start_date === undefined) {
    return res.json({error: 'START DATE REQUIRED'}) 
  } else if(start_time === undefined) {
    return res.json({error: 'START TIME REQUIRED'}) 
  } else if(end_time === undefined) {
    return res.json({error: 'END TIME REQUIRED'}) 
  }
  let createQuery = `INSERT INTO events 
                    (user_id, title, description, 
                    ruleset, venue, online, start_date,
                    start_time, end_time, banner_path, icon_path)
                    VALUES 
                    (${user_id}, '${title}', '${description}', 
                    '${ruleset}', '${venue}', ${online === 'true'}, '${start_date}',
                    '${start_time}', '${end_time}', '${banner_path}', '${icon_path}')
                    RETURNING *
                    `;
  pool.query(createQuery, (error, results) => {
    if(error) {
      throw error;
    }
    return res.json({message: 'Event successfully created', event: results.rows[0]});
  })
});

// edit event
router.put('/edit', (req, res, next) => {
  let {event_id, title, description, ruleset, venue, 
       online, start_date, start_time, end_time,
       banner_path, icon_path
      } = req.body;
  if(title === undefined) {
    return res.json({error: 'TITLE CANNOT BE BLANK'});
  } else if(venue === undefined && !online) {
    return res.json({error: 'VENUE REQUIRED FOR OFFLINE EVENTS'});
  } else if(start_date === undefined) {
    return res.json({error: 'START DATE REQUIRED'}) 
  } else if(start_time === undefined) {
    return res.json({error: 'START TIME REQUIRED'}) 
  } else if(end_time === undefined) {
    return res.json({error: 'END TIME REQUIRED'}) 
  }
  let updateQuery = `
    UPDATE events 
    SET
      title='${title}',
      description='${description}',
      ruleset='${ruleset}',
      venue='${venue}',
      online = ${online},
      start_date='${start_date}',
      start_time='${start_time}',
      end_time='${end_time}',
      banner_path='${banner_path}',
      icon_path='${icon_path}'
    WHERE event_id = ${event_id}
  `;
  pool.query(updateQuery, (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results);
  })
});

// Delete event
router.delete('/delete/:event_id', (req, res, next) => {
  let {event_id} = req.params;
  let deleteQuery = `DELETE FROM events WHERE event_id=${event_id}`;
  pool.query(deleteQuery, (error, results) => {
    if(error) {
      throw error;
    }
  })
});

module.exports = router;
