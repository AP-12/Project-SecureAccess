const express=require('express');
require('./database');
const Schema=require('./schema');
const path=require('path');
const bcrypt=require('bcrypt');
const staticPath=path.join(__dirname,'Public');
const app=express();
app.set('view engine','ejs');
app.use(express.static(staticPath));
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.render("login");
});
app.get('/register',(req,resp)=>{
    const r= "Not registered";
    resp.render('register',{r:r});
});
app.get('/sucess',(req,resp)=>{
    resp.render('sucess');
});
app.get('/Profile',(req,resp)=>{
    resp.render('Profile');
});

app.post('/register',async(req,resp)=>{
            const hashPassword=await bcrypt.hash(req.body.pass,10);
            const insertUser=new Schema({FirstName:req.body.fname,
                LastName :req.body.lname,
                Username :req.body.uname,
                Password :hashPassword, 
                Email :req.body.email,
                MobileNo:req.body.mno });
            await insertUser.save();
           
    resp.render('sucess');
});

const verifyuser=async function(req,resp){
      const{Email,Password}=req.body;
      const user2=await Schema.findOne({Email:Email});
     
      if(user2!=null){
        const isMatch=await bcrypt.compare(Password,user2.Password)
    if(user2.Email && isMatch){
        const first=user2.Username;
     const Contact=user2.MobileNo;
        resp.render('Profile',{email:Email,first:first,Contact:Contact});
    }
    else{
        const m="Email or Password already exist"
       resp.redirect('/');
    }
}
else{ const r= "Not registered";
    resp.render('register',{r:r}) 
}}
      
app.post('/',verifyuser,async(req,resp)=>{
});

app.listen(4800);
