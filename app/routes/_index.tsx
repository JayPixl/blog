import { Post, User } from "@prisma/client"
import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import Layout from "~/components/layout"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"

export const meta: MetaFunction = () => [
    {
        title: `Home | jpxl.dev blog`
    }
]

export const loader: LoaderFunction = async ({ request }) => {
    const { user } = await getUser(request)
    const recentPosts = await prisma.post.findMany({
        where: { draft: false },
        take: 3,
        orderBy: { createdAt: "desc" }
    })
    return { user, recentPosts }
}

export default function Index() {
    const { user, recentPosts }: { user?: User; recentPosts: Post[] } =
        useLoaderData<typeof loader>()
    return (
        <Layout user={user}>
            <div className="w-full flex flex-col items-center justify-center py-48 px-20 md:px-24 text-6xl md:text-7xl">
                <div>
                    A blog for
                    <span className="text-action-600 dark:text-action-400">
                        {" "}
                        developers{" "}
                    </span>
                    ☕
                </div>
            </div>
            <div className="w-full bg-primary-100 dark:bg-primary-700 p-8">
                <h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
                <div className="w-full flex flex-col md:flex-row justify-between">
                    {recentPosts.map(post => (
                        <Link
                            to={`/posts/${post.slug}`}
                            className="w-full rounded-xl shadow-lg hover:shadow-2xl p-4 my-4 md:my-0 md:mr-6 group border border-action-600 dark:border-action-400"
                        >
                            <div className="text-2xl underline group-hover:no-underline mb-2 font-semibold">
                                {post.title}
                            </div>
                            <div className="text-action-600 dark:text-action-400 mb-3">
                                {post.tags.map(tag => (
                                    <span className="">#{tag} </span>
                                ))}
                            </div>
                            <div className="italic font-light text-sm">
                                {post.description}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
