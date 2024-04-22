
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
            return db.MovieList.find((movie)=> movie.title === args.title)
        }
    },
    Mutation:{
        //User related mutations
        addNewUser(_,args){

        },
        updateUser(_,args){

        },
        deleteUser(_,args){

        },

        //Movie Related Mutations
        addNewMovie(_,args){

        },
        updateMovie(_,args){

        },
        deleteMovie(_,args){

        }
    },
    
    User:{
        friends(parent){
            return db.UserList.filter((user)=>parent.friends.includes(user.id))
        },
        favouriteMovies(parent){
            return db.MovieList.filter((movie)=>parent.favouriteMovies.includes(movie.title))
        }
    }
}