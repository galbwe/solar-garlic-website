import mountainStars from '../../public/mountain-stars.jpg'
import lionsLair01 from '../../public/solar-garlic-lions-lair-01.jpg'
import sunIcon from '../../public/sun.svg'
import garlicIcon from '../../public/garlic.svg'
import Image from 'next/image'
import NavLinks from './NavLinks'
import { NAV_ITEMS } from '@/constants'

interface HeroProps {
    title: string,
    // img: string,
}

export default function Hero(
    {title}: HeroProps
) {

    const navItems = NAV_ITEMS.filter(item => item.href != "/")

    return (
        <>
            <section className="flex flex-col justify-center items-center w-full h-full">
                <div className="rounded p-10 bg-purple-dark/70 flex flex-col justify-center items-center gap-3">
                    <h1 className="text-9xl text-yellow">{title}</h1>
                    <div className="flex flex-row gap-6">
                    </div>
                    <NavLinks items={navItems} linkSize="text-4xl"/>
                </div>
           </section>
            {/* opaque overlay */}
            <div className="-z-40 min-h-full min-w-96 w-full h-auto fixed top-0 left-0 bg-purple-dark opacity-40"/>
            {/* full screen background image */}
            <Image className="-z-50 min-h-full min-w-96 w-full h-auto fixed top-0 left-0" src={lionsLair01} alt='A starry night in the mountains.' />
        </>
    )

}