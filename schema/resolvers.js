
import db from '../db.js'

export const resolvers = {
    Query:{
        //User relared queries
        users(){
            return db.UserList;
        },
        user(_,args){
            return db.UserList.find((user)=>user.id === args.id)
        },

        //Movie related queries
        movies(){
            return db.MovieList;
        },
        movie(_,args){
            return db.MovieList.find((movie)=> movie.id === args.id)
        }
    },
    Mutation:{
        //User related mutations
        addNewUser(_,args){
            const lastId = Number(db.UserList[db.UserList.length - 1].id)
            let newUser = {
                ...args.newUser,
                id: String(lastId+1)
            }
            db.UserList.push(newUser)
            return db.UserList
        },
        updateUser(_,args){
            db.UserList = db.UserList.map((user)=>{
                if(user.id === args.id){
                    return {...user,...args.updateUser}
                }
                return user
            })
            return db.UserList.find((user)=>user.id === args.id)
        },
        deleteUser(_,args){
            const userId = args.id
            db.UserList = db.UserList.map((user)=>{
                if(user.id !== userId && user.friends?.length > 0){
                    user.friends = user.friends.filter((friend)=>friend.id !== userId)
                }
                return user
            })
            return db.UserList = db.UserList.filter((user)=> user.id !== args.id)
        },

        //Movie Related Mutations
        addNewMovie(_,args){
            const lastId = Number(db.MovieList[db.MovieList.length - 1].id)
            let movie = {
                ...args.newMovie,
                id: String(lastId + 1)
            }
            db.MovieList.push(movie)
            return db.MovieList
        },
        updateMovie(_,args){
            db.MovieList = db.MovieList.map((movie)=>{
                if(movie.id === args.id){
                    return {...movie,...args.updateMovie}
                }
                return movie
            })
            return db.MovieList.find((movie)=> movie.id === args.id)
        },
        deleteMovie(_,args){
            return db.MovieList = db.MovieList.filter((movie)=> movie.id !== args.id)
        }
    },
    
    User:{
        friends(parent){
            return db.UserList.filter((user)=>parent.friends?.includes(user.id))
        },
        favouriteMovies(parent){
            return db.MovieList.filter((movie)=>parent.favouriteMovies?.includes(movie.id))
        }
    }
}