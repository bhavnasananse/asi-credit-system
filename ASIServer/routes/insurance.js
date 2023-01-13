var express = require('express');
var router = express.Router();
var connection = require('../config/config');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

//SERVICES FOR TABLE INSURANCE

router.post('/add_insurance_company', function(req, res, next){
  if(req.body.company_name != null){
    var query="insert into tbl_insurance(company_name) values('"+req.body.company_name+"')";
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

router.get('/get_insurance_company', function(req, res, next) {
    var query="select * from tbl_insurance where is_deleted = 0 ";
      connection.query(query, function(err, results, fields){
        if(err){
          res.json({ack:false , discription:err.sqlMessage});
        }else{
          res.json(results);
        }
        });
  });
  
  router.post('/update_insurance_company', function(req, res, next){
    if(req.body.i_id !=null){
    var query="UPDATE tbl_insurance SET company_name ='"+req.body.company_name+"' WHERE i_id= '"+req.body.i_id+"' ";
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
        res.json({ack:true, discription: 'record update succesfully'});
      }
    })
  }else{
    res.json({ack:false});
  }
  }) 
  
  router.post('/delete_insurance_company', function(req, res, next){
    if(req.body.i_id !=null){
    var query = "UPDATE tbl_insurance SET is_deleted = 1 WHERE i_id='"+req.body.i_id+"'";
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
