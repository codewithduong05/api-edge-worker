let users = [
    {id : 1 , name : "Tony", email : "tony@gmail.com" }
]

export class UserModel {
    static getAll() {return users}

    static getById(id) {
        // console.log(id);
          const numericId = Number(id);
        const data = users.find(user => user.id === numericId);
        console.log(data);
        
        
        return users.find(user => user.id === numericId);
    }

    static create(user) {
        const newUser = {...user, id : users.length + 1}
        users.push(newUser)
        return newUser
    }
    
    static deleteUser(id) {
          const numericId = Number(id);
        const index = users.findIndex(user => user.id === numericId);
        if (index === -1) return null
        const deletedUser = users.splice(index, 1)[0]
        return deletedUser
    }
}
