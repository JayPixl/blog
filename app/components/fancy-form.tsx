interface props {
    children: React.ReactNode
}

export default function FancyForm({ children }: props) {
    return (
        <form
            method="POST"
            className="p-4 md:p-8 m-4 flex flex-col w-full md:w-2/3 max-w-[45rem] max-h-[75vh] overflow-y-auto bg-primary-100 dark:bg-primary-900 shadow-lg"
        >
            {children}
        </form>
    )
}
