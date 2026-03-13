const employee=require('../Module/Employee')

class EmployeeControllers{
    static async employee_register(
        {UserId},{name,email,department,salary}
    ){
        try{
            const employee_register=await new employee({
                name,email,department,salary,createdBy:UserId
            }).save()
            return employee_register
        }catch(error){
            throw Error
        }
    }

    static async employee_list({UserId}){
        try{
            const employee_list=await employee.find({createBy:UserId})
            return employee_list
        }catch(error){
            throw Error
        }
    }

    static async employee_update(
        {UserId},{name,email,department,salary}){

            try{

                const employee_update=await employee.findOneAndUpdate({createdBy:UserId},
                    {$set:{name,email,department,salary}},{new:true}
                )
                return employee_update
            }catch(error){
                throw Error
            }
        }
       
    //     static async employee_delete({UserId}){
    //     try{
    //         const employee_delete=await employee.findOneAndDelete({createdBy:UserId})
    //         return employee_delete
    //     }catch(error){
    //         throw Error
    //     }
    // }

     static async employee_delete({UserId}){
        try{
            const employee_delete=await employee.findOneAndDelete({
                createdBy:new monngose.Type.ObjectId(UserId)
            })
            return employee_delete
        }catch(error){
            throw Error
        }
    }


}

module.exports=EmployeeControllers