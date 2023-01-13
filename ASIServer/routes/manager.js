var express = require('express');
var router = express.Router();
var connection = require('../config/config');
const exactMath = require('exact-math');


router.post('/approve_credit', function(req, res, next){
  if(req.body.credit_id !=null){
  var query="UPDATE tbl_credit_list SET require_credit='"+req.body.require_credit+"',approve_amount= '"+req.body.approve_amount+"',approver_comment= '"+req.body.approver_comment+"' WHERE credit_id= '"+req.body.credit_id+"' ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json({ack:true});
    }
  });
}else{
  res.json({ack:false});
}
});

router.post('/add_payment', function (req, res, next) {
  var payamount = 0; 
  payamount = parseInt(req.body.pay_amount) //new value
  var query = "select * from tbl_credit_list where credit_id = '"+req.body.credit_id+"' ";
  connection.query(query, function (err, rows, field) {
      if (err) res.json([]);
      else {
          payamount += rows[0].pay_amount; //new value + old value
          var balance_amount = rows[0].approve_amount - payamount; //balance_amount          
          var query1 = "UPDATE tbl_credit_list SET pay_amount = '" + payamount + "',balance_amount='" + balance_amount + "', advisor_comment='" + req.body.advisor_comment + "' where credit_id = '" + rows[0].credit_id + "'"
          connection.query(query1, function (uerr, urows, field) {
              if (uerr) res.json([]);
              else {
                  rows[0].pay_amount = payamount;
                  rows[0].balance_amount = balance_amount;
                  res.json({ack:true})
              }
          });
      }
  })
});


router.post('/is_reject', function(req, res, next){
  if(req.body.credit_id !=null){
  var query="UPDATE tbl_credit_list SET is_reject= 1 WHERE credit_id= '"+req.body.credit_id+"' ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json({ack:true});
    }
  });
}else{
  res.json({ack:false});
}
});

router.get('/get_reject_list', function(req, res, next){
  var query="SELECT c.*,cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id= c.cl_id WHERE is_reject= 1 ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json(results);
    }
  });
})

router.post('/is_approved', function(req, res, next){
  if(req.body.credit_id !=null){
  var query="UPDATE tbl_credit_list SET is_approved= 1 WHERE credit_id= '"+req.body.credit_id+"' ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json({ack:true});
    }
  });
}else{
  res.json({ack:false});
}
});

router.get('/get_approved_list', function(req, res, next){
  var query="SELECT c.*,cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id= c.cl_id WHERE is_approved= 1 ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json(results);
    }
  });
})


// FOR MANAGER DASHBOARD

router.get('/get_total_credit', function(req, res, next){
  var query="SELECT SUM(approve_amount) AS total, SUM(balance_amount) AS total1, SUM(pay_amount) AS total2 FROM tbl_credit_list ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json(results);
    }
  });
})

router.get('/get_approver_reports', function(req, res, next){
  var query ="SELECT SUM(approve_amount) as result, SUM(pay_amount) as result1, SUM(balance_amount) as result2,approver_name FROM tbl_credit_list WHERE is_approved = 1 AND approver_name= 'supriya pawar' GROUP BY approver_name ";
  console.log(query);
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      console.log(results);
    }
  })
})


module.exports = router;
