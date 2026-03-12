const express=require('express')
const app=express.Router()
const usercontrollers=require('../Controllers/UserControllers')
const authorization=require('../Middleware/auth')
const jsonwebtoken=require('jsonwebtoken')

app.post('/new/user',async(req,res)=>{
    try{
        const{name,email,password}=req.body
        const new_user=await usercontrollers.new_user({
            name,email,password
        })
        res.status(200).json({message:'user added',data:new_user})
    }catch(error){
        res.status(500).json({message:'User not added'})
    }
})









module.exports=app