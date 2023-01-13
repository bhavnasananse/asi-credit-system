var express = require('express');
var router = express.Router();
var connection = require('../config/config');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/add_payment_mode', function(req, res, next) {
    if(req.body.mode_name != null ){
      var query="insert into tbl_payment_mode(mode_name) values('"+req.body.mode_name+"')";
      console.log(query);
      connection.query(query, function(err, results, fields){
        if(err){
          res.json({ack:false , discription:err.sqlMessage});
        }else{
            res.json({ack: true});
          }
        });
    }else{
            res.json({ack:false, discription:'missing argument'});
          }  
    }); 
    
    router.get('/payment_mode', function(req, res, next) {
    var query ="select * from tbl_payment_mode where is_deleted = 0 ";
      console.log(query);
        connection.query(query, function(err, results, fields){
          if(err){
            res.json({ack:false , discription:err.sqlMessage});
          }else{
            res.json(results);        
          }
          });
        }
      ); 

router.post('/update_payment_mode', function(req, res, next){
  if(req.body.p_id !=null){
    var query="UPDATE tbl_payment_mode SET mode_name ='"+req.body.mode_name+"' WHERE p_id='"+req.body.p_id+"'";
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
        // if(results.affectedRows>0) res.json({ack: true});
        // else res.json({ack:false, discription: 'invalid id'});
        res.json({ack:true});
      }
    })
  }else{
    res.json({ack:false});
  }
})

router.post('/delete_payment_mode', function(req, res, next){
  if(req.body.p_id !=null){
  var query = "UPDATE tbl_payment_mode SET is_deleted = 1 WHERE p_id='"+req.body.p_id+"'";
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
