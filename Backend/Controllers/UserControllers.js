const user=require('../Module/User')

class UserControllers{

    static async new_user(
        {name,email,password}
    ){
        try{

            const new_user= await new user(
                {name,email,password}
            ).save()
            return new_user
        }catch(error){
            throw Error
        }
    }

    static async user_login(
        {email,password}
    ){
        try{
            const user_login=await user.findOne({
                email,password
        })
        return user_login
        }catch(error){
            throw Error
        }
    }

    static async user_list(
        {_id}
    ){
        try{
            const user_list=await user.find({_id})
            return user_list
        }catch(error){
            throw Error
        }
        
    }

     static async user_delete(
        {_id}
    ){
        try{
            const user_delete=await user.findOneAndDelete({_id})
            return user_delete
        }catch(error){
            throw Error
        }
        
    }

    static async user_update(
        {_id},{name,email,password}
    ){
        try{
            const user_update=await user.findOneAndUpdate({_id},
                {$set:{name,email,password}},
                {new:true}
            )
            return user_update
        }catch(error){
        throw Error
    }
        
    }






}

module.exports=UserControllers