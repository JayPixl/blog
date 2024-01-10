import { LoaderFunction, json } from "@remix-run/node"
import Fuse from "fuse.js"
import { remark } from "remark"
import { prisma } from "~/utils/prisma.server"
import strip from "strip-markdown"
import remarkGfm from "remark-gfm"
import unique from "array-unique"

export const loader: LoaderFunction = async ({ request }) => {
    const query = new URL(request.url).searchParams.get("q")

    if (!query?.length)
        return json({ results: { posts: [], tags: [], users: [] } })

    const searchPosts = await Promise.all(
        (
            await prisma.post.findMany({
                select: {
                    title: true,
                    content: true,
                    tags: true,
                    id: true,
                    description: true
                }
            })
        ).map(post => {
            return remark()
                .use(remarkGfm)
                .use(strip)
                .process(post.content)
                .then(textContent => {
                    return {
                        ...post,
                        content: textContent.value
                            .toString()
                            .replaceAll("\n", " ")
                    }
                })
        })
    )

    const postFuse = new Fuse(searchPosts, {
        keys: ["title", "content", "tags"],
        threshold: 0.2
    })
    const posts = postFuse.search(query).slice(0, 5)

    const searchTags = unique(
        (
            await prisma.post.findMany({
                select: {
                    tags: true
                }
            })
        ).flatMap(obj => obj.tags)
    )
    const tagsFuse = new Fuse(searchTags)
    const tags = tagsFuse.search(query).slice(0, 10)

    const userFuse = new Fuse(
        await prisma.user.findMany({
            select: { email: true, fullName: true, nickname: true, id: true }
        }),
        {
            keys: ["fullName", "nickname"],
            threshold: 0
        }
    )
    const users = userFuse.search(query).slice(0, 5)

    return json({ results: { posts, tags, users } })
}
