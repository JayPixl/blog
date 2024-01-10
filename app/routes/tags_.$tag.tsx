import { Post, User } from "@prisma/client"
import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, useParams } from "@remix-run/react"
import Layout from "~/components/layout"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"

export const meta: MetaFunction = ({ data, params }) => {
    return [
        {
            title: `Tag ${params.tag} | jpxl.dev blog`
        },
        {
            description: `Explore posts matching tag ${params.tag} on jpxl.dev!`
        }
    ]
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { user } = await getUser(request)
    const matchedPosts = await prisma.post.findMany({
        where: { draft: false, tags: { has: params.tag } },
        orderBy: { createdAt: "desc" }
    })
    return { user, matchedPosts }
}

export default function Index() {
    const { user, matchedPosts }: { user?: User; matchedPosts: Post[] } =
        useLoaderData<typeof loader>()

    const params = useParams()
    return (
        <Layout user={user}>
            <div className="w-full min-h-[70vh] bg-primary-100 dark:bg-primary-700 p-8 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4 md:mb-8 w-full max-w-none md:max-w-[40rem]">
                    Posts Matching Tag "{params.tag}"
                </h2>
                <div className="w-full flex flex-col max-w-none md:max-w-[40rem]">
                    {matchedPosts.map(post => (
                        <Link
                            to={`/posts/${post.slug}`}
                            className="w-full rounded-xl shadow-lg hover:shadow-xl p-4 group border border-action-600 dark:border-action-400 mb-4 flex flex-col"
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
