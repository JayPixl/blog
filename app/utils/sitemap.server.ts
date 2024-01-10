import { createSitemapGenerator } from "remix-sitemap"

export const { experimental_sitemap, robots } = createSitemapGenerator({
    siteUrl: "https://blog.jpxl.dev"
})
