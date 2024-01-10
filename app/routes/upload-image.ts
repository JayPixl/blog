import {
    ActionFunction,
    UploadHandler,
    UploadHandlerPart,
    json,
    unstable_parseMultipartFormData
} from "@remix-run/node"
import { uploadImage } from "~/utils/cloudinary.server"
import cloudinary from "cloudinary"

export const action: ActionFunction = async ({ request }) => {
    const type = new URL(request.url).searchParams.get("type")
    const uploadHandler: UploadHandler = async ({
        name,
        data
    }: UploadHandlerPart) => {
        if (name !== "image") return undefined
        let transformation: cloudinary.TransformationOptions = [
            { width: 100, height: 100, crop: "fill", gravity: "center" }
        ]

        switch (type) {
            case "avatar": {
                transformation = [
                    { width: 100, height: 100, crop: "fill", gravity: "center" }
                ]
            }
            case "asset": {
                transformation = []
            }
        }

        const { result } = await uploadImage(data, transformation)
        return result?.secure_url
    }
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    )
    const img = formData.get("image")

    if (!img) return json({ error: "Error while uploading image..." })
    return json({ image: img })
}
