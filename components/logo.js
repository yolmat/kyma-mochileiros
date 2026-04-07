import Image from "next/image";
import kymaLight from '@/public/kymaLight.png'
import Link from "next/link";

export default function Logo({ size, name, extraTag, internal }) {
    return (

        <div className="flex items-center gap-3">
            <Link
                href={'/#inicio'}
                onClick={(e) => {
                    e.preventDefault()

                    const element = document.getElementById('inicio')

                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        })

                        window.history.replaceState(null, '', '#inicio')
                    }
                }}                >
                <Image src={kymaLight} alt="Logo Kyma" className={`h-${size} w-auto`} />
            </Link>
            <div>
                {name === true && (<h1 className="text-2xl font-bold">Kyma</h1>)}
                {extraTag && (extraTag)}
            </div>
        </div>

    )
}