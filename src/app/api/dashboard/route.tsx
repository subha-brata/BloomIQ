import { NextRequest, NextResponse } from "next/server";
import questionSet from "@/models/questionSet";
import { qsConnect } from "@/dbConfig/qsDb";


qsConnect();

export async function POST(req:NextRequest){
    try {
        const request= await req.json();
        console.log(`request recieved in dashboard`,request)
        const questionSets= await questionSet.find({email:request.userName});
        if(!questionSets) return NextResponse.json({
            data:`no questions found`,
            status:404
        })
        return NextResponse.json({
            data:questionSets,
            status:200
        });
    } catch (error) {
        return NextResponse.json({
            error:`some error occured at dashboard api ${error}`,
            status:500
        })
    }

}