var express 	= require('express');
var employeeModel 	= require('../models/Employee');
var productModel = require('../models/product');
var router 		= express.Router();

router.get('/', function(req, res){
    if(req.session.username!=null){
        productModel.getAll(function (results){
            var data ={results:results}
            console.log(data);
            res.render('employee/index',data);
        });

    }
    else {
        res.redirect('/login');
    }

});



router.get('/addProduct',function (req,res){
    if(req.session.username!=null){

        res.render('employee/addProd');

    }
    else {
        res.redirect('/login');
    }
});

router.post('/addProduct',function (req,res){
    console.log(req.body);
    productModel.insert(req.body,function (status) {
        if(status){
            res.redirect('/employee');
        }
        else{
            res.send('Server error');
        }
    });
});



router.get('/updateProd/:id',function (req,res) {
    if(req.session.username!=null){
        productModel.get(req.params.id,function (result) {
            console.log(result);
            res.render('employee/update',result);
        });
    }else {
        res.redirect('/login');
    }
});

router.post('/updateProd/:id',function (req,res) {
    console.log(req.body);
    var product =req.body;
    product.id=req.params.id;
    productModel.update(product,function(status){
        if(status){
            res.redirect('/employee');
        }
        else{
            res.send("All fields required");
        }
    });
});

router.get('/deleteProd/:id',function (req,res) {
    if(req.session.username!=null){
        productModel.get(req.params.id,function (result) {
            console.log(result);
            res.render('employee/delete',result);
        });
    }else {
        res.redirect('/login');
    }
});

router.post('/deleteProd/:id',function (req,res) {
    var id=req.params.id;
    productModel.delete(id,function(status){
        if(status){
            res.redirect('/employee');
        }
        else{
            res.send("Server Error");
        }
    });
});


module.exports = router;
