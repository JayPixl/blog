import { Link, useNavigate } from "@remix-run/react"

interface props {
    children?: React.ReactNode
    className?: string
    tooltipText?: string
    style?: React.CSSProperties
    size?: "small" | "large"
    link?: string
}

export default function TooltipDiv({
    children,
    className = "",
    tooltipText = "",
    style = {},
    size = "small",
    link
}: props) {
    return (
        <>
            {link ? (
                <Link
                    className={`block relative group ${className}`}
                    style={style}
                    to={link}
                >
                    {children}
                    <div
                        className={`absolute left-[50%] top-16 -translate-x-[50%] -translate-y-[130%] ${
                            size === "small" ? "p-2 text-sm" : "p-3"
                        } rounded-lg bg-zinc-900 hidden opacity-0 group-hover:block group-hover:opacity-100 group-hover:top-0 transition-all`}
                    >
                        {tooltipText}
                        <div className="absolute left-[50%] bottom-0 -translate-x-[50%] translate-y-[100%] border-transparent border-8 border-t-zinc-900" />
                    </div>
                </Link>
            ) : (
                <div className={`relative group ${className}`} style={style}>
                    {children}
                    <div
                        className={`absolute left-[50%] top-16 -translate-x-[50%] -translate-y-[130%] ${
                            size === "small" ? "p-2 text-sm" : "p-3"
                        } rounded-lg bg-zinc-900 hidden opacity-0 group-hover:block group-hover:opacity-100 group-hover:top-0 transition-all`}
                    >
                        {tooltipText}
                        <div className="absolute left-[50%] bottom-0 -translate-x-[50%] translate-y-[100%] border-transparent border-8 border-t-zinc-900" />
                    </div>
                </div>
            )}
        </>
    )
}
