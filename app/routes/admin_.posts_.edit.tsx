import { Post, User } from "@prisma/client"
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { SitemapFunction } from "remix-sitemap"
import AdminPanel from "~/components/admin-panel"
import Layout from "~/components/layout"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"

export const meta: MetaFunction = () => [
    {
        title: `Admin Edit Posts | jpxl.dev blog`
    }
]

export const sitemap: SitemapFunction = () => ({
    exclude: true
})

export const loader: LoaderFunction = async ({ request }) => {
    const { user } = await getUser(request)
    if (!user) return redirect("/login")

    if (user.type !== "ADMIN") return redirect("/")

    const posts = await prisma.post.findMany()

    return { user, posts }
}

export default function EditPosts() {
    const { user, posts }: { user: User; posts: Post[] } =
        useLoaderData<typeof loader>()

    return (
        <Layout user={user}>
            <AdminPanel>
                <h2 className="text-2xl font-semibold mb-4 p-6">Edit Posts</h2>
                {posts.map(post => (
                    <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="m-4 p-2 block w-full underline hover:no-underline"
                    >
                        {post.title}
                    </Link>
                ))}
            </AdminPanel>
        </Layout>
    )
}
