import { client } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session=await  getServerSession();
    
    if(session?.user){
        return NextResponse.json({
            message:"unAthorized access"
        },{
            status:403            
        })
    }
    
    const streams = await client.stream.findMany({
        where: {
            userId: session?.user.id
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes: {
                where: {
                    userId: session?.user.id
                }
            }
        }
    })
    return NextResponse.json({
        streams: streams.map(({_count, ...rest}) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted: rest.upvotes.length ? true : false
        }))
    })
}


