var express = require('express');
var router = express.Router();
var connection = require('../config/config');

// router.post('/set_payment_status', function(req,res, next){
//     var query="select * from tbl_credit_list where credit_id='"+req.body.credit_id+"'";
//     connection.query(query, function(err, rows, field){
//         if (err) res.json([]);
//         else{
//             if(rows[0].balance_amount == 0){
//                 var query1 = "UPDATE tbl_credit_list SET payment_status = 1 where credit_id = '" + rows[0].credit_id + "'";
//                 connection.query(query1, function (uerr, urows, field) {
//                     if (uerr) res.json([]);
//                     else {
//                         res.json({ack:true});
//                     }
//                 });
//             }            
//         }
//     })
// })

// router.get('/get_list_complete', function(req,res,next){
//     var query="select cl.*, c.c_name from tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id= cl.cl_id where payment_status = 1 and is_approved= 1 and is_credit_deleted=0 and is_reject=0 ";
//     connection.query(query, function(err, rows, field){
//         if(err)res.json([]);
//         else{
//             res.json(rows);
//         }
//     })
// })

// router.get('/get_list_pending', function(req,res,next){
//     var query="select cl.*, c.c_name from tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id= cl.cl_id where payment_status = 0 and is_approved= 1 and is_credit_deleted=0 and is_reject=0 ";
//     connection.query(query, function(err, rows, field){
//         if(err)res.json([]);
//         else{
//             res.json(rows);
//         }
//     })
// })

    router.get('/get_list_pending', function(req,res,next){
        var query="select cl.*, c.c_name from tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id= cl.cl_id where balance_amount > 0 and is_approved= 1 and is_credit_deleted=0 and is_reject=0 ";
        connection.query(query, function(err, rows, field){
            if(err)res.json([]);
            else{
                res.json(rows);
            }
        })
    })

    router.get('/get_list_complete', function(req,res,next){
        var query="select cl.*, c.c_name from tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id= cl.cl_id where balance_amount = 0  and is_approved= 1 and is_credit_deleted=0 and is_reject=0 ";
        connection.query(query, function(err, rows, field){
            if(err)res.json([]);
            else{
                res.json(rows);
            }
        })
    })
module.exports = router;
