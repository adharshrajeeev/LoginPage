var express = require('express');
const { response, resource } = require('../app');
var router = express.Router();
const userHelpers=require('../helpers/user-helpers');
const { use } = require('./admin');


//----------------------------------HOME PAGE ROUTE --------------------
/* GET home page. */
router.get('/',function(req,res,next){
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
  );
  let user=req.session.user
  //console.log(user)
  res.render('home-page',{user})
})

//-----------------SIGNUP PAGE ROUTING-----------------------------

router.get('/signup', function(req, res) {
  res.render('signup');
})


router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    if(response.status==false){
      console.log(response);
      res.render('signup',{"emailError":"User Already Exists"})
    }else
    {
      res.redirect('/signup')
    }
  })
})

//---------------------SIGNUP PAGE ROUTING ENDS HERE-----------------------

router.get('/userlogin',(req,res)=>{
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  if(req.session.loggedIn){
    res.redirect('/')
  }else{

    res.render('login-page',{"loginError":req.session.loginError})
    req.session.loginError=false
  }

})

router.post('/userlogin',(req,res)=>{
  // res.header(
  //   "Cache-Control",
  //   "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
  // );
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }
    else{
      req.session.loginError="invalid login id or password"
      res.redirect('/userlogin')
    }
  })
})


router.get('/logoutuser',(req,res)=>{
  console.log('1');
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
  );
  req.session.user=false;
  req.session.loggedIn=false
  res.redirect('/');
})


module.exports = router;
