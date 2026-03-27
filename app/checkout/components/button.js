const Button = ({ children, type, onClick, isStepValid, extraClass }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isStepValid}
            className={`w-full md:w-auto ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl ${extraClass}`}
        >
            {children}
        </button>

    )
}

export default Button