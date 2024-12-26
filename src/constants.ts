export const NAV_ITEMS = [
    {title: "Home", href: "/"},
    {title: "Events", href: "/events"},
    {title: "Music", href: "/music"},
    {title: "About", href: "/about"},
    {title: "Contact", href: "/contact"},
]


// TODO: move events to an api call
export const EVENTS = [
    {
        title: "Four O'Fern",
        venue: "Bar 404",
        venueUrl: "https://bar404broadway.com/",
        address: "404 N Broadway, Denver, CO 80203",
        addressUrl: "https://maps.app.goo.gl/cxKqTNhCoTXejBeX9",
        bands: ["May Be Fern"],
        show: "2025-01-11T02:00:00",
        timezone: 'America/Denver',
    },
    {
        title: "Solar Garlic Live at The Roxy",
        venue: "The Roxy on Broadway",
        venueUrl: "https://broadwayroxy.com/",
        address: "554 S Broadway, Denver, CO 80209",
        addressUrl: "https://maps.app.goo.gl/VaQTYG6iJ4XB5NwD7",
        bands: ["Ethan Alexander"],
        show: "2025-02-02T04:00:00",
        timezone: 'America/Denver',

    }
]


export const PAST_EVENTS = [
    {
        title: "Solar Garlic Live at The Roxy",
        venue: "The Roxy on Broadway",
        show: "2024-11-30T04:00:00",
        timezone: 'America/Denver',
        videos: [
            {
                title: "Turn On Your Love Light",
                artist: "Grateful Dead",
                original: false,
                url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=_eR9V5wC08z_H7Bz",
            },
            {
                title: "Measure of Love",
                artist: "Solar Garlic",
                original: true,
                url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=sOezmeCjiF4VXxG1&amp;start=435",
            },
            {
                title: "Funky Bitch",
                artist: "Phish",
                original: false,
                url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=QKpM_IOCoeotHeA0&amp;start=630",
            },
        ],
    },
    {
        title: "Solar Garlic Live at Fracos",
        venue: "Fracos",
        show: "2024-06-07T05:00:00",
        timezone: 'America/Denver',
        videos: [
            {
                title: "ACDC Bag / Come Together",
                artist: "Phish / The Beatles",
                original: false,
                url: "https://www.youtube.com/embed/kyRLgLgkq5A?si=T-5B9SG0po9j4TxW",
            },
            {
                title: "Franklin's Tower",
                artist: "The Grateful Dead",
                original: false,
                url: "https://www.youtube.com/embed/eHtjRkWy2Mc?si=kFsNgLZFbZgSl2Mh",
            }
        ]
    },
]
