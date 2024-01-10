import {
    CloudIcon,
    PencilSquareIcon,
    PlusIcon,
    UserGroupIcon,
    XMarkIcon
} from "@heroicons/react/20/solid"
import { Link, useFetcher } from "@remix-run/react"
import { useState } from "react"
import { Modal } from "./modal"
import FancyHeader from "./fancy-header"
import { Asset } from "@prisma/client"
import { ImageUploader } from "./image-uploader"
import copy from "copy-to-clipboard"

interface props {
    children: React.ReactNode
    assets?: Asset[]
}

export default function AdminPanel({ children, assets }: props) {
    const [myAssets, setMyAssets] = useState(assets)
    const [assetsOpen, setAssetsOpen] = useState(false)
    const [assetsFolder, setAssetsFolder] = useState("/")
    const [loading, setLoading] = useState(false)
    const fetcher = useFetcher()
    return (
        <>
            <div className="w-full min-h-[90vh] flex flex-row relative">
                <div className="w-[5rem] h-[90vh] fixed shadow-2xl flex flex-col items-center justify-start py-2 bg-primary-100 dark:bg-primary-700 overscroll-auto z-30">
                    <Link
                        to="/admin/posts/new"
                        className="my-2 p-3 font-semibold flex flex-row items-center justify-center rounded-xl hover:underline text-white bg-action-600 dark:bg-action-400 border-2 border-action-600 dark:border-action-400"
                    >
                        <PlusIcon className="h-6 w-6" />
                    </Link>
                    <Link
                        to="/admin/posts/edit"
                        className="my-2 p-3 font-semibold flex flex-row items-center justify-center rounded-xl hover:underline bg-white dark:bg-primary-900 border-2 border-primary-800 dark:border-primary-200"
                    >
                        <PencilSquareIcon className="h-6 w-6" />
                    </Link>
                    <Link
                        to="/admin/users"
                        className="my-2 p-3 font-semibold flex flex-row items-center justify-center rounded-xl hover:underline bg-white dark:bg-primary-900 border-2 border-primary-800 dark:border-primary-200"
                    >
                        <UserGroupIcon className="h-6 w-6" />
                    </Link>
                    {assets && (
                        <div
                            onClick={() => setAssetsOpen(!assetsOpen)}
                            className="my-2 p-3 font-semibold flex flex-row items-center justify-center rounded-xl hover:underline bg-white dark:bg-primary-900 border-2 border-primary-800 dark:border-primary-200 cursor-pointer"
                        >
                            <CloudIcon className="h-6 w-6" />
                        </div>
                    )}
                </div>

                <div className="w-[5rem] h-[90vh] shrink-0"></div>

                <div className="w-full min-h-[90vh]">{children}</div>
            </div>
            <Modal
                className="w-full md:w-2/3 flex flex-col relative"
                isOpen={assetsOpen}
                onClick={() => setAssetsOpen(false)}
            >
                <div
                    className="p-4 absolute top-0 right-0 cursor-pointer"
                    onClick={() => setAssetsOpen(false)}
                >
                    <XMarkIcon className="w-8 h-8" />
                </div>
                <FancyHeader>Assets</FancyHeader>
                {/* <fetcher.Form method="POST" action="/assets"> */}
                <ImageUploader
                    loading={loading}
                    onChange={async (file: File) => {
                        const formData = new FormData()
                        formData.append("image", file)
                        //console.log(file.name)
                        setLoading(l => true)

                        const result = await fetch("/upload-image?type=asset", {
                            method: "POST",
                            body: formData
                        })

                        const {
                            image,
                            error
                        }: { image?: string; error?: string } =
                            await result.json()
                        console.log(image, error)
                        if (image && !error) {
                            const submitForm = new FormData()
                            submitForm.append("_action", "newasset")
                            submitForm.append("imageUrl", image)

                            const result = await fetch("/assets", {
                                method: "POST",
                                body: submitForm
                            })

                            const {
                                error,
                                asset
                            }: { error?: string; asset?: Asset } =
                                await result.json()

                            if (asset) setMyAssets([...(myAssets || []), asset])
                        }
                        // setInputs({
                        //     ...inputs,
                        //     avatarUrl: image || inputs.avatarUrl
                        // })
                        setLoading(l => false)
                    }}
                    type="circle"
                />
                {myAssets?.map(asset => (
                    <fetcher.Form
                        key={asset.id}
                        method="POST"
                        action="/assets"
                        className="w-32 h-32 flex flex-col items-center justify-center p-2 border border-action-600 dark:border-action-400 rounded-lg cursor-pointer"
                        onClick={e => {
                            copy(asset.url)
                        }}
                    >
                        <img
                            src={asset.url}
                            alt={asset.title}
                            className="h-[60%] max-w-[80%]"
                        />
                        <div className="whitespace-nowrap">{asset.title}</div>
                    </fetcher.Form>
                ))}
            </Modal>
        </>
    )
}
