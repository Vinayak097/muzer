import { client } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

import youtubesearchapi from "youtube-search-api";
import z from 'zod'

const CreateStreamSchema = z.object({
    creatorId:z.string(),
    url:z.string(),
})

const youtubeRegex= new RegExp("https:\/\/(?:www\\.)?youtu(?:\\.be|be\\.com)\\/(?:watch\\?v=|embed\\/|v\\/|\\S*\\/)?([\\w\\-]{11})(?:\\?\\S*)?");
export async function POST(request:NextRequest){
    try{
        const data=CreateStreamSchema.parse(await request.json());
        const isyt=youtubeRegex.test(data.url);
        if(!isyt){
            return NextResponse.json({
                message:"provide link is not valid or its not yt link"
            })
        }
        const extractedId = data.url.split("?v=")[1];
        const res= await youtubesearchapi.GetVideoDetails(extractedId);
        console.log(res);
        const thumbnails=res.thumbnail.thumbnails;
        thumbnails.sort((a:{width:number},b:{width:number})=>a.width<b.width? -1 : 1);
        const stream=await client.stream.create({
            data:{
                userId:data.creatorId,
                url:data.url,
                extractedId, 
                type:"YouTube",
                title:res.title || "cant find  video",
                smallImg: (thumbnails.length >1  ? thumbnails[thumbnails.length-2] : thumbnails[thumbnails.length-] ) ?? "data:image/jpeg;base64,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",
                bigImg: ()

            }
        })
        return NextResponse.json({
            message:"Added stream ",
            id:stream.id
        })

    }catch(e){
        return NextResponse.json({
            message:"Error while adding stream"
        },{
            status:411
        })
    }
}

export async function GET(request:NextRequest){
    const creatorId=request.nextUrl.searchParams.get("creatorId")
    
    const streams= await client.stream.findMany({
        where:{
            userId: creatorId ?? ""
        }
    })
}







// const youtubeRegex = new RegExp("https:\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([\w\-]{11})(?:\S+)?(?:&[\w\d=]*)*");
// export async function POST(request:NextRequest){
//     try{
//         const data= CreateStreamSchema.parse(await request.json());
//         const isyt=youtubeRegex.test(data.url);
//         if(!isyt){
//             return NextResponse.json({
//                 message:"Error Url fromat"
//             },{
//                 status:411
//             })
//         }
//         const extractedId = data.url.split("?v=")[1];

//         await client.stream.create({
//             data:{
//                 userId:data.creatorId,
//                 url : data.url,
//                 extractedId,
//                 type:"YouTube"
//             }
//         })
//     }catch(e){
//         return NextResponse.json({
//             message:" Error while adding a stream "
//         },{
//             status:411
//         })
//     }
// }