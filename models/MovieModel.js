import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    yearOfRelease:{
        type:Number,
        required:true
    },
    languages:{
        type: [String],
        required:true
    },
    inTheaters:{
        type:Boolean,
        required:true
    }
},{timestamps:true})

const MovieModel = mongoose.model('Movie',movieSchema)
export default MovieModel