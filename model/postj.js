const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const postj= new Schema({
    componyname:{
        type:String,
        require:true,
    },
    jobdescription:{
        type:String,
        require:true,
    },
    ctc :{
     type: String,
     require:true,
    },
    eligibilitycriteria:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        require:true,
    },
    Qualification:{
        type:String,
        require:true,
    }
})
module.exports=mongoose.model('postj',postj)