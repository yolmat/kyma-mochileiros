import Link from "next/link"
import Button from "@/components/button"
export default function ButtonLinks({ children, target, href, internal, extraClass, typeButton }) {

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
                extraClass={extraClass}
                typeStyle={typeButton}
            >
                {children}
            </Button>
        </Link>
    )
}