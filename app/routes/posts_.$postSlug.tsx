import { HashtagIcon } from "@heroicons/react/20/solid"
import { Post, User } from "@prisma/client"
import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, useSearchParams } from "@remix-run/react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import { SitemapFunction } from "remix-sitemap"
import Layout from "~/components/layout"
import LocalLink from "~/components/local-link"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"

export const meta: MetaFunction = ({ data }) => {
    var myData = data as { user?: User; post?: Post; writer?: User }
    return [
        {
            title: `${myData?.post?.title || "Missing Post!"} | jpxl.dev blog`
        },
        {
            description:
                myData?.post?.description || "This post description is missing!"
        }
    ]
}

export const sitemap: SitemapFunction = async ({ config, request }) => {
    const posts = await prisma.post.findMany()

    return posts.map(
        post =>
            ({
                loc: `/posts/${post.slug}`,
                lastmod: post.updatedAt,
                exclude: post.draft,
                priority: 1
            } as any)
    )
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { user } = await getUser(request)

    const admin = user?.type === "ADMIN"

    const fetchedPost = await prisma.post.findFirst({
        where: { slug: params.postSlug }
    })

    const post = !admin
        ? !fetchedPost?.draft
            ? ({ ...fetchedPost, draftContent: fetchedPost?.content } as Post)
            : null
        : fetchedPost

    const writer = post?.writerId
        ? await prisma.user.findUnique({ where: { id: post?.writerId } })
        : undefined

    return { user, post, writer }
}

export default function Index() {
    const { user, post, writer }: { user?: User; post?: Post; writer?: User } =
        useLoaderData<typeof loader>()
    const [searchParams] = useSearchParams()
    const draft = searchParams.get("draft") === "true"

    const formatDate = (date: Date) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]

        const day = date.getDate()
        let daySuffix = "th"
        if (day === 1 || day === 21 || day === 31) {
            daySuffix = "st"
        } else if (day === 2 || day === 22) {
            daySuffix = "nd"
        } else if (day === 3 || day === 23) {
            daySuffix = "rd"
        }

        const month = months[date.getMonth()]
        const year = date.getFullYear()

        return `${month} ${day}${daySuffix}, ${year}`
    }

    return (
        <Layout user={user}>
            {post ? (
                <div className="w-full h-full flex flex-col items-center">
                    {/* bg-primary-100 dark:bg-primary-700 rounded-xl border border-primary-400 dark:border-primary-600 */}
                    <div className="w-full px-6 py-12 md:px-8 md:py-24 flex flex-col md:items-center">
                        <div className="md:w-full md:max-w-[40rem] lg:max-w-[50rem]">
                            <h1 className="text-5xl md:text-6xl font-semibold mb-4">
                                {post.title}
                            </h1>
                            <a
                                href={`https://www.jpxl.dev/`}
                                className="block mb-2 text-xl text-action-600 dark:text-action-400 underline hover:no-underline"
                            >
                                {writer?.fullName}
                            </a>
                            <div className="font-light flex flex-col md:flex-row items-baseline">
                                {formatDate(new Date(post.createdAt))}
                                &nbsp;&nbsp;
                                <span className="text-sm font-extralight">
                                    (Updated&nbsp;
                                    {formatDate(new Date(post.updatedAt))})
                                </span>
                            </div>
                            <div className="w-full flex flex-row flex-wrap mt-6 md:mt-8">
                                {post.tags.map(tag => (
                                    <Link
                                        to={`/tags/${tag}`}
                                        className="flex flex-row items-center shrink-0 p-1 pr-2 mt-1 mr-3 last:mr-0 border-2 text-sm rounded-xl border-action-600 dark:border-action-400 text-action-600 dark:text-action-400 hover:underline"
                                    >
                                        <HashtagIcon className="w-4 h-4 mr-1" />
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <article className="w-full h-full py-16 md:py-24 px-6 md:px-8 bg-primary-100 dark:bg-primary-700 flex flex-col items-center">
                        <ReactMarkdown
                            components={{
                                a({ href, children }) {
                                    if (href && href.startsWith("#")) {
                                        return (
                                            <LocalLink target={href}>
                                                {children}
                                            </LocalLink>
                                        )
                                    } else if (href && href.startsWith("/")) {
                                        return <Link to={href}>{children}</Link>
                                    } else {
                                        return (
                                            <a href={href} target="_blank">
                                                {children}
                                            </a>
                                        )
                                    }
                                }
                            }}
                            className="prose prose-lg prose-pre:p-0 prose-pre:max-w-full lg:prose-xl prose-code:font-normal prose-code:font-dm-mono prose-code:bg-primary-300 dark:prose-code:bg-primary-600 prose-code:rounded-md prose-code:px-1 prose-code:py-[0.125rem] dark:prose-p:font-light prose-blockquote:bg-white dark:prose-blockquote:bg-primary-900 prose-blockquote:py-2 prose-blockquote:pr-2 dark:prose-invert hover:prose-a:no-underline max-w-full md:max-w-[40rem] lg:max-w-[50rem]"
                            remarkPlugins={[
                                remarkToc,
                                remarkRehype,
                                rehypeSlug,
                                rehypeHighlight,
                                remarkGfm
                            ]}
                        >
                            {draft ? post.draftContent : post.content}
                        </ReactMarkdown>
                    </article>
                </div>
            ) : (
                <div>Post doesn't exist!</div>
            )}
        </Layout>
    )
}
