var express= require('express');
var router= express.Router();
var login=require('./user');

router.get('/',function(req,res){
    res.render('index.html')
});
router.get('/signup',function(req,res){
    res.render('signup.html');
});
router.post('/login',login.login);
router.post('/register',login.register)

module.exports=router;