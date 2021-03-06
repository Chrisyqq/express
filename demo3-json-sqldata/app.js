'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db =require('./db');

var index = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');
// require png-word.
var PW = require("png-word");
var pw = PW(PW.GRAY);
var r = require("random-word")("abcdefghijklmnopqrst0123456789");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat'
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

app.get('/',function (req,res) {
  res.render('index',{list:db.list,logined:req.session.logined});
});
app.post('/add',function (req, res) {
  db.add({title:req.body.title});
  res.redirect('/');
});
app.get('/get/:index',function (req,res) {
  let index = req.params.index;
  let article = db.get(index);
  res.send(article)
});
app.get('/del',function (req,res) {
  let index = req.query.index;
  db.del(index);
  res.redirect('/');
});

app.post('/update',function (req, res) {
  let index = req.body.index;
  let title = req.body.title;
  db.update(index,{title});
  res.redirect('/');
});

app.post('/login',function (req, res) {
  let loginname = req.body.loginname;
  let password = req.body.password;
  let vnum = req.body.vnum;
  if(loginname === 'leo' && password === '123' && vnum === req.session.validat_num){
    req.session.logined = true;
    res.send('success');
  }else{
    res.send("error");
  }
});
app.get('/logout',function (req,res) {
  req.session.logined = false;
  res.redirect('/');
});
// refresh png number.
app.get('/refresh',function(req,res){

  var numtxt = req.session.validat_num = r.random(4);

  pw.createPNG(numtxt,function(pngnum){
    res.send(pngnum);
  })

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
