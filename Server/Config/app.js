// required node modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let dotenv = require('dotenv').config()//for loading information from a .env file into project

//additional dependencies 
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

// Routing modules
const indexRouter = require('../Routes');
const mediaRouter = require('../Routes/media');
const providerRouter = require('../Routes/provider')
const authRouter = require('../Routes/auth');

const app = express();

//link to .env file if not in production mode
if(process.env.NODE_ENV !== 'production')
{
  require('dotenv').config()
}

//do db connection - must be after express app instantiated
mongoose.connect(process.env.DB_CONNECTION)
.then((res) => {console.log('Connected to MongoDB')})
.catch((err) => {console.log(`Connection to db failed: ${err}`)})

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'hbs');

// middleware configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//passport config BEFORE routers 
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session()) 

//link passport to User  
const User = require('../Models/user')
passport.use(User.createStrategy()) 

//link User model w/passport session mgmt 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/media', mediaRouter);
app.use('/providers', providerRouter)
app.use('/', indexRouter);
app.use('/auth', authRouter)

//hbs custom helpers
const hbs = require('hbs')

hbs.registerHelper('selectOption', (currentValue, selectedValue) => {

  let selectedProperty = ' '

  if(currentValue === selectedValue){

    selectedProperty = ' selected'

  }

  return new hbs.SafeString(`<option${selectedProperty}>${currentValue}</option>`)

})

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: `Error: ${err.status}`, page: 'error'});
});

module.exports = app;