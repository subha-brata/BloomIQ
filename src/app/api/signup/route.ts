import { userConnect } from "@/dbConfig/userDb";
import { NextRequest, NextResponse } from "next/server";
import  User from "@/models/user";

userConnect();

export async function POST(req: NextRequest){
  try {
    const { name, email, password, isAdmin } = await req.json();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: `user already exists`, status: 200 });
    }
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
