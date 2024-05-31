// route
// request structure: {
//     email:string,
//     password:string
// }
// response structure
// {
//   user : Model/user
//   message:String,
//   status:500->error|200->success|201->message
// }



import { userConnect } from "@/dbConfig/userDb";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/user";


userConnect();
export async function POST(req:NextRequest){
    try {
        const {email, password}= await req.json();
        const user=await User.findOne({email});
        //for not an user
        if(!user) return NextResponse.json({
            user:null,
            message:"No user Found",
            status:201
        });
        if(user.password===password) return NextResponse.json({
            user:user,
            messege:`login successful`,
            status:200
        }); 
        
    } catch (error) {
        return NextResponse.json({
            error:`Error from login Route ${error}`,
            status:500
        });
    }
}