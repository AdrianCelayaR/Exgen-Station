var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var arRouter = require('./routes/ar');
var authRouter = require('./routes/auth');

var app = express();

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  
// Configurar connect-flash
app.use(flash());

app.use('/', indexRouter);
app.use('/about', indexRouter);
app.use('/contact', indexRouter);

app.use('/users', usersRouter);

app.use('/auth', authRouter);

app.use('/arcam',arRouter);

module.exports = app;
