import { Portal } from "./portal"

interface props {
    children: React.ReactNode
    isOpen: boolean
    ariaLabel?: string
    className?: string
    onClick?: (...args: any) => any
}

export const Modal: React.FC<props> = ({
    children,
    isOpen,
    ariaLabel,
    className,
    onClick
}) => {
    if (!isOpen) return null

    return (
        <Portal wrapperId="modal">
            <div
                className="fixed inset-0 overflow-y-auto bg-primary-500 bg-opacity-50 backdrop-blur-sm z-[60]"
                aria-labelledby={ariaLabel ?? "modal-title"}
                role="dialog"
                aria-modal="true"
                onClick={onClick}
            ></div>
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen z-[70]">
                <div
                    className={`${className} p-4 bg-primary-200 text-primary-800 dark:text-primary-200 dark:bg-primary-800 pointer-events-auto max-h-[80%] max-w-[80%] overflow-auto rounded-md md:rounded-xl`}
                >
                    {children}
                </div>
            </div>
        </Portal>
    )
}
