import { LoaderFunction } from "@remix-run/node"
import { robots } from "~/utils/sitemap.server"

export const loader: LoaderFunction = ({ request }) => {
    return robots() as any
}
