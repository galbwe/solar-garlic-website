import Link from "next/link"

import {NavItem} from '@/types'

interface NavLinksProps {
    items: Array<NavItem>
    linkSize?: string
}


export default function NavLinks({items, linkSize = "text-xl"}: NavLinksProps) {
    const listItems = items.map(item => (
        <li key={item.title} className={`${linkSize} text-yellow hover:text-yellow-light hover:underline`}>
            <Link href={item.href}>{item.title}</Link>
        </li>
    ))

    return (
        <ul className="flex flex-row gap-4 lg:gap-8">
            {listItems}
        </ul>

    )        
}