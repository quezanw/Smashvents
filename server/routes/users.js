const express = require('express');
const router = express.Router();
let config = require('../../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  let defaultColor = '#7185AD';
  if(username === undefined) {
    return res.json({error: 'USERNAME CANNOT BE BLANK'});
  } else if(first_name === undefined) {
    return res.json({error: 'FIRST NAME CANNOT BE BLANK'});
  } else if(last_name === undefined) {
    return res.json({error: 'LAST NAME CANNOT BE BLANK'});
   }else if(email === undefined) {
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
      let createQuery = `
      INSERT INTO users 
      (
       username, 
       first_name, 
       last_name, 
       email, 
       password,
       theme_color
      )
      VALUES 
      (
       '${username}',
       '${first_name}',
       '${last_name}',
       '${email}',
       '${hash}',
       '${defaultColor}'
      )`; 
      pool.query(createQuery, (err, result) => {
        if(err) {
          throw err;
        }
        return res.status(200).json({...result, message: 'Registration Successful'});
      })
    });
  }
});

router.post('/login', async (req, res, next) => {
  let {email, password} = req.body;
  if(email === undefined) {
    return res.json({error: 'EMAIL CANNOT BE BLANK'});
  } else if (!EMAIL_REGEX.test(email.trim())) {
    return res.json({error: 'INVALID EMAIL'});
  } else if(password === undefined) {
    return res.json({error: 'PASSWORD CANNOT BE BLANK'});
  } else if(password.length < 8) {
    return res.json({error: 'PASSWORD MUST BE 8 CHARACTERS OR GREATER'}); 
  }
  let emailQuery = `SELECT password, user_id, username, theme_color, first_name, last_name 
                    FROM users WHERE email='${email}' LIMIT 1`;
  let emailResponse = await checkIfExists('email', emailQuery);
  if(emailResponse.exist) {
    bcrypt.compare(password, emailResponse.row.password, (err,result) => {
      if(err) {
        throw err
      }
      if(!result) {
        return res.json({error: 'INCORRECT PASSWORD'});
      } else {
        return res.json({user_id, username, theme_color, first_name, last_name} = emailResponse.row)
      }
    })
  } else {
    return res.json({error: 'INVALID EMAIL'});
  }
});

// user can change user name, theme color and password
// old password must match, before changing to new password
router.put('/edit', function(req, res, next) {
  let { username, password, theme_color } = req.body;
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

router.get('/delete', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
