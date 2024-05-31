import { NextRequest, NextResponse } from "next/server";
import questionSet from "@/models/questionSet";
import { qsConnect } from "@/dbConfig/qsDb";

qsConnect();

export async function POST(req: NextRequest) {
  const date = new Date();
  try {
    const { title, questions } = await req.json();
    const qs = await new questionSet({
      time: `on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
      title,
      questions,
    }).save();
    return NextResponse.json({
      message: "queston uploaded",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: `Error from analysis Route`,
      status: 500,
    });
  }
}
