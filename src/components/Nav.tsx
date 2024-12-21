import sunIcon from '../../public/sun.svg'
import Link from "next/link"
import Image from "next/image"

interface NavItem {
    title: string,
    href: string,
}


interface NavProps {
    title: string,
    items: Array<NavItem>
}


// TODO: make Nav responsive on mobile

// TODO: change purple and yellow to more generic names for colors according to a theme

export default function Nav({title, items}: NavProps) {

    const listItems = items.map(item => (
        <li key={item.title} className="text-xl text-yellow">
            <Link href={item.href}>{item.title}</Link>
        </li>
    ))

    return (
        <nav className="flex justify-between items-center h-20 p-8 bg-purple-dark border-b-2 border-b-purple-light">
            <Link href="/" className="text-2xl text-yellow flex flex-row gap-2">
                <Image src={sunIcon} alt="Sun icon" height={25} width={25}/>
                <h2>{title}</h2>
            </Link>
            <ul className="flex flex-row gap-8">
                {listItems}
            </ul>
        </nav>
    )
}