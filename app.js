const express = require("express");
	const mongoose = require("mongoose");
	const bodyParser = require("body-parser");
  const methodOverride= require('method-override') 
const User = require("./model/User");
const admin= require('./model/admin');
const adm= require('./model/postj')
const path= require('path');
let app = express();
mongoose.connect("mongodb://127.0.0.1:27017/JobPortal");
app.use(express.static('public'));
app.use(express.static('images'));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));



/* -------------------------------> rendering code for all pages <--------------------- */
app.get("/", function (req, res) {
	res.render("home");
});

app.get('/student/studentregister', (req, res) => {
  res.render(path.join(__dirname, 'views', 'student', 'studentregister'));
});
app.get("/compony/adminlogin", function (req, res) {
	res.render(path.join(__dirname,'views','compony','adminlogin'));
});
app.get('/compony/adminregister',function(req,res){
res.render(path.join(__dirname,'views','compony','adminregister'))
})
app.get("/student/studentlogin", function (req, res) {
	res.render(path.join(__dirname,'views','student','studentlogin'));
});
app.get('/postjob',function(req,res){
  res.render(path.join(__dirname,'views','compony','postjob'))
  })

app.get('/jobproviderdash',(req,res)=>{
  res.render(path.join(__dirname,'views','compony','jobproviderdash'))
})

app.get('/currentdrive',async (req, res) => {
  adm.find({})
  .then((x) => {
    res.render(path.join(__dirname, 'views', 'compony', 'currentdrives'),{x});
   
  }).catch(error => {
    console.error(error);
    res.status(500).send('Internal Server Error');
  });
});

app.get('/editpostedjob/:id', (req,res)=>{
  let readquery= req.params.id;
  adm.findOne({ctc: readquery})
  .then((x)=>{
    console.log(x);
    res.render(path.join(__dirname,'views','compony','editpostedjob'),{x})
  })
  
})

app.put('/editpostedjob/:id',(req,res)=>{
  let readquery= req.params.id;
  adm.updateOne({ctc: readquery},{
    $set:{
      componyname:req.body.componyname,
      jobdescription: req.body.jobdescription,
      ctc: req.body.ctc,
      eligibilitycriteria: req.body.eligibilitycriteria,
      role: req.body.role,
      Qualification: req.body.Qualification,
    }
  }).then((x)=>{
   res.render(path.join(__dirname,'views','compony','jobproviderdash'))
  }).catch((error)=>{
    console.log(error);
  })
})




/* -------------------------------> student register code <------------------------ */
app.post("/register", async (req, res) => {
        try {
          const user = await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            aboutyourself: req.body.aboutyourself,
            date: req.body.date,
            age: req.body.age,
            date1: req.body.date1,
            Qualification: req.body.Qualification,
            password: req.body.password,
            cpassword: req.body.cpassword,
            phone: req.body.phone,
            address: req.body.address,
           
          });
     
          console.log(user);
          return res.status(200).render(path.join(__dirname,'views','student','studentdashboard'));
        } catch (error) {
          console.log("Unexpected error:", error.message);
        return res.status(500).json({ error: "User with same email is already exist" });
        }
      });

      
      

/* ------------------------> admin register <--------------------------------- */
app.post('/adminregister', async function(req,res){
        try{
    const adminreg= await admin.create({
      name: req.body.name,
      designation:req.body.designation,
      website:req.body.website,
      email:req.body.email,
      roles:req.body.roles,
      password:req.body.password,
      cpassword:req.body.cpassword,
      phone:req.body.phone,
      country:req.body.country,
     })
     console.log(adminreg);
          return res.status(200).render(path.join(__dirname,'views','compony','jobproviderdash'));
        }
        catch(error){
          console.log("Unexpected error:", error.message);
          return res.status(500).json({ error: "User with same email is already exist" });
        }
      });

/* ------------------------ student login code ----------------------------- */
app.post("/studentlog", async function(req, res){
	try {
		// check if the user exists
		const user = await User.findOne({ email: req.body.email});
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			res.render(path.join(__dirname,'views','student','studentdashboard'));
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});




/* -------------------------- ---  admin login code --------------------------- */
app.post("/login", async function(req, res){
	try {
		// check if the user exists
		const user = await admin.findOne({ email: req.body.email});
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			res.render(path.join(__dirname,'views','compony','jobproviderdash'));
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

/* -----------------------> admin logout code <---------------------------- */

app.get('/logout', function (req, res) {
  req.session.destroy(function(error){
    if(error){
      console.log(error);
      res.send("error");
    }
    else{
      res.render('jobproviderdash');
    }
  })
});




/* ---------------------------------> post job code -------------------------------- */
app.post('/create', async (req,res)=>{
  try{
      const user = await adm.create({
    componyname:req.body.componyname,
   
    jobdescription:req.body.jobdescription,
   ctc:req.body.ctc,
   eligibilitycriteria:req.body.eligibilitycriteria,
   role:req.body.role,
   Qualification:req.body.Qualification,
      });
      return res.status(200).render(path.join(__dirname,'views','compony','jobaddedsuccess'));  
  }
  catch(error){
      console.log("Unexpected error:", error.message);
      return res.status(500).json({ error: "User with same email is already exist" });
  }
});


let port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log("Server Has Started!");
})  ;