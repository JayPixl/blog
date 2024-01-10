interface props {
    children: React.ReactNode
    className?: string
    target: string | number
}

export default function LocalLink({ children, className, target }: props) {
    const handleClick: (e: React.MouseEvent) => void = e => {
        e.preventDefault()
        if (typeof target === "string") {
            window.scrollTo({
                top:
                    document.getElementById(
                        target.startsWith("#") ? target.slice(1) : target
                    )!.offsetTop -
                    (window.innerHeight / 10 + 8),
                behavior: "smooth"
            })
        } else {
            window.scrollTo({
                top: target,
                behavior: "smooth"
            })
        }
    }

    return (
        <a
            className={`${className}`}
            href={typeof target === "string" ? target : "#"}
            onClick={e => handleClick(e)}
        >
            {children}
        </a>
    )
}
