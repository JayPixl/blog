import { User } from "@prisma/client"
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { SitemapFunction } from "remix-sitemap"
import AdminPanel from "~/components/admin-panel"
import Layout from "~/components/layout"
import { getUser } from "~/utils/users.server"

export const meta: MetaFunction = () => [
    {
        title: `Admin Home | jpxl.dev blog`
    }
]

export const loader: LoaderFunction = async ({ request }) => {
    const { user } = await getUser(request)
    if (!user) return redirect("/login")

    if (user.type !== "ADMIN") return redirect("/")

    return { user }
}

export const sitemap: SitemapFunction = () => ({
    exclude: true
})

export default function Admin() {
    const { user }: { user: User } = useLoaderData<typeof loader>()

    return (
        <Layout user={user}>
            <AdminPanel>
                <div className="w-full h-full p-4">
                    <h2 className="text-3xl">Admin Home</h2>
                </div>
            </AdminPanel>
        </Layout>
    )
}
