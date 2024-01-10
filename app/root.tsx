import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError
} from "@remix-run/react"
import { useEffect } from "react"
import { ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules"

//import "highlight.js/styles/github-dark.css"

import tailwind from "./tailwind.css"
import { loadNimaEngine } from "./utils/nima-engine"

export const meta: MetaFunction = () => [
    {
        title: `jpxl.dev blog`
    },
    {
        name: "description",
        content: "Welcome to jpxl.dev blog!"
    }
]

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: tailwind },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
    },
    {
        href: "https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playpen+Sans:wght@100;200;300;400;500;600;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap",
        rel: "stylesheet"
    },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])
]

export const ErrorBoundary: ErrorBoundaryComponent = () => {
    const error: any = useRouteError()
    console.error(error)

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <title>Something Went Wrong...</title>
                <link rel="icon" href="/images/avatar.png" />
                <Meta />
                <Links />
            </head>
            <body>
                <div className="w-full h-full max-h-[100vh] relative">
                    <div className="w-full py-12 px-8 flex flex-col items-center justify-center">
                        <div className="text-3xl py-4 font-semibold">
                            Something Went Wrong...
                        </div>
                        <div className={`py-3 px-2 border-b border-action-600`}>
                            <span className="font-semibold text-lg">
                                {error.status} {error.statusText}
                            </span>
                            &nbsp;-&nbsp;<span>{error.data}</span>
                        </div>
                        <div className="text-xl py-8">
                            When life gives you lemons, make lemonade.
                        </div>
                        <Link
                            to={"/"}
                            className={`px-8 py-2 text-2xl bg-action-600 text-white rounded-lg hover:scale-105 transition`}
                        >
                            🍋 Back to Home 🍋
                        </Link>
                    </div>
                </div>
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

        //hljs.highlightAll()
        loadNimaEngine()
    }, [])

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/images/avatar.png" />
                <Meta />
                <Links />
            </head>
            <body className="overscroll-none max-w-[100vw] min-h-[100vh] overflow-x-hidden relative overflow-y-auto">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
