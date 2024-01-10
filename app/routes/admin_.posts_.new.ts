import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"
import { generate } from "randomstring"
import { SitemapFunction } from "remix-sitemap"

export const sitemap: SitemapFunction = () => ({
    exclude: true
})

export const loader: LoaderFunction = async ({ request }) => {
    const { user } = await getUser(request)
    if (!user) return redirect("/login")

    if (user.type !== "ADMIN") return redirect("/")

    const newPost = await prisma.post.create({
        data: {
            content: "# My New Post",
            draft: true,
            draftContent: "# My New Post",
            title: "My New Post",
            slug: `draft-${generate({ charset: "alphabetic", length: 12 })}`,
            description: "This is a new post",
            writer: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    return redirect(`/admin/posts/edit/${newPost.id}`)
}
