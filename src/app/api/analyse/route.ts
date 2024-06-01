import { NextRequest, NextResponse } from "next/server";
import questionSet from "@/models/questionSet";
import { qsConnect } from "@/dbConfig/qsDb";
import { gen } from "@/utils/gen";

qsConnect();

export async function POST(req: NextRequest) {
  try {
    const { email, time, title, questions } = await req.json();
    const genOut=await gen(questions)
    
    const qs = await new questionSet({
      email,
      time,
      title,
      pinned:false,
      questions:genOut
    }).save();
    console.log(qs);
    return NextResponse.json({
      message: `questionSet uploaded ${qs}`,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: `Error from analysis Route`,
      status: 500,
    });
  }
}
