
import db from '../db.js'

export const resolvers = {
    Query:{
        users(){
            return db.UserList;
        },
        user(_,args){
            return db.UserList.find((user)=>user.id === args.id)
        }
    },
    User:{
        friends(parent){
            return db.UserList.filter((user)=>parent.friends.includes(user.id))
        }
    }
}