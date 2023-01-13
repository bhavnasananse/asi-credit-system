var express = require('express');
var router = express.Router();
var connection = require('../config/config');

router.get('/get_credit_details', function(req, res, next){
    var query="SELECT cl.*, c.c_name FROM tbl_credit_list as cl JOIN tbl_customer_list as c ON c.cl_id = cl.cl_id WHERE is_credit_deleted= 0";
    connection.query(query, function(err, rows, fields){
        if(err)res.json([]);
        else{
            res.json(rows);
        }
    })
})

module.exports = router;
