import { client } from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
export const UpvoteSchema =z.object({
    streamId:z.string(),
})

export async function POST(request:NextRequest){
    const session  =  await getServerSession();
    
    const user=await client.user.findFirst({
        where:{
            email :session?.user?.email ?? ""
        }
    })
    if(!user){
        return NextResponse.json({
            message:"Unauthenticated"
        },{
            status:403
        })
    }
    try{
        const data= UpvoteSchema.parse(await request.json());
        await client.upvote.create({
            data:{
                userId:user.id,
                streamId:data.streamId
            }
        })
    }catch(e){
        return NextResponse.json({
            message:"Error while upvoting"
        },{
            status:403
        })
    }

}