var express = require('express');
var md5 = require('md5');

var router = express.Router();
var connection = require('../config/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//SERVICE FOR SIGN IN OR LOGIN  
router.post('/login', function(req, res, next) {
  if(req.body.username != null && req.body.password != null){
    var query="select id, username, password from tbl_login where username = '"+req.body.username+"'and password ='"+req.body.password+"'";
    console.log(query);
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ });
      }else{
        if(results.length == 1 && results[0].username == req.body.username && results[0].password == req.body.password){
          let obj= results[0];
          delete obj.password;
          res.json(results[0]);
        }
        else{
          res.json({ });
        }      
      }
    });
  }else{
    res.json({ });
}
});

// SERVICES FOR TABLE USER ONLY

router.post('/add_user', function(req, res, next) {
  if(req.body.firstname != null && req.body.lastname!= null  && req.body.r_id != null && req.body.credit!= null  && req.body.username != null  && req.body.password != null ){
    var query="insert into tbl_user(firstname,lastname,r_id,credit,username,password) values('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.r_id+"','"+req.body.credit+"','"+req.body.username+"','"+md5(req.body.password)+"')";
    console.log(query);
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
          res.json({ack: true});
        }
      });
  }
        else{
          res.json({ack:false, discription:'missing argument'});
        }  
  }); 
  router.get('/user', function(req, res, next) {
    // var query="SELECT CONCAT(firstname,' ',lastname) AS name,u.username,u.credit ,r.r_id, role FROM tbl_user as u JOIN tbl_role as r ON r.r_id = u.r_id WHERE is_user_deleted = 0 and is_deleted= 0 ";
    var query="SELECT u.* ,r.r_id, role FROM tbl_user as u JOIN tbl_role as r ON r.r_id = u.r_id WHERE is_user_deleted = 0 and is_deleted= 0 ";

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
  
    router.get('/roles',function(req,res,next){
      var query="select r_id, role from tbl_role where is_deleted=0";
      console.log(query);
        connection.query(query, function(err, results, fields){
          if(err){
            res.json({ack:false , discription:err.sqlMessage});
          }else{
            res.json(results);        
          }
          });
    })
  
  router.post('/update_user', function(req, res, next){
    if(req.body.id!=null){
      var query="UPDATE tbl_user SET firstname = '"+req.body.firstname+"' , lastname ='"+req.body.lastname+"',r_id='"+req.body.r_id+"',credit='"+req.body.credit+"',username='"+req.body.username+"' WHERE id= '"+req.body.id+"' ";
      console.log(query);
      connection.query(query,function(err,results,fields){
        if(err){
          res.json({ack:false , discription:err.sqlMessage});
        }else{
          res.json({ack:true});
          // if(results.affectedRows>0) res.json({ack: true});
          // else res.json({ack:false, discription: 'invalid id'});
        }
      });
    }else{
      res.json({ack:false})
    }
  });

router.post('/change_password', function(req, res, next){
  if(req.body.id!=null){
    var query="UPDATE tbl_user SET password='"+md5(req.body.password)+"' WHERE id='"+req.body.id+"'";
    console.log(query);
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{            
          if(results.affectedRows>0) res.json({ack: true});
          else res.json({ack:false, discription: 'invalid id'});
        }
    });
    }else{
    res.json({ack:false});
  }
});

router.post('/delete_user', function(req, res, next){
  if(req.body.id !=null){
  var query = "UPDATE tbl_user SET is_user_deleted = 1 WHERE id='"+req.body.id+"' ";
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
