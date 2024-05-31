import mongoose from "mongoose";

const questionSetSchema= new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    question:[{
        question:{
            type:String
        },
        confidence:{
            type:Number,
            default:1
        },
        label:{
            type:String,
            default:'level 1'
        }

    }]
})
const questionSet=mongoose.models.qs || mongoose.model("qs",questionSetSchema);

export default questionSet;
