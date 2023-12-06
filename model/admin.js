const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const passportLocalMongoose= require('passport-local-mongoose');
var admin= new Schema({
    name:{
        type: String,
        require:true
    },
    designation:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    roles:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    cpassword :{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true,
    },
})
admin.plugin(passportLocalMongoose);
module.exports= mongoose.model('admin',admin);