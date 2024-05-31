// route
// request structure: Model/user
// response structure
// {
//   message:String,
//   status:500->error|200->success|201->message
// }



import { userConnect } from "@/dbConfig/userDb";
import { NextRequest, NextResponse } from "next/server";
import  User from "@/models/user";

userConnect();

export async function POST(req: NextRequest){
  try {
    //input from the client side
    const { name, email, password, isAdmin } = await req.json();
    // for already existing users
    const user = await User.findOne({ email });
    if(!name || !email || !password){
      return NextResponse.json({
        message:`fill all the fields`,
        status:201
      })
    }
    if (user) {
      return NextResponse.json({ message: `user already exists`, status: 201 });
    }

    //saving new user
    const createdUser = await new User({
      name,
      email,
      password,
      isAdmin
    }).save();

    return NextResponse.json({
      message: `new user has created ${createdUser}`,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: `there is an error in signup route : ${error}`,
      status: 500,
    });
  }
}
