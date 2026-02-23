import { UserModel } from "../model/userModel";
import { json } from "../views/jsonView";


export class UserController  {
    static getAll(){
        return json(UserModel.getAll())
    }
    static getById(id){
   
        
        return json(UserModel.getById(id))
    }

    static create(user){
        return json(UserModel.create(user))
    }

    static deleteUser(id){
        return json(UserModel.deleteUser(id))
    }
}                     