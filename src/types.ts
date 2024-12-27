export interface NavItem {
    title: string,
    href: string,
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


export interface Video {
    id: string
    title: string
    artist?: string
    original?: boolean
    url: string
}
