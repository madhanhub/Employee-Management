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

app.post('/user/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const user_login=await usercontrollers.user_login({email,password})
         if(user_login){
            {
                user_token=await jsonwebtoken.sign({id:user_login.id,name:user_login.name,email:user_login.email},process.env.SECRET)
                 res.setHeader('user_token',user_token)
                res.setHeader('id',user_login.id)
                res.setHeader('name',user_login.name)
                res.setHeader('email',user_login.email)

                res.status(200).json({message:'user Login Successfully',user_token,data:user_login})
            }
        }
        
    }catch(error){
    res.status(500).json({message:'User login failed '})
}
})

app.get('/get/user',authorization,async(req,res)=>{
    try{
        const _id=req.id
        const view_user=await usercontrollers.user_list({_id})
        res.status(200).json({message:'User list',data:view_user})
    }catch(error){
    res.status(500).json({message:'Users not listed'})

}
})

app.delete('/delete/user',authorization,async(req,res)=>{
    try{
        const _id=req.id
        const delete_user=await usercontrollers.user_delete({_id})
        res.status(200).json({message:'User deleted',data:delete_user})
    }catch(error){
    res.status(500).json({message:'Users not deleted'})

}
})

app.put('/update/user',authorization,async(req,res)=>{
    try{
        const _id=req.id
        const{name,email,password}=req.body
        const update_user=await usercontrollers.user_update({_id},{
            name,email,password
        })
        res.status(200).json({message:'User updated',data:update_user})
    }catch(error){
        res.status(500).json({message:'Users not updated'})

    }
})



module.exports=app