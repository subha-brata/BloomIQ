import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    requied: [true,"please provide a name"]
  },
  email:{
    type: String,
    required:[true,"please provide an email"],
    unique: true
  },
  password:{
    type:String,
    required:true
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
});

const User=mongoose.models.users || mongoose.model("users",userSchema);

export default User;