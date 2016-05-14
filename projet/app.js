var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();



var routes = require('./app/routes/index');
var users = require('./app/routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

/*
mongoose.connect('mongodb://localhost/bdd', function (err) {
    if (err) {
        throw err;
    }
}); */


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(5001);

var net = require('net');

var client = new net.Socket();
client.connect(5001, '192.168.233.132', function() {
    console.log('Connected');
    client.write('test'); 
});

client.on('data', function(data) {

   //socketio ( io.sockets.emit('ProjetFIN', data) )

   var data = new Buffer(data); 

    console.log('Received: ');
    console.log(data.toString());

   //var b = new Buffer(255); 
   //b.write('test'); 
    //client.send(b, 0, b.length);

io.sockets.on('connection', function (socket) {
  socket.on('save', function (tampon) { 
  });
});    
});
var io = require('socket.io')(80);

io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');
});
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data', function(err) {
  if (err) { throw err; }
}); 

module.exports = app;