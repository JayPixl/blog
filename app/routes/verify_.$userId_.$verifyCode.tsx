import { CheckBadgeIcon } from "@heroicons/react/20/solid"
import { User } from "@prisma/client"
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import Layout from "~/components/layout"
import { prisma } from "~/utils/prisma.server"
import { getUser } from "~/utils/users.server"

export const meta: MetaFunction = () => [
    {
        title: `Verify User | jpxl.dev blog`
    }
]

export const loader: LoaderFunction = async ({ request, params }) => {
    const { user } = await getUser(request, false, true)

    if (
        !user ||
        user.id !== params.userId ||
        params.verifyCode !== user.verifyCode
    )
        return redirect("/")

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            verified: true
        }
    })

    return { user }
}

export default function VerifyUser() {
    const { user }: { user?: User } = useLoaderData<typeof loader>()
    return (
        <Layout user={user}>
            <div className="w-full h-[90vh] flex items-center justify-center">
                <div className="m-12 md:w-2/3 md:h-2/3 w-full h-2/3 bg-action-600 dark:bg-action-400 rounded-3xl flex flex-col items-center justify-center">
                    <CheckBadgeIcon className="w-36 h-36 text-white mb-8" />
                    <div className="text-2xl md:text-3xl font-semibold">
                        Verified Successfully!
                    </div>
                </div>
            </div>
        </Layout>
    )
}
