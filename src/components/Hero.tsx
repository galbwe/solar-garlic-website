import mountainStars from '../../public/mountain-stars.jpg'
import sunIcon from '../../public/sun.svg'
import garlicIcon from '../../public/garlic.svg'
import Image from 'next/image'

interface HeroProps {
    title: string,
    // img: string,
}

export default function Hero(
    {title}: HeroProps
) {
    return (
        <>
            <section className="flex flex-col justify-center items-center w-full h-full">
                <h1 className="text-9xl text-yellow">{title}</h1>
                <div className="flex flex-row gap-6">
                <Image src={sunIcon} alt='A sun icon' height={120} width={120}/>
                <Image src={garlicIcon} alt='A garlic icon' height={120} width={120} />
                </div>
            </section>
            {/* opaque overlay */}
            <div className="-z-40 min-h-full min-w-96 w-full h-auto fixed top-0 left-0 bg-purple-dark opacity-40"/>
            {/* full screen background image */}
            <Image className="-z-50 min-h-full min-w-96 w-full h-auto fixed top-0 left-0" src={mountainStars} alt='A starry night in the mountains.' />
        </>
    )

}