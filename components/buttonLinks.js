import Link from "next/link"
import Button from "@/components/button"
export default function ButtonLinks({ children, target, href, typeButton, internal, extraClass }) {

    const action = "bg-[#FF7A18] font-bold text-white hover:bg-[#F4A261]"
    const information = "border border-white/15 bg-white/5 font-semibold text-[#CFCFCF] hover:border-[#2EC4B6] hover:text-[#2EC4B6]"
    const social = "mt-10 inline-flex items-center gap-3 border border-[#FF7A18]/30 bg-[#FF7A18]/10 text-lg font-bold text-[#FF7A18] transition hover:bg-[#FF7A18] hover:text-white"

    let typeButtonStyle

    if (typeButton === 'action') {
        typeButtonStyle = action
    }

    switch (typeButton) {
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
        <Link
            href={href}
            target={target === true ? '_blank' : ''}
            onClick={
                internal
                    ? (e) => {
                        e.preventDefault()

                        const id = href.replace('#', '')
                        const element = document.getElementById(id)

                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })

                            window.history.replaceState(null, '', href)
                        }
                    }
                    : undefined
            }
        >
            <Button
                typeButtonStyle={typeButtonStyle}
                extraClass={extraClass}
            >
                {children}
            </Button>
        </Link>
    )
}