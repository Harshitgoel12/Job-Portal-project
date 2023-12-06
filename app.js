const express = require("express");
	const mongoose = require("mongoose");
	const bodyParser = require("body-parser");
const User = require("./model/User");
const admin= require('./model/admin')
let app = express();
mongoose.connect("mongodb://127.0.0.1:27017/JobPortal");
app.use(express.static('public'));
app.use(express.static('images'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
	res.render("home");
});
app.get("/studentregister", function (req, res) {
	res.render("studentregister");
});
app.get("/adminlogin", function (req, res) {
	res.render("adminlogin");
});
app.get('/adminregister',function(req,res){
res.render("adminregister")
})
// student register code
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
          return res.status(200).json(user);
        } catch (error) {
          console.log("Unexpected error:", error.message);
        return res.status(500).json({ error: "User with same email is already exist" });
        }
      });


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
          return res.status(200).json(adminreg);
        }
        catch(error){
          console.log("Unexpected error:", error.message);
          return res.status(500).json({ error: "User with same email is already exist" });
        }
      });

// student login code
app.get("/adminlogin", function (req, res) {
	res.render("adminlogin");
});

//Handling user login
app.post("/login", async function(req, res){
	try {
		// check if the user exists
		const user = await admin.findOne({ email: req.body.email});
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			res.render("home");
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

let port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log("Server Has Started!");
});