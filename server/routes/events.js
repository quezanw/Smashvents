const express = require('express');
const router = express.Router();
const config = require('../../config');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri');
const path = require('path');
const dUri = new Datauri();

cloudinary.config({
  cloud_name: config.CLOUD_NAME, 
  api_key: config.CLOUDINARY_KEY, 
  api_secret: config.CLOUDINARY_SECRET
});

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

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

const checkIfExists = async (columnName, query) => {
  let response = await pool.query(query)
  if(response.rowCount !== 0) {
    return {exist: true, message: `${columnName} exists`, row: response.rows[0]};
  } else {
    return {exist: false, message: `${columnName} available`}
  }
}

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

// GET username
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

// GET all events a user is hosting
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

// GET all events a user is attending
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
  let query = `SELECT * from events 
               LEFT JOIN 
                (SELECT DISTINCT COUNT(attendees.event_id), event_id as id
                 FROM attendees GROUP BY event_id) 
                AS count ON count.id=events.event_id`;
  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({rows: results.rows});
  })
});

// Create new event
router.post('/new', (req, res, next) => {
  let {user_id, title, description, ruleset, venue, 
       online, start_date, start_time, end_time,
       banner_path, icon_path
      } = req.body;
  if(online === 'true') {
    online = true;
  } else {
    online = false;
  }
  // online = online === 'true' ? true : false;
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
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    RETURNING *`;
  const query = {
    text: createQuery,
    values: [user_id, title, description, ruleset, venue, online, start_date, 
             start_time, end_time, banner_path, icon_path]
  }
  pool.query(query, (error, results) => {
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
  let update = `
    UPDATE events 
    SET
      title = $1,
      description = $2,
      ruleset = $3,
      venue = $4,
      online = $5,
      start_date = $6,
      start_time = $7,
      end_time = $8,
      banner_path = $9,
      icon_path = $10
    WHERE event_id = $11`;
  const query = {
    text: update,
    values: [title, description, ruleset, venue, online, start_date, 
            start_time, end_time, banner_path, icon_path, event_id]
  }
  pool.query(query, (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results);
  })
});

const updateImage = async (image, public_id, event_id, type) => {
  let query = {
    text: `UPDATE events 
           SET custom_${type} = $1, ${type}_public_id = $2 WHERE event_id = $3`,
    values: [image, public_id, event_id]
  }
  pool.query(query, (err, result) => {
    if(err) {
      throw err;
    }
    return { success: true, result }
  })
}

router.put('/edit/banner', multerUploads, async (req, res) => {
  let { event_id } = req.body;
  if(req.file) {
    const options = {
      folder: `event-banners/event-${event_id}`, 
      use_filename: true
    }
    const file = dataUri(req).content;
    return cloudinary.uploader.upload(file, options)
      .then((result) => {
        const image = result.url;
        const public_id = result.public_id;

        updateImage(image, public_id, event_id, 'banner');

        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          custom_banner: image
        })
      })
      .catch((err) => res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          error: err
        }
    }))
   }
});

router.put('/edit/icon', multerUploads, async (req, res) => {
  let { event_id } = req.body;
  if(req.file) {
    const options = {
      folder: `event-icons/event-${event_id}`, 
      use_filename: true
    }
    const file = dataUri(req).content;
    return cloudinary.uploader.upload(file, options)
      .then((result) => {
        const image = result.url;
        const public_id = result.public_id;

        updateImage(image, public_id, event_id, 'icon');

        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          custom_icon: image
        })
      })
      .catch((err) => res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          error: err
        }
    }))
   }
});


router.delete('/delete/banner/:event_id', async (req, res) => {
  let { event_id } = req.params;
  let query = {
    text: `SELECT banner_public_id FROM events WHERE event_id = $1`,
    values: [event_id]
  }
  const fetchPublicId = await checkIfExists('banner_public_id', query);
  if(!fetchPublicId.exist) {
    return res.json({ error: 'public_id does not exist.' })
  }
  return cloudinary.uploader.destroy(fetchPublicId.row.banner_public_id)
    .then(result => {
      updateImage('', '', event_id, 'banner');
      return res.status(200).json({
        message: 'Your image has been deleted successfully from cloudinary',
        custom_banner: '',
        data: {
          result
        }
      })
    })
    .catch(err => res.status(400).json({
      error: 'someting went wrong while processing your request',
      data: {
        err
      }
    }))
});

router.delete('/delete/icon/:event_id', async (req, res) => {
  let { event_id } = req.params;
  let query = {
    text: `SELECT icon_public_id FROM events WHERE event_id = $1`,
    values: [event_id]
  }
  const fetchPublicId = await checkIfExists('icon_public_id', query);
  if(!fetchPublicId.exist) {
    return res.json({ error: 'public_id does not exist.' })
  }
  return cloudinary.uploader.destroy(fetchPublicId.row.icon_public_id)
    .then(result => {
      updateImage('', '', event_id, 'icon');
      return res.status(200).json({
        message: 'Your image has been deleted successfully from cloudinary',
        custom_icon: '',
        data: {
          result
        }
      })
    })
    .catch(err => res.status(400).json({
      error: 'someting went wrong while processing your request',
      data: {
        err
      }
    }))
});

// Delete event
router.delete('/delete/:event_id', (req, res, next) => {
  let {event_id} = req.params;
  let deleteQuery = `DELETE FROM events WHERE event_id=${event_id}`;
  pool.query(deleteQuery, (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results);
  })
});

module.exports = router;
