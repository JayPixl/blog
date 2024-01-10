interface props {
    label: string
    type: string
    name: string
    error?: string
    value: string
    onChange: (...args: any) => any
    required?: boolean
}

export default function FancyInput({
    type,
    name,
    label,
    error,
    value,
    onChange,
    required
}: props) {
    return (
        <div className="nima-input-box shrink-0 p-3 mt-6 mb-3 h-12 text-lg border-b-primary-700 dark:border-b-primary-300 border-b-2 relative">
            <label className="placeholder absolute text-primary-700 dark:text-primary-300">
                {label}
            </label>
            <input
                type={type}
                name={name}
                className="input bg-transparent outline-0 absolute z-10 w-[calc(100%_-_1.5rem)]"
                value={value}
                onChange={onChange}
                required={required}
            />
            <div className="absolute bottom-0 translate-y-[115%] text-sm text-red-600">
                {error}
            </div>
        </div>
    )
}
