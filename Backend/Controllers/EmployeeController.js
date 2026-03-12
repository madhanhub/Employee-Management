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
            const employee_list=await employee.findOneAndDelete({UserId})
            return employee_list
        }catch(error){
            throw Error
        }
    }

    static async employee_update(
        {UserId},{name,email,department,salary}){

            try{
                const employee_update=await employee.findOneAndUpdate({UserId},
                    {$set:{name,email,department,salary}},{new:true}
                )
                return employee_update
            }catch(error){
                throw Error
            }
        }
       
        static async employee_delete({createdBy:UserId}){
        try{
            const employee_delete=await employee.findOneAndDelete({UserId})
            return employee_delete
        }catch(error){
            throw Error
        }
    }


}

module.exports=EmployeeControllers