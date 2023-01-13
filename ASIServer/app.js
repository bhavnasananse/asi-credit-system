var createError = require('http-errors');
var express = require('express');
var md5 = require('md5');
const exactMath = require('exact-math');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roleRouter = require('./routes/role');
var customerRouter = require('./routes/customer');
var insuranceRouter = require('./routes/insurance');
var paymentRouter = require('./routes/payment');
var creditRouter = require('./routes/credit');
var managerRouter = require('./routes/manager');
var followupRouter = require('./routes/followup');
var special_approveRouter = require('./routes/special_approve');
var accountRouter = require('./routes/account');
var customRouter = require('./routes/custom');
var reportsRouter = require('./routes/reports');
var pendingRouter = require('./routes/pending');




const cors= require('cors');
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/role', roleRouter);
app.use('/customer', customerRouter);
app.use('/insurance', insuranceRouter);
app.use('/payment', paymentRouter);
app.use('/credit', creditRouter);
app.use('/manager', managerRouter);
app.use('/followup', followupRouter);
app.use('/special_approve', special_approveRouter);
app.use('/account', accountRouter);
app.use('/custom', customRouter);
app.use('/reports', reportsRouter);
app.use('/pending', pendingRouter);



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

module.exports = app;
