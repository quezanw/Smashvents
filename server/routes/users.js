const express = require('express');
const router = express.Router();
let config = require('../../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Pool = require('pg').Pool
const pool = new Pool({
  user: config.PSQL_USER,
  host: config.PSQL_HOST,
  database: config.PSQL_DATABASE,
  password: config.PSQL_PASSWORD,
  port: config.PSQL_PORT
})


/* GET users listing. */
// function for valid email - use regex
// check for existing email / username
// password must be atleast 8 characters long
let checkIfExists = async (columnName, query) => {
  let response = await pool.query(query)
  if(response.rowCount !== 0) {
    return {error: true, message: `Invalid: ${columnName} exists`};
  } else {
    return {success: true, message: `${columnName} available`}
  }
}
router.post('/signup', async (req, res, next) => {
  let {username, first_name, last_name, email, password} = req.body;
  let EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if(!EMAIL_REGEX.test(email.trim())) {
    res.json({error: 'Invalid email'})
  }
  let emailQuery = `SELECT * FROM users WHERE email='${email}' LIMIT 1`;
  let usernameQuery = `SELECT * FROM users WHERE username='${username}' LIMIT 1`;
  let emailResponse = await checkIfExists('email', emailQuery)
  let usernameResponse = await checkIfExists('username', usernameQuery)
  if(emailResponse.success && usernameResponse.success) {
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
        res.status(200).json(result);
      })
    });
  } else {
    res.json([emailResponse, usernameResponse]);
  }
});

router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/edit', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/delete', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
