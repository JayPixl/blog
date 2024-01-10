import { routes } from "@remix-run/dev/server-build"
import { LoaderFunction } from "@remix-run/node"
import { experimental_sitemap } from "~/utils/sitemap.server"

export const loader: LoaderFunction = async ({ request }) => {
    return await experimental_sitemap(request, routes)
}
