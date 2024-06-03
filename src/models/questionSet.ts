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
    title:{
        type:String
    },
    pinned:{
        type:String,
        default:false
    },
    questions:[{
        text:{
            type:String
        },
        label:{
            type:String,
            default:'level 1'
        },
        confidence:{
            type:Number,
            default:1
        },
        bloom_level:{
            type:Number,
            default:0
        }
        
        
    }]
});
const questionSet=mongoose.models.qs || mongoose.model("qs",questionSetSchema);

export default questionSet;
