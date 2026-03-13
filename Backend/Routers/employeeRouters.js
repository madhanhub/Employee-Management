const express=require('express')
const app=express.Router()
const authorization=require('../Middleware/auth')
const employecontrollers=require('../Controllers/EmployeeController')

app.post('/api/employee',authorization,async(req,res)=>{
    try{
        const UserId=req.id
        const {name,email,department,salary}=req.body
        const register_emplyee=await employecontrollers.employee_register({UserId},{
            name,email,department,salary
        }).save()
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



module.exports=app