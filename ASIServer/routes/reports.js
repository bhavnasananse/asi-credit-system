var express = require('express')
var router = express.Router();
var connection = require('../config/config');

// FOR CUSTOMER REPORTS
router.post('/get_list', function(req, res, next) {
    var date1 = Date;
    var date2 = Date;
    var query ="SELECT cl.*,c.c_id,c_name FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id WHERE cl.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND cl.c_id='"+req.body.c_id+"' AND is_approved = 1 AND is_credit_deleted=0 AND is_reject = 0 " ;
  console.log(query);
   connection.query(query, function(err, results, fields){
       if(err){
         res.json({ack:false , discription:err.sqlMessage});
       }else{
         res.json(results);
       }
    });
 });

 router.post('/get_outstanding_list', function(req, res, next) {
  var date1 = Date;
  var date2 = Date;
  var query ="SELECT cl.*,c.c_id,c_name FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id WHERE cl.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND cl.c_id='"+req.body.c_id+"' AND balance_amount > 0 AND is_approved = 1 AND is_credit_deleted=0 AND is_reject = 0 " ;
console.log(query);
 connection.query(query, function(err, results, fields){
     if(err){
       res.json({ack:false , discription:err.sqlMessage});
     }else{
       res.json(results);
     }
  });
});

router.post('/get_recovery_list', function(req, res, next) {
  var date1 = Date;
  var date2 = Date;
  var query ="SELECT cl.*,c.c_id,c_name FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id WHERE cl.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND pay_amount > 0 AND cl.c_id='"+req.body.c_id+"' AND is_approved = 1 AND is_credit_deleted=0 AND is_reject = 0 " ;
console.log(query);
 connection.query(query, function(err, results, fields){
     if(err){
       res.json({ack:false , discription:err.sqlMessage});
     }else{
       res.json(results);       
     }
  });
});

//FOR SPECIAL APPROVAL REPORTS

router.post('/get_special_list', function(req, res, next) {
  var date1 = Date;
  var date2 = Date;
  var query ="SELECT s.*,c.c_id,c_name, cr.* FROM tbl_special_approval as s JOIN tbl_customer_list as c ON c.cl_id = s.cl_id JOIN tbl_credit_list as cr ON cr.cl_id = s.cl_id WHERE cr.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' " ;
  console.log(query);
  connection.query(query, function(err, results, fields){
     if(err){
       res.json({ack:false , discription:err.sqlMessage});
     }else{
       res.json(results);
     }
  });
});

// FOR SERVICE ADVISOR ONLY

router.get('/get_advisor_list', function(req, res, next){
  var query ="SELECT CONCAT(firstname,' ',lastname)AS name,id,r_id FROM tbl_user WHERE r_id = 4 AND is_user_deleted= 0";
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      console.log(results);
    }
  })
})

router.post('/get_approver_reports', function(req, res, next){
  var query ="SELECT c.*,cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id = c.cl_id WHERE due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND approver_name= '"+req.body.approver_name+"' AND is_approved = 1 GROUP BY approver_name ";
  console.log(query);
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      console.log(results);
    }
  })
})

router.post('/get_approver_outstanding_reports', function(req, res, next){
  var query ="SELECT c.*,cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id = c.cl_id WHERE due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"'AND is_approved = 1 AND balance_amount > 0 AND approver_name = '"+req.body.approver_name+"' GROUP BY approver_name ";
  console.log(query);
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      console.log(results);
    }
  })
})

router.post('/get_approver_recovery_reports', function(req, res, next){
  // var date1 = Date
  // var date2 = Date
  var query ="SELECT c.*,cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id = c.cl_id WHERE due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"'AND approver_name= '"+req.body.approver_name+"' AND is_approved = 1 AND pay_amount > 0 GROUP BY approver_name ";
  console.log(query);
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      console.log(results);
    }
  })
})


// FOR MANAGER REPORTS ONLY

router.post('/get_manager_reports', function(req, res, next){
  var date1 = Date;
  var date2 = Date;
  var query ="SELECT c.*, cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id = c.cl_id WHERE approver_name='"+req.body.approver_name+"'AND c.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND is_approved = 1 AND is_credit_deleted=0";
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      // console.log(results);
    }
  })
})

// FOR CREDIT REPORTS ONLY

router.post('/get_credit_expire_reports', function(req, res, next){
  var date1 = Date;
  var date2 = Date;
  var query ="SELECT c.*, cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id = c.cl_id WHERE c.c_id = '"+req.body.c_id+"'AND c.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND is_approved = 1 AND is_credit_deleted=0 AND is_deleted = 0";
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      // console.log(results);
    }
  })
})

// FOR SPECIALLY APPROVED REPORTS 

router.post('/get_specially_approved_reports', function(req, res, next){
  var date1 = Date;
  var date2 = Date;
  var query= "SELECT s.*, c.* FROM tbl_special_approval as s JOIN tbl_customer_list as c ON c.cl_id = s.cl_id WHERE s.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"'AND s.c_id= '"+req.body.c_id+"' ";
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      // console.log(results);
    }
  })
})

router.post('/get_specially_outstanding_reports', function(req, res, next){
  var date1 = Date;
  var date2 = Date;
  var query= "SELECT s.*, c.* FROM tbl_special_approval as s JOIN tbl_customer_list as c ON c.cl_id = s.cl_id WHERE s.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND c.c_id='"+req.body.c_id+"' AND s.balance_amount > 0";
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      // console.log(results);
    }
  })
})

router.post('/get_specially_recovery_reports', function(req, res, next){
  var date1 = Date;
  var date2 = Date;
  var query= "SELECT s.*, c.* FROM tbl_special_approval as s JOIN tbl_customer_list as c ON c.cl_id = s.cl_id WHERE s.due_date BETWEEN '"+req.body.date1+"' AND '"+req.body.date2+"' AND c.c_id='"+req.body.c_id+"' AND s.pay_amount > 0";
  console.log(query);
  connection.query(query, function(err, results,fields){
    if(err) res.json([]);
    else{
      res.json(results);
      // console.log(results);
    }
  })
})
module.exports = router;