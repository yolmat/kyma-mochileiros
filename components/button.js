export default function Button({ children, type, typeButtonStyle, extraClass }) {
    return (
        <button
            type={type}
            className={`rounded-2xl px-8 py-4 text-base transition sm:w-auto w-full cursor-pointer ${typeButtonStyle} ${extraClass}`}
        >
            {children}
        </button>
    )
}