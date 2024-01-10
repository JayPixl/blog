import {
    InformationCircleIcon,
    ShieldExclamationIcon,
    XCircleIcon
} from "@heroicons/react/20/solid"
import { User } from "@prisma/client"
import {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
    json,
    redirect
} from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { SitemapFunction } from "remix-sitemap"
import FancyButton from "~/components/fancy-button"
import FancyForm from "~/components/fancy-form"
import FancyHeader from "~/components/fancy-header"
import FancyInput from "~/components/fancy-input"
import Layout from "~/components/layout"
import { authenticateAdmin, getUser } from "~/utils/users.server"

export const meta: MetaFunction = () => [
    {
        title: `Admin Login | jpxl.dev blog`
    }
]

export const sitemap: SitemapFunction = () => ({
    exclude: true
})

export const loader: LoaderFunction = async ({ request }) => {
    const { user } = await getUser(request)
    if (!user) return redirect("/login")

    if (user.type === "ADMIN") return redirect("/admin")

    return { user }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const key = form.get("key") as string

    const { authenticated, error } = await authenticateAdmin(request, key)

    if (error && !authenticated) {
        return json({ error, fields: { key } })
    }

    return json({})
}

export default function Admin() {
    const { user }: { user: User } = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()

    const [inputs, setInputs] = useState({
        key: actionData?.fields?.key || ""
    })
    return (
        <Layout user={user}>
            <div className="w-full h-[90vh] flex justify-center items-center">
                <FancyForm>
                    <FancyHeader>
                        Admin Login&nbsp;
                        <ShieldExclamationIcon className="h-8 w-8 text-blue-500" />
                    </FancyHeader>

                    {actionData?.error && (
                        <div className="flex flex-row items-center py-3 font-bold text-lg">
                            <XCircleIcon className="w-5 h-5 text-red-500" />
                            <span>&nbsp;{actionData.error}</span>
                        </div>
                    )}

                    <div className="flex flex-row items-center py-3 md:text-lg">
                        <InformationCircleIcon className="w-5 h-5 text-action-600 dark:text-action-400" />
                        <span>&nbsp;Logged in as&nbsp;</span>
                        <span className="dark:text-action-400 text-action-600 underline">
                            {user.email}
                        </span>
                    </div>
                    <FancyInput
                        label="Admin Key"
                        name="key"
                        type="password"
                        value={inputs.key}
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                [e.currentTarget.name]: e.target.value
                            })
                        }
                        error={actionData?.fieldErrors?.key}
                    />
                    <FancyButton>REGISTER</FancyButton>
                </FancyForm>
            </div>
        </Layout>
    )
}
