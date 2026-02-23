import { UserModel } from "../model/userModel";
import { json } from "../views/jsonView";


export class UserController  {
    static getAll(){
        return json(UserModel.getAll())
    }
}                     