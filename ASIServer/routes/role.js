var express = require('express');
var md5 = require('md5');

var router = express.Router();
var connection = require('../config/config');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.post('/add_role', function(req, res, next){
  if(req.body.role != null){
    var query="insert into tbl_role(role) values('"+req.body.role+"')";
    console.log(query);
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
          res.json({ack: true});
        }
      });
  }else res.json({ack:false, discription:'missing argument'});  
});

router.get('/role', function(req, res, next) {
  var query="select * from tbl_role where is_deleted = 0 ";
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
        res.json(results);
      }
      });
});

router.post('/update_role', function(req, res, next){
  if(req.body.r_id !=null){
  var query="UPDATE tbl_role SET role ='"+req.body.role+"' WHERE r_id='"+req.body.r_id+"' ";
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

router.post('/delete_role', function(req, res, next){
  if(req.body.r_id !=null){
  var query = "UPDATE tbl_role SET is_deleted = 1 WHERE r_id='"+req.body.r_id+"'";
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

  


module.exports = router;



