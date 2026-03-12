const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const jsonwebtoken=require('jsonwebtoken')
require('dotenv').config()



const usercontrollers=require('./Controllers/UserControllers')
const employecontrollers=require('./Controllers/EmployeeController')

const userRouters=require('./Routers/userRouters')


const cors=require('./Middleware/cors')
const authorization=require('./Middleware/auth')


// const connectDB=require('./config/DB')
// connectDB()

app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors)
app.post('/new/user',userRouters)



app.listen(9999,()=>{
    console.log('Server Connetced');
    mongoose.connect('mongodb://localhost:27017/testDB')
    .then(()=>{
        conn =mongoose.connection
        console.log("DB connected");
        
    })
    .catch(()=>{
        console.log("DB not Connected");
        
    })
})

app.get('/',async(req,res)=>{
    res.send('welcome')
})



// app.post('/new/user',async(req,res)=>{
//     try{
//         const{name,email,password}=req.body
//         const new_user=await usercontrollers.new_user({
//             name,email,password
//         })
//         res.status(200).json({message:'user added',data:new_user})
//     }catch(error){
//         res.status(500).json({message:'User not added'})
//     }
// })


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

app.post('/api/employee',authorization,async(req,res)=>{
    try{
        const UserId=req.id
        const {name,email,department,salary}=req.body
        const register_emplyee=await employecontrollers.employee_register({UserId},{
            name,email,department,salary
        })
        res.status(200).json({message:'new employee added',data:register_emplyee})
    }catch(error){
        res.status(500).json({message:'Employee not added'})
    }
})

app.get('/get/employee',authorization,async(req,res)=>{
    try{
        const UserId=req.id
        const view_emplyee=await employecontrollers.employee_list({createdBy:UserId})
        res.status(200).json({message:'employee listed',data:view_emplyee})
    }catch(error){
        res.status(500).json({message:'Employee not listed'})
    }
})

app.delete('/delete/employee',authorization,async(req,res)=>{
    try{
        const UserId=req.id
        const delete_employee=await employecontrollers.employee_delete({UserId})
        res.status(200).json({message:'employee deleted successfully',data:delete_employee})
    }catch(error){
        res.status(500).json({message:'Employee not deleted'})
    }
})

app.put('/update/employee',authorization,async(req,res)=>{
    try{
        const UserId=req.id
        const {name,email,department,salary}=req.body
        const update_employee=await employecontrollers.employee_update({createdBy:UserId},{
            name,email,department,salary
        })
        res.status(200).json({message:'Employee Updated',data:update_employee})
    }catch(error){
        res.status(500).json({message:'Employee not updated'})
    }
})

