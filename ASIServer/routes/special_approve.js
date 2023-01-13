var express = require('express');
var router = express.Router();
var connection = require('../config/config');

router.post('/add_special_approval', function(req, res, next) {
  if(req.body.require_credit != null){
    var query="insert into tbl_special_approval(c_id,cl_id,car_no,require_credit, advisor_name, invoice_no, comment) values('"+req.body.c_id+"','"+req.body.cl_id+"','"+req.body.car_no+"','"+req.body.require_credit+"','"+req.body.invoice_no+"','"+req.body.advisor_name+"','"+req.body.comment+"')";
    console.log(query);
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
               res.json({ack:true});                     
            }
        });
  }else{
    res.json({ack:false , discription:err.sqlMessage});
  }
});

router.post('/is_approve', function(req,res,next){
  if(req.body.s_id !=null){
    var query ="UPDATE tbl_special_approval SET is_approve = 1";
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false, discription:err.sqlMessage})
      }else{
        res.json({ack:true});
      }
    })
  }else{
    res.json({ack:false, discription:err.sqlMessage})

  }
})

router.get('/get_special_approval_list', function(req,res,next){
    var query="SELECT s.*,c.c_name,c.c_id FROM tbl_special_approval as s JOIN tbl_customer_list as c ON c.cl_id= s.cl_id";
    connection.query(query, function(err, results, fields){
        if(err){
          res.json({ack:false , discription:err.sqlMessage});
        }else{
            res.json(results);
          }
    });
})

router.post('/add_payment', function (req, res, next) {
  var payamount = 0; 
  payamount = parseInt(req.body.pay_amount) //new value
  var query = "select * from tbl_special_approval where s_id = '"+req.body.s_id+"' ";
  connection.query(query, function (err, rows, field) {
      if (err) res.json([]);
      else {
          payamount += rows[0].pay_amount; //new value + old value
          var balance_amount = rows[0].require_credit - payamount; //balance_amount          
          var query1 = "UPDATE tbl_special_approval SET pay_amount = '" + payamount + "',balance_amount='" + balance_amount + "' where s_id = '" + rows[0].s_id + "'"
          connection.query(query1, function (uerr, urows, field) {
              if (uerr) res.json([]);
              else {
                  rows[0].pay_amount = payamount;
                  rows[0].balance_amount = balance_amount;
                  res.json({ack:true});
                }
          });
      }
  })
});


module.exports = router;
