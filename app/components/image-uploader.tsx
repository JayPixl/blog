import { PlusIcon } from "@heroicons/react/20/solid"
import { useRef, useState } from "react"

interface props {
    onChange: (...args: any) => any
    type: "circle" | "medium square"
    imageUrl?: string
    maxSize?: number
    loading: boolean
}

export const ImageUploader = ({
    onChange,
    imageUrl,
    loading,
    type,
    maxSize = 2
}: props) => {
    const [draggingOver, setDraggingOver] = useState(false)
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const dropRef = useRef(null)

    const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        preventDefaults(e)
        setError("")
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (e.dataTransfer.files[0].size > maxSize * 1048576) {
                setError("Exceeds max size")
            } else onChange(e.dataTransfer.files[0])
            e.dataTransfer.clearData()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            if (event.currentTarget.files[0].size > maxSize * 1048576) {
                setError("Exceeds max size")
            } else onChange(event.currentTarget.files[0])
        }
    }

    return (
        <>
            <div
                ref={dropRef}
                className={`${
                    draggingOver
                        ? "border-4 border-dashed border-bittersweet border-rounded"
                        : ""
                } group relative 
                    ${type === "circle" ? "rounded-full w-16 h-16" : ""} 
                    ${type === "medium square" ? "rounded-xl w-52 h-28" : ""}
                    flex justify-center items-center bg-gray-400 transition duration-300 ease-in-out hover:bg-gray-500 cursor-pointer overflow-hidden bg-center`}
                style={{
                    backgroundSize: "cover",
                    ...(imageUrl
                        ? { backgroundImage: `url(${imageUrl})` }
                        : { backgroundImage: `url(/images/blank-pfp.png)` })
                }}
                onDragEnter={() => setDraggingOver(true)}
                onDragLeave={() => setDraggingOver(false)}
                onDrag={preventDefaults}
                onDragStart={preventDefaults}
                onDragEnd={preventDefaults}
                onDragOver={preventDefaults}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                {
                    <div
                        className={`absolute w-full h-full bg-blue-400 opacity-50 transition duration-300 ease-in-out group-hover:opacity-0`}
                    />
                }
                {!loading ? (
                    <PlusIcon className="w-8 h-8 z-10 text-gray-200 group-hover:opacity-0 transition-opacity" />
                ) : (
                    <div className="h-8 w-8 border-transparent border-t-gray-200 border-4 animate-spin rounded-full" />
                )}
                {!loading && (
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                    />
                )}
            </div>
            <div className="text-red-400">{error}</div>
        </>
    )
}
