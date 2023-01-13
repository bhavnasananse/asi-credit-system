var express = require('express')
var router = express.Router();
var connection = require('../config/config');


router.post('/get_pending_report', function(req, res, next){
    var days = parseInt(req.body.id)
    var query="SELECT c.*, cl.c_name FROM tbl_credit_list as c JOIN tbl_customer_list as cl ON cl.cl_id = c.cl_id WHERE  pay_amount = 0 AND is_approved = 1 AND  is_reject = 0 AND due_date >= NOW() - INTERVAL '"+days+"' DAY "
    console.log(query);
    connection.query(query, function(err, results,fields){
      if(err) res.json({ack: false , discription : err.sqlMessage});
      else{
        res.json(results);
      }
    })
  })

  

module.exports = router;
