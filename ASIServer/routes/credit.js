var express = require('express');
var router = express.Router();
var connection = require('../config/config');

router.post('/add_credit', function(req, res, next) {
    if(req.body.require_credit != null && req.body.invoice_no!= null){
      var query="insert into tbl_credit_list(c_id,cl_id,car_no,require_credit, invoice_no,approver_name,due_date, invoice_amount, comment) values('"+req.body.c_id+"','"+req.body.cl_id+"','"+req.body.car_no+"','"+req.body.require_credit+"','"+req.body.invoice_no+"','"+req.body.approver_name+"','"+req.body.due_date+"','"+req.body.invoice_amount+"','"+req.body.comment+"')";
      console.log(query);
      connection.query(query, function(err, results, fields){
        if(err){
          res.json({ack:false , discription:err.sqlMessage});
        }else{
            res.json({ack: true});
          }
        });
}
})

router.get('/get_credit_list', function(req, res, next) {
    // var query="SELECT cl.*, c.c_type ,custlist.c_name FROM tbl_credit_list as cl JOIN tbl_customer as c ON c.c_id = cl.c_id JOIN tbl_customer_list as custlist ON custlist.cl_id= cl.cl_id ";
    var query ="SELECT cl.*,c.c_id,c_name,c.car_no FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id where is_credit_deleted=0 and is_reject = 0 and is_approved = 0 " ;
    // var query ="SELECT cl.*, c.c_id,c_name,c.car_no,m.approve_amount,m.credit_id FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id JOIN tbl_manager as m ON m.credit_id=cl.credit_id where is_credit_deleted=0 ";
  // console.log(query);
   connection.query(query, function(err, results, fields){
       if(err){
         res.json({ack:false , discription:err.sqlMessage});
       }else{
         res.json(results);
       }
       });
 });
 
 router.post('/update_credit', function(req, res, next){
  if(req.body.credit_id !=null){
  var query="UPDATE tbl_credit_list SET c_id='"+req.body.c_id+"',cl_id= '"+req.body.cl_id+"',car_no= '"+req.body.car_no+"', require_credit= '"+req.body.require_credit+"', invoice_no= '"+req.body.invoice_no+"',approver_name='"+req.body.approver_name+"',due_date= '"+req.body.due_date+"', invoice_amount= '"+req.body.invoice_amount+"', comment= '"+req.body.comment+"' WHERE credit_id= '"+req.body.credit_id+"' ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json({ack:true});
      console.log(results)
    }
  });
}else{
  res.json({ack:false});
}
});

router.post('/delete_credit', function(req, res, next){
  if(req.body.credit_id !=null){
  var query = "UPDATE tbl_credit_list SET is_credit_deleted = 1 WHERE credit_id='"+req.body.credit_id+"' ";
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
})

router.get('/cname',function(req, res, next){
  var query="select cl_id,c_name,c_id,car_no from tbl_customer_list where is_deleted=0 ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json(results);
    }
  });
});
router.get('/ctype',function(req, res, next){
  var query="select c_type,c_id from tbl_customer where is_customer_deleted=0";
  // var query ="SELECT c.c_id,cl.c_type from tbl_customer_list as c JOIN tbl_customer as cl ON cl.c_id = c.c_id";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json(results);
    }
  });
});

router.get('/role_type',function(req, res, next){
  var query="SELECT CONCAT(firstname,' ',lastname) AS name,id FROM tbl_user WHERE r_id= 3";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json(results);
    }
  });
});




// FOR TABLE CREDIT APPROVAL ONLY

router.get('/get_credit_approval',function(req, res, next){
  var query ="SELECT cl.*,c.c_id,c_name FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id where is_credit_deleted=0 and is_reject = 0 and is_approved = 1 " ;
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
      res.json(results);
    }
  });
});

module.exports = router;
