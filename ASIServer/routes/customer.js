var express = require('express');
var router = express.Router();
var connection = require('../config/config');

//SERVICES FOR CUSTOMER TABLE

router.post('/customer_type_add', function(req, res, next){
  if(req.body.c_type != null){
    var query="insert into tbl_customer(c_type) values('"+req.body.c_type+"')";
    console.log(query);
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
          res.json({ack:true});
        }
      });
  }else{
          res.json({ack:false, discription:'missing argument'});
        }  
});
router.get('/customer_type_get', function(req, res, next) {
  var query="select * from tbl_customer where is_customer_deleted= 0";
    connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
        res.json(results);
      }
      });
});
router.post('/customer_type_update',function(req, res,next){
    if(req.body.c_id !=null){
    var query="UPDATE tbl_customer SET c_type ='"+req.body.c_type+"' WHERE c_id='"+req.body.c_id+"' ";
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


router.post('/customer_type_delete', function(req, res, next){
  if(req.body.c_id !=null){
  var query = "UPDATE tbl_customer SET is_customer_deleted = 1 WHERE c_id='"+req.body.c_id+"'";
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


router.post('/add_customer', function(req, res, next){
  if(req.body.c_id != null && req.body.c_name != null && req.body.car_no != null  && req.body.contact_no != null  && req.body.contact_person != null  && req.body.contact_person_no != null  && req.body.location != null  && req.body.GSTN != null && req.body.credit_amount != null && req.body.GSTN != null && req.body.credit_days != null){
    var query="insert into tbl_customer_list(c_id,c_name,car_no,contact_no,contact_person,contact_person_no,location,GSTN, credit_amount, credit_days, comment) values('"+req.body.c_id+"','"+req.body.c_name+"','"+req.body.car_no+"', '"+req.body.contact_no+"','"+req.body.contact_person+"','"+req.body.contact_person_no+"','"+req.body.location+"','"+req.body.GSTN+"','"+req.body.credit_amount+"','"+req.body.credit_days+"','"+req.body.comment+"')";
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

router.get('/get_customer', function(req, res, next) {
  //  var query="SELECT cl.*,c.c_type, cr.balance_amount,pay_amount FROM tbl_customer as c JOIN tbl_customer_list as cl ON c.c_id = cl.c_id JOIN tbl_credit_list as cr ON cl.cl_id =cr.cl_id WHERE is_customer_deleted=0 and is_deleted=0 and is_default=0 and is_credit_deleted=0";
  // var  query ="select * from tbl_customer_list where is_deleted = 0";
   var query="SELECT cl.*,c.c_type FROM tbl_customer as c JOIN tbl_customer_list as cl ON c.c_id = cl.c_id WHERE is_customer_deleted=0 and is_deleted=0 and is_default=0 ";
   connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
        res.json(results);
      }
      });
});

router.post('/get_cust_details', function(req, res, next) {
   var query="SELECT cl.balance_amount,cl.pay_amount,cl.cl_id, c.cl_id FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id WHERE c.cl_id = '"+req.body.cl_id+"' ";
   console.log(query)
   connection.query(query, function(err, results, fields){
      if(err){
        res.json({ack:false , discription:err.sqlMessage});
      }else{
        res.json(results);
      }
      });
});

router.post('/update_customer', function(req, res, next){
  if(req.body.cl_id != null){
  var query ="UPDATE tbl_customer_list SET c_id='"+req.body.c_id+"',c_name='"+req.body.c_name+"',car_no= '"+req.body.car_no+"',contact_no='"+req.body.contact_no+"',contact_person='"+req.body.contact_person+"',contact_person_no='"+req.body.contact_person_no+"',location='"+req.body.location+"',GSTN='"+req.body.GSTN+"', credit_amount='"+req.body.credit_amount+"', credit_days='"+req.body.credit_days+"', comment='"+req.body.comment+"' WHERE cl_id= '"+req.body.cl_id+"' ";
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

router.post('/delete_customer', function(req, res, next){
  if(req.body.cl_id !=null){
  var query = "UPDATE tbl_customer_list SET is_deleted = 1 WHERE cl_id='"+req.body.cl_id+"' ";
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

router.post('/set_is_default', function(req, res, next){
  if(req.body.cl_id != null){
  var query ="UPDATE tbl_customer_list SET is_default= 1 WHERE cl_id= '"+req.body.cl_id+"' ";
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

router.post('/set_non_default', function(req, res, next){
  if(req.body.cl_id != null){
  var query ="UPDATE tbl_customer_list SET is_default= 0 WHERE cl_id= '"+req.body.cl_id+"' ";
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

router.get('/get_default_list', function(req, res, next) {
  var query="SELECT cl.*,c.c_type FROM tbl_customer as c JOIN tbl_customer_list as cl ON c.c_id = cl.c_id WHERE is_customer_deleted=0 and is_deleted=0 and is_default=1";
 connection.query(query, function(err, results, fields){
     if(err){
       res.json({ack:false , discription:err.sqlMessage});
     }else{
       res.json(results);
     }
     });
});

// router.get('/get_customer_detail', function(req, res, next) {
//    var query="SELECT cl.*,c.c_type, cr.balance_amount,pay_amount FROM tbl_customer as c JOIN tbl_customer_list as cl ON c.c_id = cl.c_id JOIN tbl_credit_list as cr ON cl.cl_id =cr.cl_id WHERE is_customer_deleted=0 and is_deleted=0 and is_default=0 and is_credit_deleted=0";
//   // var  query ="select * from tbl_customer_list where is_deleted = 0";
//    connection.query(query, function(err, results, fields){
//       if(err){
//         res.json({ack:false , discription:err.sqlMessage});
//       }else{
//         res.json(results);
//       }
//       });
// });

module.exports = router;
