"use server"

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { S3Client, PutObjectCommand, S3, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import csv from 'csv-parser';
import { Readable } from "stream";


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function getSignedURL() {
    const session = await getServerSession(NEXT_AUTH_CONFIG)

    if(!session){
        return { failure : "Not authenticated"}
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket : process.env.AWS_S3_BUCKET_NAME,
        Key : 'test-file'
    })

    const signedUrl = await getSignedUrl(s3Client , putObjectCommand , {expiresIn : 60})

    return {success : {url : signedUrl} }
}


export async function getParsedData(){
    

    const session = await getServerSession(NEXT_AUTH_CONFIG)
    const params = {Bucket : process.env.AWS_S3_BUCKET_NAME , Key : 'test-file'}
    const command = new GetObjectCommand(params)
    const { Body } = await s3Client.send(command);

    if (!Body) {
      return;
    }

    let stream;

    // Convert Blob or ReadableStream to AsyncIterable
    if (Body instanceof Readable) {
      stream = Body; // It's already a readable stream in Node.js
    } else if (Body instanceof ReadableStream) {
      stream = Readable.from(readableStreamToAsyncIterable(Body)); // Convert ReadableStream to Node.js stream
    } else {
      return;
    }

    // Create an array to store parsed CSV data
    const results : any[] = [];

    const userData : { name : string , email : string , userId : string }[] = []
    // Stream the CSV data and parse it using csv-parser
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data)) // Push each row to results array
      .on('end', () => {
        results.map((items : any)=>{
            console.log(items.Name)
            const Obj = { name : items.Name , email : items.Email , userId : session.user.id}
            userData.push(Obj)
        })

        console.log(userData)
      })
      .on('error', (err) => {
        console.error(err);
        return
    });
}

function readableStreamToAsyncIterable(Body: ReadableStream<any> & import("@smithy/types").SdkStreamMixin): Iterable<any> | AsyncIterable<any> {
    throw new Error("Function not implemented.");
}

