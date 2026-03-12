const express=require('express')
const app=express()
const morgan=require('morgan')
const bodyparser=require('body-parser')
require('dotenv').config()





const userRouters=require('./Routers/userRouters')
const employeeRouters=require('./Routers/employeeRouters')


const cors=require('./Middleware/cors')



const connectDB=require('./config/DB')
connectDB()

app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors)





app.post('/new/user',userRouters)
app.post('/user/login',userRouters)
app.get('/get/user',userRouters)
app.delete('/delete/user',userRouters)
app.put('/update/user',userRouters)

app.post('/api/employee',employeeRouters)
app.get('/get/employee',employeeRouters)
app.delete('/delete/employee',employeeRouters)
app.put('/update/employee',employeeRouters)


app.listen(9999,()=>{
    console.log('Server Connetced');
    
})

app.get('/',async(req,res)=>{
    res.send('welcome')
})





