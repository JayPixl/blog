import { useEffect, useRef, useState } from "react"
import { changeThemes, getTheme } from "~/utils/darkmode"
import LocalLink from "./local-link"
import { Link, useFetcher } from "@remix-run/react"
import {
    MoonIcon,
    SunIcon,
    ComputerDesktopIcon,
    MagnifyingGlassIcon,
    XMarkIcon
} from "@heroicons/react/20/solid"
import { Post } from "@prisma/client"

interface props {
    ext?: boolean
    pageColors: {
        text: string
        hoverText: string
    }
}

export default function Navbar({ ext = false, pageColors }: props) {
    const [theme, setTheme] = useState<"system" | "light" | "dark">()
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const searchBarRef = useRef<HTMLInputElement>(null)

    const fetcher = useFetcher()

    useEffect(() => {
        if (searchQuery.length) fetcher.load(`/search?q=${searchQuery}`)
    }, [searchQuery])

    useEffect(() => {
        setTheme(getTheme())
    }, [])

    const setNewTheme: (
        newTheme: "system" | "light" | "dark"
    ) => void = newTheme => {
        changeThemes(newTheme)
    }

    return (
        <div className="w-full h-[10vh] sticky top-0 md:py-4 bg-primary-200 dark:bg-primary-800 bg-opacity-75 dark:bg-opacity-[60%] dark:backdrop-saturate-[120%] backdrop-blur-sm shadow-xl z-30">
            <div className="w-full h-full relative">
                <Link
                    to={`/`}
                    className="absolute top-[50%] left-[50%] -translate-x-[50%] cursor-pointer -translate-y-[50%] text-lg sm:text-xl md:text-2xl font-fira-mono hover:scale-105 transition"
                >
                    <span className={`${pageColors.text}`}>blog</span>
                    <span className="text-primary-800 dark:text-primary-200">
                        .jpxl
                    </span>
                    <span className={`text-primary-500`}>.dev</span>
                </Link>
                {!ext && (
                    <>
                        <div
                            className={`nima-hamburger absolute left-5 top-[50%] -translate-y-[50%] cursor-pointer p-4 z-40`}
                            onClick={() => {
                                setSearchOpen(!searchOpen)
                                !searchOpen &&
                                    searchBarRef.current &&
                                    searchBarRef.current.focus()
                            }}
                        >
                            {searchOpen ? (
                                <XMarkIcon className="w-6 h-6 md:w-8 md:h-8" />
                            ) : (
                                <MagnifyingGlassIcon className="w-6 h-6 md:w-8 md:h-8" />
                            )}
                        </div>
                    </>
                )}
            </div>

            {!ext && (
                <div
                    className={`absolute top-[100%] lg:hidden flex items-center flex-col justify-center left-0 p-2 w-full bg-primary-200 dark:bg-primary-800 bg-opacity-75 dark:bg-opacity-[60%] dark:backdrop-saturate-[120%] backdrop-blur-sm shadow-xl transition ${
                        searchOpen
                            ? "translate-y-0 opacity-100 z-40"
                            : "-translate-y-[100%] opacity-0 -z-10"
                    }`}
                >
                    <div className="h-full w-full md:w-2/3 flex flex-row items-center py-3 px-6 rounded-full bg-primary-100 dark:bg-primary-700">
                        <input
                            ref={searchBarRef}
                            type="text"
                            className="w-full bg-transparent text-xl outline-none"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                        />
                        <MagnifyingGlassIcon className="shrink-0 w-6 h-6 ml-2" />
                    </div>
                    {!!searchQuery.length && (
                        <div className="h-full w-full mt-4 md:w-2/3 flex flex-col items-center py-3 px-6 rounded-lg bg-primary-100 dark:bg-primary-700 max-h-[50vh] overflow-y-auto">
                            {fetcher?.data &&
                            ((fetcher.data as any).results.users.length ||
                                (fetcher.data as any).results.posts.length ||
                                (fetcher.data as any).results.tags.length) ? (
                                <>
                                    {!!(fetcher.data as any).results.posts
                                        .length && (
                                        <div className="w-full">
                                            <div className="w-full border-b-2 border-primary-800 dark:border-primary-200 py-1 font-bold text-xl mt-2 mb-4">
                                                Posts
                                            </div>
                                            <div className="w-full px-2">
                                                {(
                                                    fetcher.data as any
                                                ).results.posts.map(
                                                    (post: { item: Post }) => (
                                                        <Link
                                                            to={`/posts/${post.item.id}`}
                                                            className="block w-full mb-4 group"
                                                        >
                                                            <div className="font-semibold underline group-hover:no-underline">
                                                                {
                                                                    post.item
                                                                        .title
                                                                }
                                                            </div>
                                                            <div className="w-full">
                                                                {post.item.tags.map(
                                                                    tag => (
                                                                        <span className="text-action-600 dark:text-action-400 mr-1 text-sm">
                                                                            #
                                                                            {
                                                                                tag
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className="w-full text-xs italic">
                                                                {
                                                                    post.item
                                                                        .description
                                                                }
                                                            </div>
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {!!(fetcher.data as any).results.tags
                                        .length && (
                                        <div className="w-full">
                                            <div className="w-full border-b-2 border-primary-800 dark:border-primary-200 py-1 font-bold text-xl mb-4">
                                                Tags
                                            </div>
                                            <div className="w-full px-2 flex flex-row flex-wrap">
                                                {(
                                                    fetcher.data as any
                                                ).results.tags.map(
                                                    (tag: { item: string }) => (
                                                        <Link
                                                            to={`/tags/${tag.item}`}
                                                            className="group"
                                                        >
                                                            <div className="font-semibold underline group-hover:no-underline mr-2 text-action-600 dark:text-action-400 last:mb-4">
                                                                #{tag.item}
                                                            </div>
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                "No Results"
                            )}
                        </div>
                    )}
                </div>
            )}

            {!ext && (
                <>
                    <div
                        className={`nima-theme absolute right-5 top-[50%] -translate-y-[calc(0.75rem+4px)] md:-translate-y-[calc(1rem+4px)] bg-primary-800 dark:bg-primary-200 flex justify-center items-center rounded-full options-bar`}
                    >
                        <div
                            className={`slider bg-primary-800 dark:bg-primary-200 flex flex-col justify-start items-center p-[2px] rounded-full relative h-[calc(1.5rem+4px)] md:h-[calc(2rem+4px)] md:w-[calc(2rem+4px)] w-[calc(1.5rem+4px)] overflow-hidden py-[2px]`}
                        >
                            <div className="flex flex-col justify-center items-center dark:bg-primary-800 bg-primary-200 text-primary-800 dark:text-primary-200 rounded-full shrink-0 h-6 w-6 md:w-8 md:h-8 p-[3px]">
                                {theme === "dark" ? (
                                    <MoonIcon className="setting-button h-6 w-6 md:w-8 md:h-8" />
                                ) : theme === "light" ? (
                                    <SunIcon className="setting-button h-6 w-6 md:w-8 md:h-8" />
                                ) : (
                                    <ComputerDesktopIcon className="setting-button h-6 w-6 md:w-8 md:h-8" />
                                )}
                            </div>
                            <div className="flex flex-col justify-between h-full lg:pt-2 dark:text-primary-800 text-primary-200">
                                <MoonIcon
                                    className="theme-button h-6 w-6 md:w-8 md:h-8 mt-2 cursor-pointer opacity-0"
                                    onClick={() => setNewTheme("dark")}
                                />
                                <SunIcon
                                    className="theme-button h-6 w-6 md:w-8 md:h-8 mt-2 cursor-pointer opacity-0"
                                    onClick={() => setNewTheme("light")}
                                />
                                <ComputerDesktopIcon
                                    className="theme-button h-6 w-6 md:w-8 md:h-8 mt-2 cursor-pointer opacity-0"
                                    onClick={() => setNewTheme("system")}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
