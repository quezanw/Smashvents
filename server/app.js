var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');

let indexRouter = require('./routes/index');
let eventsRouter = require('./routes/events');
let usersRouter = require('./routes/users');
let attendeesRouter = require('./routes/attendees');

var app = express();

// var allowedOrigins = ['http://localhost:3000/', 'http://localhost:3001/', 'http://192.168.0.135:3001/'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);

//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }

//     return callback(null, true);
//   },  credentials: true
// }));
app.use(cors());
app.options('*', cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('keyboardkitteh'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.set('trust proxy', 1);

app.use(session({
  secret: 'keyboardkitteh',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/events', eventsRouter);
app.use('/auth', usersRouter);
app.use('/attendees', attendeesRouter);
// app.use(indexRouter);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
