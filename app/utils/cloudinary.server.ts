import cloudinary from "cloudinary"
import { writeAsyncIterableToWritable } from "@remix-run/node"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage: (
    data: AsyncIterable<Uint8Array>,
    transformation?: cloudinary.TransformationOptions
) => Promise<any> = async (data, transformation) => {
    const uploadPromise = new Promise(async (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
                folder: "jpxldev",
                transformation
            },
            (error, result) => {
                if (error) {
                    reject({ error })
                    return
                }
                resolve({ result })
            }
        )
        await writeAsyncIterableToWritable(data, uploadStream)
    })
    return uploadPromise
}
