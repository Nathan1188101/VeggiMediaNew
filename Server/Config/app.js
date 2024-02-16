// required node modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//additional dependencies 
const mongoose = require('mongoose')

// Routing modules
const indexRouter = require('../Routes');
const mediaRouter = require('../Routes/media');

const app = express();

//link to .env file if not in production mode
if(process.env.NODE_ENV !== 'production')
{
  require('dotenv').config()
}

//do db connection - must be after express app instantiated
mongoose.connect('mongodb+srv://secord:6wVWpHnawQtS32g8@cluster0.2qalppo.mongodb.net/2068g')
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

app.use('/media', mediaRouter);
app.use('/', indexRouter);

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