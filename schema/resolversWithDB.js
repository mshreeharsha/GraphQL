import MovieModel from "../models/MovieModel.js"
import UserModel from "../models/UserModel.js"

export const resolvers = {
    Query:{
        async users(){
            const allUsers = await UserModel.find({})
            return allUsers
        },
        async user(_,args){
            const userId = args.id
            const user = await UserModel.findOne({_id : userId})
            return user
        },

        async movies(){
            const allMovies = await MovieModel.find({})
            return allMovies
        },
        async movie(_,args){
            const movieId = args.id
            const movie = await MovieModel.findOne({_id: movieId})
            return movie
        }
    },
    User:{

    },
    Mutation:{
        async addNewUser(_,args){
            await UserModel.create({
                ...args.newUser
            })
            const allUsers = await UserModel.find({})
            return allUsers
        },
        async updateUser(_,args){
            const userId = args.id
            await UserModel.findOneAndUpdate({_id: userId},{
                ...args.updateUser
            })

            const existingUser = await UserModel.findOne({_id:userId});
            return existingUser
        },
        async deleteUser(_,args){
            const userId = args.id
            await UserModel.updateMany(
                {friends:userId},
                {$pull: {friends: userId}}
            )
            await UserModel.findByIdAndDelete(userId)
            const allUsers = await UserModel.find({})
            return allUsers
        },

        async addNewMovie(_,args){
            await MovieModel.create({
                ...args.newMovie
            })
            const allMovies = await MovieModel.find({})
            return allMovies
        },
        async updateMovie(_,args){
            const movieId = args.id
            await MovieModel.findOneAndUpdate({_id:movieId},{
                ...args.updateMovie
            })
            const existingMovie = await MovieModel.findOne({_id: movieId})
            return existingMovie
        }
    }
}