import { client } from "@/app/lib/db";
import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import youtubesearchapi from 'youtube-search-api';
import z from 'zod'

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
});

const MAX_QUEUE_LEN = 20;
export const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = data.url.match(YT_REGEX)
        if (!isYt) {
            return NextResponse.json({
                message: "Wrong URL format"
            }, {
                status: 411
            })    
        }
        const match = data.url.match(YT_REGEX);
        const extractedId = data.url.split("?v=")[1];
if (!extractedId) {
    return NextResponse.json({ message: "Invalid YouTube video ID" }, { status: 400 });
}

        
        console.log('extraid ',extractedId)
        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        const thumbnails = res.thumbnail.thumbnails;

        thumbnails.sort((a: {width: number}, b: {width: number}) => a.width < b.width ? -1 : 1);

        const existingActiveStream = await client.stream.count({
            where: {
                userId: data.creatorId
            }
        })

        if (existingActiveStream > MAX_QUEUE_LEN) {
            return NextResponse.json({
                message: "Already at limit"
            }, {
                status: 411
            })
        }

        const stream = await client.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type:"YouTube",
                title: res.title ?? "Cant find video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
            }
        });

        return NextResponse.json({
            ...stream,
            hasUpvoted: false,
            upvotes: 0
        })
    } catch(e) {
        console.log(e);
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
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
    console.log(streams)
    return NextResponse.json({
        streams
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