const express = require('express');
const router = express.Router();
const config = require('../../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
const multerUploads = multer({ storage }).single('profile_img');
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.PSQL_USER,
  host: config.PSQL_HOST,
  database: config.PSQL_DATABASE,
  password: config.PSQL_PASSWORD,
  port: config.PSQL_PORT
})

let checkIfExists = async (columnName, query) => {
  let response = await pool.query(query)
  if(response.rowCount !== 0) {
    return {exist: true, message: `${columnName} exists`, row: response.rows[0]};
  } else {
    return {exist: false, message: `${columnName} available`}
  }
}

router.post('/register', async (req, res, next) => {
  let { username, first_name, last_name, email, password } = req.body;
  // let defaultColor = '#7185AD';
  if(username === undefined) {
    return res.json({error: 'USERNAME CANNOT BE BLANK'});
  } else if(first_name === undefined) {
    return res.json({error: 'FIRST NAME CANNOT BE BLANK'});
  } else if(last_name === undefined) {
    return res.json({error: 'LAST NAME CANNOT BE BLANK'});
  } else if(email === undefined) {
    return res.json({error: 'EMAIL CANNOT BE BLANK'});
  } else if(!EMAIL_REGEX.test(email.trim())) {
    return res.json({error: 'INVALID EMAIL'});
  } else if(password.length < 8) {
    return res.json({error: 'PASSWORD MUST BE 8 CHARACTERS OR GREATER'});
  }
  let emailQuery = `SELECT email FROM users WHERE email='${email}' LIMIT 1`;
  let usernameQuery = `SELECT username FROM users WHERE username='${username}' LIMIT 1`;
  let emailResponse = await checkIfExists('email', emailQuery);
  let usernameResponse = await checkIfExists('username', usernameQuery);
  if (usernameResponse.exist) {
    return res.json({error: usernameResponse.message});
  } else if(emailResponse.exist) {
    return res.json({error: emailResponse.message});
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err) {
        throw err
      }
      let createQuery = `INSERT INTO users 
                          (username, first_name, last_name, email, password)
                          VALUES ($1, $2, $3, $4, $5)`; 
      const query = {
        text: createQuery,
        values: [username, first_name, last_name, email, hash]
      }
      pool.query(query, (err, result) => {
        if(err) {
          throw err;
        }
        return res.status(200).json({...result, message: 'Registration Successful'});
      })
    });
  }
});

router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;
  if(email === undefined) {
    return res.json({error: 'EMAIL CANNOT BE BLANK'});
  } else if (!EMAIL_REGEX.test(email.trim())) {
    return res.json({error: 'INVALID EMAIL'});
  } else if(password === undefined) {
    return res.json({error: 'PASSWORD CANNOT BE BLANK'});
  } else if(password.length < 8) {
    return res.json({error: 'PASSWORD MUST BE 8 CHARACTERS OR GREATER'}); 
  }
  let emailQuery = `SELECT password, user_id, username, theme_color, first_name, last_name, profile_img 
                    FROM users WHERE email='${email}' LIMIT 1`;
  let emailResponse = await checkIfExists('email', emailQuery);
  if(emailResponse.exist) {
    console.log(emailResponse)
    bcrypt.compare(password, emailResponse.row.password, (err,result) => {
      if(err) {
        throw err
      }
      if(!result) {
        return res.json({error: 'INCORRECT PASSWORD'});
      } else {
        return res.json(
          {
            user_id, 
            username, 
            theme_color, 
            first_name, 
            last_name, 
            profile_img
          } = emailResponse.row);
      }
    })
  } else {
    return res.json({error: 'INVALID EMAIL'});
  }
});

router.put('/edit/theme_color', function(req, res, next) {
  let { user_id, theme_color } = req.body;
  let query = `UPDATE users
               SET theme_color='${theme_color}' 
               WHERE user_id='${user_id}' 
               RETURNING theme_color`;
  pool.query(query, (err, result) => {
    if(err) {
      throw err;
    }
    return res.status(200).json({...result});
  })
});

router.put('/edit/profile', async (req, res, next) => {
  let { user_id, username } = req.body;
  if(username === undefined) {
    return res.json({error: 'USERNAME CANNOT BE BLANK'});
  }
  let usernameQuery = `SELECT username FROM users WHERE username='${username}' LIMIT 1`;
  let usernameResponse = await checkIfExists('username', usernameQuery);
  if (usernameResponse.exist) {
    return res.json({error: usernameResponse.message});
  } else {
    let query = `UPDATE users
                SET username='${username}' 
                WHERE user_id='${user_id}' 
                RETURNING username`;
    pool.query(query, (err, result) => {
      if(err) {
        throw err;
      }
      return res.status(200).json({...result});
    })
  }
});

const updateProfileImg = async (profile_img, public_id, user_id) => {
  let query = {
    text: `UPDATE users SET profile_img = $1, public_id = $2 WHERE user_id = $3`,
    values: [profile_img, public_id, user_id]
  }
  pool.query(query, (err, result) => {
    if(err) {
      throw err;
    }
    return { success: true }
  })
}

router.put('/edit/profile_img', multerUploads, async (req, res) => {
  let { user_id } = req.body;
  if(req.file) {
    const options = {
      folder: `user-icons/user-${user_id}`, 
      use_filename: true
    }
    const file = dataUri(req).content;
    return cloudinary.uploader.upload(file, options)
      .then((result) => {
        const image = result.url;
        const public_id = result.public_id;

        updateProfileImg(image, public_id, user_id);

        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          data: {
            result
          }
        })
      })
      .catch((err) => res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          err
        }
    }))
   }
})

router.delete('/delete/profile_img/:user_id', async (req, res) => {
  let { user_id } = req.params;
  let query = {
    text: `SELECT public_id FROM users WHERE user_id = $1`,
    values: [user_id]
  }
  const fetchPublicId= await checkIfExists('public_id', query);
  if(!fetchPublicId.exist) {
    return res.json({message: 'public_id does not exist.' })
  }
  return cloudinary.uploader.destroy(fetchPublicId.row.public_id)
    .then(result => {
      updateProfileImg('', '', user_id);
      return res.status(200).json({
        message: 'Your image has been deleted successfully from cloudinary',
        data: {
          result
        }
      })
    })
    .catch(err => res.status(400).json({
      message: 'someting went wrong while processing your request',
      data: {
        err
      }
    }))
})

router.delete('/delete/user/:user_id',(req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
