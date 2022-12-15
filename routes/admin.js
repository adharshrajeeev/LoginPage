var express = require('express');
const { response } = require('../app');
var router = express.Router();
const homeHelpers=require('../helpers/user-helpers')
const userHelpers=require('../helpers/userdetails-helpers');


const emailid="admin@gmail.com";
const passwordId="12345"

/* GET users listing. */
//------------------------------------------------ADMIN FIRST LOGIN PAGE SHOWS HERE-----------------------------------
router.get('/', function(req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
  );
  let admin1=req.session.admin
  if(admin1){
    res.redirect('/admin/adminlogin')
  }
  else{
    console.log(admin1);
    res.render('admin-login',{"adminLoginError":req.session.adminLoginError})
    req.session.adminLoginError=false
  }
  
});///////////////////---------------------------ADMIN LOGIN PAGE ENDS HERE-----------------------------


//---------------------------------ADMIN HOME-USER LIST SHOWS HERE--------------------------------

router.get('/adminlogin',(req,res)=>{
  let adminId=req.session.admin
  console.log(adminId)
  if(adminId){
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    userHelpers.getAllUsers().then((userdetails)=>{
      console.log(userdetails);
      res.render('admin-home',{userdetails})
    })
  }else{
    console.log("error")
    res.redirect('/admin')
  }
  
  
})

router.post('/adminlogin',(req,res)=>{

  const adminData={email,password}=req.body;
  if(emailid===email && passwordId===password){
    
    req.session.admin=adminData
    res.redirect('/admin/adminlogin') 
  }else{
    req.session.adminLoginError="invalid admin id or password"
    console.log("error")
    res.redirect('/admin');
   
  }

})///////////////////////////////////--------------ADMIN HOME-USER LIST SHOWS ENDS HERE----------------------------------------------------------------



//-------------------------------------------------------------ADMIN USER UPDATE/EDIT FORMS ---------------------------------------------
router.get('/edit-user/:id',async(req,res)=>{
  let adminId=req.session.admin
  if(adminId){
    let userdetails=await userHelpers.getUserDetails(req.params.id)
    console.log(userdetails);
      res.render('admin-editUser',{userdetails})
  }else{
    res.render('admin-login')
  }
 
})

router.post('/admin-editUser/:id',(req,res)=>{
  userHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin/adminlogin')
  })

})//////////////////////////////////////////////------------------ADMIN EDIT FORMS ENDS HERE-------------------------------------


//------------------------------------------------------ADMIN DELET USER FORMS STARTS HERE-----------------------------------
router.get('/delete-user/:id',(req,res)=>{
  let userId=req.params.id
  console.log(userId);
  userHelpers.deleteUser(userId).then((response)=>{
    res.redirect('/admin/adminlogin')
  })
 
})//////////////////////////////////////////////----------------ADMIN DELETE FORMS ENDS HERE


//---------------ADMIN USER ADD DETAILS STARTS HERE------------------------------
router.get('/adminAddForm',(req,res)=>{
  let adminId=req.session.admin
  if(adminId){
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
    );
    res.render('admin-adForm')
  }else{
    res.redirect('/admin')
  }
 
})

// router.post('/adminAddForm',(req,res)=>{
//   res.redirect('/admin/adminAddForm')
// })


router.post('/adminUserForm',(req,res)=>{
  let adminId=req.session.admin
  if(adminId){
    homeHelpers.doSignup(req.body).then((response)=>{
      if(response.status==false){
        res.render('admin-adform',{'emailError':"User Already Exists"})
      }
      else{
        console.log(response);
        res.redirect('/admin/adminlogin')
      }
     
    })
  }else{
    res.redirect('/admin')
  }
 
})//-//////////////////////////////////////////////--ADMIN USER ADDING FORMS ENDS HERE--------------------------

router.get('/logout',function(req,res){
  console.log('kkkkkkkkkkkkkkkkkkk');
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
  );

  req.session.admin=false
  res.redirect('/admin')
})///////////////////////////////////-----------------ADMIN LOGOUT ENDS HERE---------------------------------------------------------



module.exports = router;
