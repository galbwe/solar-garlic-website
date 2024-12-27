export interface AccordionGroup<G, O> {
    id: string
    title: string
    subtext: string
    options: Array<AccordionOption<O>>
    data?: G
}

export interface AccordionOption<O> {
    id: string
    title: string
    subtext: string
    data?: O 
}

export interface Event {
    id: string
    title: string
    venue: string
    venueUrl?: string
    address?: string
    addressUrl?: string
    bands?: Array<string>
    doors?: string
    show: string
    timezone?: string
    cover?: number
    videos?: Array<Video>
}

export interface NavItem {
    title: string,
    href: string,
}


export interface Video {
    id: string
    title: string
    artist?: string
    original?: boolean
    url: string
}
