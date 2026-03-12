const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/testDB')
        console.log("DB connected");
        
    }catch(error){
        console.log("DB not connected");
        
    }
}
module.exports=connectDB