import { templateConnect } from "@/dbConfig/templateDb";
import { NextRequest, NextResponse } from "next/server";
import Template from "@/models/template";

templateConnect();

export async function POST(req: NextRequest) {
    try {
        const { name, level1, level2, level3, level4, level5, level6 } = await req.json();
        
        // Check if all percentages sum up to 100
        const total = parseFloat(level1) + parseFloat(level2) + parseFloat(level3) +
                      parseFloat(level4) + parseFloat(level5) + parseFloat(level6);
        if (total !== 100) {
            return NextResponse.json({
                error: 'Total percentage must be 100%',
                status: 400
            });
        }
        
        const template = await new Template({
            'name':name,
            'level-1': level1,
            'level-2': level2,
            'level-3': level3,
            'level-4': level4,
            'level-5': level5,
            'level-6': level6
        }).save();

        console.log(template);
        return NextResponse.json({
            template,
            message: 'Template created successfully',
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            error: `Error from template Route ${error}`,
            status: 500
        });
    }
}
export default async function GET(){
    try {
        const res=await Template.find({});
        return NextResponse.json({
            data:res,
            status:200
        });
    } catch (error) {
        return NextResponse.json({
            error:`error ${error}`,
            status:500
        })
    }
}
