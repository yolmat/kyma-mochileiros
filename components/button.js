export default function Button({ children, type, typeStyle, extraClass, disabled, onClick }) {

    const action = "bg-[#FF7A18] font-bold text-white hover:bg-[#F4A261]"
    const information = "border border-white/15 bg-white/5 font-semibold text-[#CFCFCF] hover:border-[#2EC4B6] hover:text-[#2EC4B6]"
    const social = "mt-10 inline-flex items-center gap-3 border border-[#FF7A18]/30 bg-[#FF7A18]/10 text-lg font-bold text-[#FF7A18] transition hover:bg-[#FF7A18] hover:text-white"

    let typeButtonStyle

    if (typeStyle === 'action') {
        typeButtonStyle = action
    }

    switch (typeStyle) {
        case 'action':
            typeButtonStyle = action
            break;

        case 'information':
            typeButtonStyle = information
            break;

        case 'social':
            typeButtonStyle = social
            break;

        default:
            break;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-2xl px-8 py-4 text-base transition sm:w-auto w-full cursor-pointer ${typeButtonStyle} ${extraClass}`}
        >
            {children}
        </button>
    )
}