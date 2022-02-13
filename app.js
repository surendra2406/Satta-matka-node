var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require("express-session");
const formidable = require('express-formidable');
var logger = require('morgan');
const isset = require('isset');
//global.localStorage = require('node-localstorage')

require('dotenv').config({ path: path.join(__dirname, '.env') });
admin = process.env.ADMIN_URL

global.bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
const connectDB = async()=>{
  try{
      const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log("Mongodb Connected...")
  }catch(err){
      console.log(err)
  }
}
connectDB();

global.FUNC = require('./middleware/adminauth');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/* app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000000,
    },
  })
);
 */
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
/* app.use(express.json());
app.use(express.urlencoded({ extended: false })); */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(admin, adminRouter);

//	non auth (public) function are here
// global.Admin = require('./models/Admin.js').Admin;

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
  res.render('error');
});

 app.listen(3000, function(){console.log("server runing on port 3000")})



module.exports = app;
