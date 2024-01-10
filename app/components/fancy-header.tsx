interface props {
    children: React.ReactNode
}

export default function FancyHeader({ children }: props) {
    return (
        <h1 className="text-3xl font-semibold my-4 self-center flex flex-row items-center justify-center">
            {children}
        </h1>
    )
}
