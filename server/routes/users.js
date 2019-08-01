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
  if(!username || !first_name || !last_name || !email || !password) {
    res.json({error: 'ONE OR MORE FIELDS UNDEFINED'});
  } else if(username.length < 0) {
    res.json({error: 'USERNAME CANNOT BE BLANK'});
  } else if(first_name.length < 0) {
    res.json({error: 'FIRST NAME CANNOT BE BLANK'});
  } else if(last_name.length < 0) {
    res.json({error: 'LAST NAME CANNOT BE BLANK'});
  } else if(!EMAIL_REGEX.test(email.trim())) {
    res.json({error: 'INVALID EMAIL'});
  } else if(password.length < 8) {
    res.json({error: 'PASSWORD MUST BE 8 CHARACTERS OR GREATER'});
  }
  let emailQuery = `SELECT email FROM users WHERE email='${email}' LIMIT 1`;
  let usernameQuery = `SELECT username FROM users WHERE username='${username}' LIMIT 1`;
  let emailResponse = await checkIfExists('email', emailQuery);
  let usernameResponse = await checkIfExists('username', usernameQuery);
  if(emailResponse.exist) {
    res.json({error: emailResponse.message});
  } else if (usernameResponse.exist) {
    res.json({error: usernameResponse.message});
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
       password
      )
      VALUES 
      (
       '${username}',
       '${first_name}',
       '${last_name}',
       '${email}',
       '${hash}'
      )`; 
      pool.query(createQuery, (err, result) => {
        if(err) {
          throw err;
        }
        res.status(200).json({...result, message: 'Registration Successful'});
      })
    });
  }
});

router.get('/login', async (req, res, next) => {
  let {email, password} = req.body;
  if(!email || !password) {
    res.status(401).json({error: 'ONE OR MORE FIELDS UNDEFINED'});
  } else if(email.length < 1) {
    res.status(401).json({error: 'EMAIL CANNOT BE BLANK'});
  } else if(password.length < 1) {
    res.status(401).json({error: 'PASSWORD CANNOT BE BLANK'});
  } else if (!EMAIL_REGEX.test(email.trim())) {
    res.status(401).json({error: 'INVALID EMAIL'});
  } else if(password.length < 8) {
    res.status(401).json({error: 'PASSWORD MUST BE 8 CHARACTERS OR GREATER'}); 
  }
  let emailQuery = `SELECT password, user_id FROM users WHERE email='${email}' LIMIT 1`;
  let emailResponse = await checkIfExists('email', emailQuery);
  if(emailResponse.exist) {
    bcrypt.compare(password, emailResponse.row.password, (err,result) => {
      if(err) {
        throw err
      } else if(!result) {
        res.status(401).json({error: 'INCORRECT PASSWORD'});
      } else {
        res.status(200).json({user_id: emailResponse.row.user_id})
      }
    })
  } else {
    res.status(401).json({error: 'INVALID EMAIL'});
  }
});

router.get('/edit', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/delete', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
