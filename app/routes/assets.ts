import { ActionFunction, json } from "@remix-run/node"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"

export const action: ActionFunction = async ({ request }) => {
    const { user } = await getUser(request, false, true)

    if (!user || user.type !== "ADMIN") return json({ error: "" })

    const form = await request.formData()

    const action = form.get("_action")!

    switch (action) {
        case "newasset": {
            const imageURL = form.get("imageUrl") as string
            const folder = form.get("folder") as string

            if (!imageURL || !imageURL.length) {
                return json({ error: "No Image URL given" })
            } else {
                const asset = await prisma.asset.create({
                    data: {
                        folder: folder && folder.length ? folder : "/",
                        title: "Untitled",
                        type: "IMAGE",
                        url: imageURL
                    }
                })
                return json({ asset })
            }
        }
        default: {
            return json({ error: "Invalid action" })
        }
    }
}
