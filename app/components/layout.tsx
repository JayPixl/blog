import {
    ArrowUpIcon,
    CheckCircleIcon,
    Cog6ToothIcon,
    EnvelopeIcon,
    XCircleIcon,
    XMarkIcon
} from "@heroicons/react/20/solid"
import LocalLink from "./local-link"
import Navbar from "./navbar"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"
import { Modal } from "./modal"
import { Link, useFetcher } from "@remix-run/react"
import FancyInput from "./fancy-input"
import { ImageUploader } from "./image-uploader"
import FancyButton from "./fancy-button"
import FancyHeader from "./fancy-header"

export default function Layout({
    children,
    user
}: {
    children: React.ReactNode
    user?: User
}) {
    const [scroll, setScroll] = useState(0)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [inputs, setInputs] = useState({
        fullName: user?.fullName || "",
        avatarUrl: user?.avatarUrl || "/images/blank-pfp.png",
        nickname: user?.nickname || ""
    })
    const [loading, setLoading] = useState(false)
    const fetcher = useFetcher()
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY)
        })
    }, [])
    return (
        <>
            <LocalLink
                className={`cursor-pointer fixed bottom-5 right-5 md:bottom-10 md:right-10 opacity-50 hover:opacity-100 rounded-full flex items-center justify-center p-3 md:p-5 shadow-2xl bg-white dark:bg-primary-dark-950 transition z-40 text-action-600 dark:text-action-400 ${
                    scroll > 100
                        ? "translate-y-0"
                        : "translate-y-[200px] opacity-0"
                }`}
                target={0}
            >
                <ArrowUpIcon className="w-5 h-5 md:w-8 md:h-8" />
            </LocalLink>
            {user && (
                <div
                    className={`fixed bottom-0 group left-0 p-6 md:p-8 z-50 transition-opacity opacity-70 hover:opacity-100`}
                >
                    <div className="w-full h-full relative p-1 bg-primary-800 dark:bg-primary-200 rounded-full">
                        <img
                            src={user?.avatarUrl || "/images/blank-pfp.png"}
                            className="h-12 w-12 md:h-16 md:w-16 rounded-full"
                        />
                        <div className="absolute -top-5 -translate-y-[100%] -left-[25%] hidden group-hover:flex flex-row items-center">
                            <div
                                className="rounded-full p-1 mr-1 cursor-pointer bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200"
                                onClick={() => setSettingsOpen(true)}
                            >
                                <Cog6ToothIcon className="w-8 h-8" />
                            </div>
                            <div className="w-full h-full relative">
                                <div className="bg-primary-800 dark:bg-primary-200 whitespace-nowrap p-3 text-primary-200 dark:text-primary-800 rounded-bl-none rounded-xl flex flex-col">
                                    <div className="font-semibold text-lg">
                                        {user.nickname || user.fullName}
                                        &nbsp;&nbsp;
                                        <Link
                                            to={`/logout`}
                                            className="underline hover:no-underline text-red-400 font-normal"
                                        >
                                            logout
                                        </Link>
                                    </div>
                                    <div className="font-light italic">
                                        {user.email}
                                    </div>
                                </div>
                                <div className="border-t-primary-800 dark:border-t-primary-200 border-r-transparent border-0 border-t-[0.5rem] border-r-[1.5rem] absolute" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal
                isOpen={settingsOpen}
                onClick={() => setSettingsOpen(false)}
                className="w-full md:w-2/3 flex flex-col relative"
            >
                <div
                    className="p-4 absolute top-0 right-0 cursor-pointer"
                    onClick={() => setSettingsOpen(false)}
                >
                    <XMarkIcon className="w-8 h-8" />
                </div>
                <FancyHeader>User Settings</FancyHeader>
                <fetcher.Form
                    method="POST"
                    action="/user-settings"
                    className="flex flex-col"
                >
                    <div className="self-center my-4">
                        <ImageUploader
                            imageUrl={
                                inputs.avatarUrl || "/images/blank-pfp.png"
                            }
                            loading={loading}
                            onChange={async (file: File) => {
                                const formData = new FormData()
                                formData.append("image", file)
                                console.log(file.name, name)
                                setLoading(l => true)

                                const result = await fetch(
                                    "/upload-image?type=avatar",
                                    {
                                        method: "POST",
                                        body: formData
                                    }
                                )

                                const {
                                    image,
                                    error
                                }: { image?: string; error?: string } =
                                    await result.json()
                                console.log(image, error)
                                setInputs({
                                    ...inputs,
                                    avatarUrl: image || inputs.avatarUrl
                                })
                                setLoading(l => false)
                            }}
                            type="circle"
                        />
                    </div>

                    <input
                        type="hidden"
                        name="avatarUrl"
                        value={inputs.avatarUrl}
                    />

                    {(fetcher?.data as any)?.error && (
                        <div className="flex flex-row items-center py-3 font-bold text-lg">
                            <XCircleIcon className="w-5 h-5 text-red-500" />
                            <span>&nbsp;{(fetcher.data as any)?.error}</span>
                        </div>
                    )}

                    {(fetcher?.data as any)?.success && (
                        <div className="flex flex-row items-center py-3 font-bold text-lg text-green-500">
                            <span>{(fetcher.data as any)?.success}</span>
                        </div>
                    )}

                    {user?.verified ? (
                        <div className="my-2 text-action-600 dark:text-action-400 flex flex-row items-center">
                            <div>Verified!</div>
                            <CheckCircleIcon className="w-6 h-6 ml-1" />
                        </div>
                    ) : (
                        <button
                            name="_action"
                            value="reverify"
                            className="my-2 text-red-500 dark:text-red-400 underline hover:no-underline self-start"
                        >
                            Resend Verification Email
                        </button>
                    )}

                    <button
                        name="_action"
                        value="password"
                        className="mb-3 mt-1 text-amber-500 dark:text-amber-400 underline hover:no-underline self-start"
                    >
                        Change Password
                    </button>

                    <FancyInput
                        label="Full Name"
                        name="fullName"
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                [e.target.name]: e.target.value
                            })
                        }
                        type="text"
                        value={inputs.fullName}
                        error={(fetcher?.data as any)?.fieldErrors?.fullName}
                    />
                    <FancyInput
                        label="Nickname"
                        name="nickname"
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                [e.target.name]: e.target.value
                            })
                        }
                        type="text"
                        value={inputs.nickname}
                        error={(fetcher?.data as any)?.fieldErrors?.nickname}
                    />

                    <div className="w-full flex flex-row items-center justify-start my-3">
                        <EnvelopeIcon className="shrink-0 w-8 h-8 mr-3" />
                        <button
                            className="font-semibold underline hover:no-underline"
                            name="_action"
                            value="email"
                        >
                            {user?.email}
                        </button>
                    </div>

                    <FancyButton name="_action" value="save" type="submit">
                        Submit
                    </FancyButton>
                </fetcher.Form>
            </Modal>
            <div
                className={`relative w-full min-h-[100vh] bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 font-fira-sans`}
            >
                <Navbar
                    pageColors={{
                        text: "text-action-600 dark:text-action-400",
                        hoverText:
                            "hover:text-action-600 hover:dark:text-action-400"
                    }}
                />
                {children}
                <footer className="w-full h-[20vh] bg-white dark:bg-primary-900 flex flex-col justify-between items-center">
                    <div className="h-full flex flex-row justify-center items-center">
                        <Link
                            to={`/admin`}
                            className="p-2 underline hover:no-underline"
                        >
                            Admin
                        </Link>
                        &nbsp;|&nbsp;
                        <a
                            className="p-2 underline hover:no-underline"
                            href="mailto:hello@jpxl.dev"
                        >
                            Support
                        </a>
                    </div>

                    <div className="w-full text-center p-2 text-lg font-semibold italic text-white bg-action-600 dark:bg-action-400">
                        jpxl.dev 2023
                    </div>
                </footer>
            </div>
        </>
    )
}
