import fracosImage from '../../../public/solar-garlic-fracos-01.jpg'
import Image from "next/image"

export default function About() {
    return (
        <div className="flex flex-row space-between gap-1">
            <section className="text-xl w-2/5 flex flex-col gap-3 bg-purple-dark p-12 rounded border-2 border-purple-light">
                <h1 className="text-4xl pb-2">About</h1>
                <p>
                    Solar Garlic is a Denver-based jam band mixing funk and indie vibes into their original music and covers. 
                    Brought together in late 2023 through a mutual love of melting faces at local jam sessions,
                    they quickly developed musical chemistry and were playing small bars by early 2024. 
                    They can frequently be found rocking out at local venues such as The Lion's Lair, The Roxy on Broadway, and Goosetown Tavern.
                </p>
                <p>
                    The band consists of Sabrina Scherma on guitar, keys and vocals, Haley Brueckman on drums, Davey Pyle on guitar and vocals, and Wes Galbraith on bass and vocals.
                </p>
            </section>
            <Image src={fracosImage} alt="Solar Garlic on stage at Fracos bar in Littleton."/>
        </div>
    )
}