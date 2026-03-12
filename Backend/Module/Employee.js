const mongoose=require('mongoose')
const employee=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    department:{
        type:String
    },
    salary:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
module.exports=mongoose.model('Employee',employee)