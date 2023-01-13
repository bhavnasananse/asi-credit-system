var express = require('express');
var router = express.Router();
var connection = require('../config/config');

router.post('/add_followup', function(req, res, next) {
    if(req.body.date != null){
      var query="insert into tbl_followup(cl_id,date,time,next_date,comment) values('"+req.body.cl_id+"','"+req.body.date+"','"+req.body.time+"','"+req.body.next_date+"','"+req.body.comment+"')";
      console.log(query);
      connection.query(query, function(err, results, fields){
        if(err){
          res.json({ack:false , discription:err.sqlMessage});
        }else{
            res.json({ack: true});
          }
        });
}else{
    res.json({ack:false});
}
})

router.get('/get_followup', function(req, res, next) {
      var query="SELECT f.*,c.cl_id,c_name FROM tbl_followup as f JOIN tbl_customer_list as c ON c.cl_id = f.cl_id";
      console.log(query);
      connection.query(query, function(err, results, fields){
        if(err){
          res.json({ack:false , discription:err.sqlMessage});
        }else{
            res.json(results);
          }
        });
})

router.get('/get_todays_followup', function(req, res, next) {
  var query="SELECT f.*,c.cl_id,c_name FROM tbl_followup as f JOIN tbl_customer_list as c ON c.cl_id = f.cl_id  WHERE DATE(date) = CURDATE() OR DATE(next_date) = CURDATE() ";
  console.log(query);
  connection.query(query, function(err, results, fields){
    if(err){
      res.json({ack:false , discription:err.sqlMessage});
    }else{
        res.json(results);
      }
    });
})

module.exports = router;
