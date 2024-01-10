import {
    ArrowUpTrayIcon,
    ArrowUturnLeftIcon,
    DocumentMagnifyingGlassIcon,
    EyeSlashIcon,
    GlobeAmericasIcon,
    HashtagIcon,
    InformationCircleIcon,
    TrashIcon
} from "@heroicons/react/20/solid"
import { Asset, Post, User } from "@prisma/client"
import {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
    json,
    redirect
} from "@remix-run/node"
import { Link, useLoaderData, useSubmit } from "@remix-run/react"
import { useRef, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import AdminPanel from "~/components/admin-panel"
import Layout from "~/components/layout"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"
import dashify from "dashify"

export const meta: MetaFunction = () => [
    {
        title: `Admin Edit Post | jpxl.dev blog`
    }
]

export const loader: LoaderFunction = async ({ request, params }) => {
    const { user } = await getUser(request)
    if (!user) return redirect("/login")

    if (user.type !== "ADMIN") return redirect("/")

    const post = await prisma.post.findUnique({ where: { id: params.postId! } })

    const assets = await prisma.asset.findMany()

    return { user, post, assets }
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()

    const content = form.get("content") as string
    const title = form.get("title") as string
    const action = form.get("action") as string
    const description = form.get("description") as string
    const tags = (form.get("tags") as string).split(",").map(tag => tag.trim())

    switch (action) {
        case "save": {
            try {
                await prisma.post.update({
                    where: {
                        id: params.postId
                    },
                    data: {
                        draftContent: content,
                        title,
                        tags,
                        description
                    }
                })
                return json({ success: true })
            } catch (e) {
                return json({ error: "Could not save draft...", exception: e })
            }
            break
        }
        case "publish": {
            try {
                await prisma.post.update({
                    where: {
                        id: params.postId
                    },
                    data: {
                        content: content,
                        draftContent: content,
                        title: title,
                        slug: dashify(title),
                        draft: false,
                        tags,
                        description
                    }
                })
                return json({ success: true })
            } catch (e) {
                return json({
                    error: "Could not publish post...",
                    exception: e
                })
            }
            break
        }
        case "unpublish": {
            try {
                await prisma.post.update({
                    where: {
                        id: params.postId
                    },
                    data: {
                        draft: true
                    }
                })
                return json({ success: true })
            } catch (e) {
                return json({
                    error: "Could not unpublish post...",
                    exception: e
                })
            }
            break
        }
        case "delete": {
            try {
                await prisma.post.delete({
                    where: {
                        id: params.postId
                    }
                })
                return redirect(`/admin/posts/edit`)
            } catch (e) {
                return json({
                    error: "Could not delete post...",
                    exception: e
                })
            }
            break
        }
        default: {
            return json({ error: `Invalid action: "${action}"` })
        }
    }

    return null
}

export default function EditPost() {
    const { user, post, assets }: { user: User; post: Post; assets: Asset[] } =
        useLoaderData<typeof loader>()
    const submit = useSubmit()

    const [lastSaveState, setLastSaveState] = useState({
        content: post.draftContent || "",
        title: post.title,
        tags: post.tags.join(", ")
    })

    const [inputs, setInputs] = useState({
        content: post.draftContent || "",
        title: post.title,
        tags: post.tags.join(", "),
        description: post.description || ""
    })

    const formRef = useRef<HTMLFormElement>(null)

    const submitForm = (
        actionType: "save" | "publish" | "unpublish" | "delete"
    ) => {
        const actionInput = document.createElement("input")
        actionInput.type = "hidden"
        actionInput.name = "action"
        actionInput.value = actionType

        formRef.current?.appendChild(actionInput)
        submit(formRef.current, { method: "POST" })

        actionInput.remove()
    }

    return (
        <Layout user={user}>
            <AdminPanel assets={assets}>
                <form
                    ref={formRef}
                    onSubmit={e => e.preventDefault()}
                    className="h-full w-full p-4"
                >
                    <div className="flex flex-row max-w-[90%] overflow-x-auto">
                        <button
                            onClick={() => submitForm("save")}
                            className="p-2 md:p-3 bg-green-600 dark:bg-green-500 text-white mr-1 md:mr-2 rounded-xl"
                        >
                            <ArrowUpTrayIcon className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                        <button
                            onClick={() =>
                                setInputs({
                                    content: post.content,
                                    title: post.title,
                                    tags: post.tags.join(", "),
                                    description: post.description || ""
                                })
                            }
                            className="p-2 md:p-3 bg-orange-600 dark:bg-orange-500 text-white mr-1 md:mr-2 rounded-xl"
                        >
                            <ArrowUturnLeftIcon className="w-5 h-5 md:h-6 md:w-6" />
                        </button>
                        <button
                            onClick={() => submitForm("publish")}
                            className="p-2 md:p-3 bg-blue-600 dark:bg-blue-500 text-white mr-1 md:mr-2 rounded-xl"
                        >
                            <GlobeAmericasIcon className="w-5 h-5 md:h-6 md:w-6" />
                        </button>
                        <button
                            onClick={() => submitForm("unpublish")}
                            className="p-2 md:p-3 bg-gray-600 dark:bg-gray-500 text-white mr-1 md:mr-2 rounded-xl"
                        >
                            <EyeSlashIcon className="w-5 h-5 md:h-6 md:w-6" />
                        </button>
                        <Link
                            to={`/posts/${post.slug}?draft=true`}
                            target="_blank"
                            className="p-2 md:p-3 bg-action-600 dark:bg-action-400 text-white mr-1 md:mr-2 rounded-xl"
                        >
                            <DocumentMagnifyingGlassIcon className="w-5 h-5 md:h-6 md:w-6" />
                        </Link>
                        <button
                            onClick={() => submitForm("delete")}
                            className="p-2 md:p-3 bg-red-600 dark:bg-red-500 text-white mr-1 md:mr-2 rounded-xl"
                        >
                            <TrashIcon className="w-5 h-5 md:h-6 md:w-6" />
                        </button>
                    </div>
                    <input
                        type="text"
                        name="title"
                        value={inputs.title}
                        onChange={e =>
                            setInputs({ ...inputs, title: e.target.value })
                        }
                        className="w-full my-4 rounded-md p-4 outline-0 md:text-lg bg-white dark:bg-primary-700 border-2 border-action-600 dark:border-action-400"
                    />
                    <div className="mb-4 rounded-md p-4 bg-white dark:bg-primary-700 border-2 border-action-600 dark:border-action-400 flex flex-row items-center">
                        <HashtagIcon className="w-5 h-5 mr-2 shrink-0" />
                        <input
                            type="text"
                            name="tags"
                            value={inputs.tags}
                            onChange={e =>
                                setInputs({ ...inputs, tags: e.target.value })
                            }
                            className="w-full outline-0 md:text-lg bg-inherit"
                        />
                    </div>
                    <div className="mb-4 rounded-md p-4 bg-white dark:bg-primary-700 border-2 border-action-600 dark:border-action-400 flex flex-row items-center">
                        <InformationCircleIcon className="w-5 h-5 mr-2 shrink-0" />
                        <input
                            type="text"
                            name="description"
                            value={inputs.description}
                            onChange={e =>
                                setInputs({
                                    ...inputs,
                                    description: e.target.value
                                })
                            }
                            className="w-full outline-0 md:text-lg bg-inherit"
                        />
                    </div>
                    <ReactTextareaAutosize
                        name="content"
                        value={inputs.content}
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                content: e.target.value
                            })
                        }
                        minRows={5}
                        maxRows={20}
                        spellCheck={false}
                        className="w-full  resize-none rounded-md p-4 outline-0 md:text-lg bg-white dark:bg-primary-700 border-2 border-action-600 dark:border-action-400"
                    />
                </form>
            </AdminPanel>
        </Layout>
    )
}
