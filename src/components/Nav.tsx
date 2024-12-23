import sunIcon from '../../public/sun.svg'
import garlicIcon from '../../public/garlic.svg'
import Link from "next/link"
import Image from "next/image"
import {
    NavItem
} from '@/types'
import NavLinks from '@/components/NavLinks'


interface NavProps {
    title: string,
    items: Array<NavItem>
}


// TODO: make Nav responsive on mobile

// TODO: change purple and yellow to more generic names for colors according to a theme

export default function Nav({title, items}: NavProps) {


    return (
        <nav className="flex justify-between items-center h-20 p-8 bg-purple-dark border-b-2 border-b-purple-light">
            <Link href="/" className="text-2xl text-yellow flex flex-row gap-2">
                <Image src={sunIcon} alt="Sun icon" height={25} width={25}/>
                <h2>{title}</h2>
                <Image src={garlicIcon} alt="Garlic icon" height={25} width={25} />
            </Link>    
            <NavLinks items={items} />
        </nav>
    )
}