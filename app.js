//librerias externas
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//modelos
const Places = require('./models/Place')

//rutas
const places = require('../api/routes/places')

//base de datos
const { dbConnection } = require('./config/database');






//conexion de la base de datos
var app = express();
dbConnection();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//inicio de las rutas
app.use('/places', places)



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
  res.json('error');
});

module.exports = app;
