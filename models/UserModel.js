import mongoose from "mongoose";

const validCountries = ["INDIA","AUSTRALIA","ENGLAND","JAMICA"]

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    nationality:{
        type:String,
        enum: validCountries,
        required:true
    },
    friends:{
        type:mongoose.ObjectId,
        ref: 'User'
    },
    favouriteMovies:{
        type:mongoose.ObjectId,
        ref:'Movie'
    }
},{timestamps:true})

const UserModel = mongoose.model(userSchema,'User')
export default UserModel