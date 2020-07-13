const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));//css file wagera access nhi hota localhost3000 pe isliye css bootsatrp ko public
app.use(bodyParser.urlencoded({extended:true}));
app.listen(process.env.PORT || 3000,function(){ //for heroku and 3000 is for local host
  console.log("running server good");
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  var first=req.body.fname;
  var last=req.body.lname;
  var email=req.body.ename;
//  console.log(first,last,email);
var data={
  members: [
    {
      email_address:email, //memebers is an array of obj(jsom)
      status:"subscribed",
      merge_fields: {
        FNAME:first,
        LNAME:last
      }
    }

    //{} for inserting more than one
  ]
};
  var jsonData=JSON.stringify(data);//onject kko convert ke liye
var options ={
  url:"https://us8.api.mailchimp.com/3.0/lists/960789dd70",
  method:"POST",
  headers:{
    "Authorization":"Riya 7f296dfb6e2049110eb9cf94a57f45d0-us8"//authorisation ke liye name (koi bhi string) and then api key
  },
  body:jsonData //for sending data( comment this line when we need to see failure  part )
};
request(options,function(error,response,body){
  if(error){
    //console.log(error);
//res.send("erroer....");
res.sendFile(__dirname+"/failure.html");
  }
  else{
    if(response.statusCode===200){
      //res.send("successfully subscribed");
     res.sendFile(__dirname+"/success.html");
    }else{
      //res.send("erroer....");
      res.sendFile(__dirname+"/failure.html");
    }

  }
});
});
app.post("/fai",function(req,res){
  res.redirect("/");//redirect to main page
});
//7f296dfb6e2049110eb9cf94a57f45d0-us8 api key
//960789dd70//list key profile mei jaa ke audeince mei then settings mei jaake audeince name and defaults mei jaa ke copy
