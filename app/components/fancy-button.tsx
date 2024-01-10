interface props {
    children: React.ReactNode
    name?: string
    type?: "button" | "submit" | "reset"
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
    value?: string
}

export default function FancyButton({
    children,
    name,
    type,
    onClick,
    value
}: props) {
    return (
        <button
            name={name}
            type={type}
            onClick={onClick}
            value={value}
            className="nima-button text-xl font-bold py-3 px-6 mt-12 mb-4 self-center flex flex-row items-center justify-center text-primary-100 dark:text-white rounded-full bg-action-600 dark:bg-action-400"
        >
            {children}
        </button>
    )
}
