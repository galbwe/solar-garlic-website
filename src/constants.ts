import { v4 as uuid4 } from "uuid";

export const CONTACT_EMAIL = "solar.garlic.denver@gmail.com";

export const INSTAGRAM_HANDLE = "@solar_garlic_band";

export const INSTAGRAM_URL = "https://www.instagram.com/solar_garlic_band/";

export const FACEBOOK_URL =
  "https://www.facebook.com/people/Solar-Garlic-Band/61557279204594/?mibextid=kFxxJD";

export const YOUTUBE_URL = "https://www.youtube.com/@solar_garlic_band";

export const FACEBOOK_ACCOUNT = "Solar-Garlic-Band";

export const NAV_ITEMS = [
  { title: "Home", href: "/" },
  { title: "Music", href: "/music" },
  { title: "Events", href: "/events" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

// TODO: move events to an api call
export const EVENTS = [
  {
    id: uuid4(),
    title: "Goosetown Tavern",
    venue: "Goosetown Tavern",
    venueUrl: "https://goosetowntavern.com/",
    address: "3242 E Colfax Ave, Denver, CO 80206",
    addressUrl: "https://maps.app.goo.gl/DcV55DyvC26iRhJQ6",
    bands: ["Bicycle Day", "The Aughts"],
    show: "2025-12-21T02:00:00",
    timezone: "America/Denver",
  },
];

export const PAST_EVENTS = [
  {
    id: uuid4(),
    title: "Solar Garlic at The Lion's Lair",
    venue: "The Lion's Lair",
    show: "2025-07-18T03:00:00",
    timezone: "America/Denver",
    videos: [
      {
        id: uuid4(),
        title: "All Fall Down",
        artist: "John Hartford",
        original: false,
        url: "https://www.youtube.com/embed/7jgSNcS773E?si=T0f5Bhzkq3cfXbbk&amp",
      },
      {
        id: uuid4(),
        title: "Shining Lights",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/7jgSNcS773E?si=T0f5Bhzkq3cfXbbk&amp;start=321",
      },
      {
        id: uuid4(),
        title: "Everything's Right",
        artist: "Phish",
        original: false,
        url: "https://www.youtube.com/embed/7jgSNcS773E?si=T0f5Bhzkq3cfXbbk&amp;start=747",
      },
      {
        id: uuid4(),
        title: "What Does It Mean?",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/7jgSNcS773E?si=T0f5Bhzkq3cfXbbk&amp;start=1746",
      },
      {
        id: uuid4(),
        title: "17th Avenue",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/7jgSNcS773E?si=T0f5Bhzkq3cfXbbk&amp;start=2139",
      },
    ],
  },
  {
    id: uuid4(),
    title: "Solar Garlic Live at The Roxy",
    venue: "The Roxy on Broadway",
    show: "2024-11-30T04:00:00",
    timezone: "America/Denver",
    videos: [
      {
        id: uuid4(),
        title: "Turn On Your Love Light",
        artist: "Grateful Dead",
        original: false,
        url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=_eR9V5wC08z_H7Bz",
      },
      {
        id: uuid4(),
        title: "Measure of Love",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=sOezmeCjiF4VXxG1&amp;start=435",
      },
      {
        id: uuid4(),
        title: "Funky Bitch",
        artist: "Phish",
        original: false,
        url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=QKpM_IOCoeotHeA0&amp;start=630",
      },
      {
        id: uuid4(),
        title: "Sweet Sunshine",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=QKpM_IOCoeotHeA0&amp;start=960",
      },
      {
        id: uuid4(),
        title: "Spooky",
        artist: "Classics IV",
        original: false,
        url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=QKpM_IOCoeotHeA0&amp;start=1260",
      },
      {
        id: uuid4(),
        title: "Mountain",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=QKpM_IOCoeotHeA0&amp;start=1785",
      },
      {
        id: uuid4(),
        title: "Chinacat Sunflower / I Know You Rider",
        artist: "Grateful Dead",
        original: false,
        url: "https://www.youtube.com/embed/rNgdOjsgs3Q?si=QKpM_IOCoeotHeA0&amp;start=2045",
      },
      {
        id: uuid4(),
        title: "Shining Lights",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/mAO2DMSR228?si=S0JNkbY1ROaAuXi9&amp;start=60",
      },
      {
        id: uuid4(),
        title: "Cat In The Window",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/mAO2DMSR228?si=S0JNkbY1ROaAuXi9&amp;start=695",
      },
      {
        id: uuid4(),
        title: "Show Me How",
        artist: "Men I Trust",
        original: false,
        url: "https://www.youtube.com/embed/mAO2DMSR228?si=S0JNkbY1ROaAuXi9&amp;start=1062",
      },
      {
        id: uuid4(),
        title: "Scarlet Begonias / Fire On The Mountain",
        artist: "Grateful Dead",
        original: false,
        url: "https://www.youtube.com/embed/mAO2DMSR228?si=S0JNkbY1ROaAuXi9&amp;start=1345",
      },
      {
        id: uuid4(),
        title: "Maybe",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/mAO2DMSR228?si=S0JNkbY1ROaAuXi9&amp;start=2400",
      },
      {
        id: uuid4(),
        title: "Music's Hot",
        artist: "Chris Robinson Brotherhood",
        original: false,
        url: "https://www.youtube.com/embed/64J5J2thvMU?si=Gqs6E2XK-c4emcuu&amp;start=0",
      },
      {
        id: uuid4(),
        title: "Blue Skies",
        artist: "Irving Berlin",
        original: false,
        url: "https://www.youtube.com/embed/64J5J2thvMU?si=Gqs6E2XK-c4emcuu&amp;start=450",
      },
      {
        id: uuid4(),
        title: "17th Avenue",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/64J5J2thvMU?si=Gqs6E2XK-c4emcuu&amp;start=850",
      },
      {
        id: uuid4(),
        title: "ACDC Bag / Come Together",
        artist: "Phish / Beatles",
        original: false,
        url: "https://www.youtube.com/embed/64J5J2thvMU?si=Gqs6E2XK-c4emcuu&amp;start=1370",
      },
      {
        id: uuid4(),
        title: "Part of the Process",
        artist: "Morcheeba",
        original: false,
        url: "https://www.youtube.com/embed/64J5J2thvMU?si=Gqs6E2XK-c4emcuu&amp;start=2005",
      },
      {
        id: uuid4(),
        title: "After Midnight / Funky Duck",
        artist: "Grateful Dead / Vulfpeck",
        original: false,
        url: "https://www.youtube.com/embed/64J5J2thvMU?si=Gqs6E2XK-c4emcuu&amp;start=2350",
      },
    ],
  },
  {
    id: uuid4(),
    title: "Solar Garlic Live at Fracos",
    venue: "Fracos",
    show: "2024-06-07T05:00:00",
    timezone: "America/Denver",
    videos: [
      {
        id: uuid4(),
        title: "ACDC Bag / Come Together",
        artist: "Phish / Beatles",
        original: false,
        url: "https://www.youtube.com/embed/kyRLgLgkq5A?si=T-5B9SG0po9j4TxW",
      },
      {
        id: uuid4(),
        title: "Franklin's Tower",
        artist: "Grateful Dead",
        original: false,
        url: "https://www.youtube.com/embed/eHtjRkWy2Mc?si=kFsNgLZFbZgSl2Mh",
      },
      {
        id: uuid4(),
        title: "Part of the Process",
        artist: "Morcheeba",
        original: false,
        url: "https://www.youtube.com/embed/VKwHHeYWgWI?si=IYdYQSzqSgKaQ548",
      },
      {
        id: uuid4(),
        title: "Doin' Things Right",
        artist: "Billy Strings",
        original: false,
        url: "https://www.youtube.com/embed/TYp2V7d76HQ?si=x-pVMT4ZHvetQHoX",
      },
      {
        id: uuid4(),
        title: "Spooky",
        artist: "Classics IV",
        original: false,
        url: "https://www.youtube.com/embed/UX8kohoSQvI?si=J9so3rs0C7rxk8ZN",
      },
      {
        id: uuid4(),
        title: "The Music's Hot",
        artist: "Chris Robinson Brotherhood",
        original: false,
        url: "https://www.youtube.com/embed/-E7zzIV2IRg?si=QHR_tL1phoELwL7c",
      },
      {
        id: uuid4(),
        title: "Sweet Sunshine",
        artist: "Solar Garlic",
        original: true,
        url: "https://www.youtube.com/embed/f-DuJ4H9Gb4?si=QZF85nPkFF3xttLu",
      },
      {
        id: uuid4(),
        title: "Chinacat Sunflower / I Know You Rider",
        artist: "Grateful Dead",
        original: false,
        url: "https://www.youtube.com/embed/Mp8zka2i8vI?si=mA_ZqBdi4FJknRU1",
      },
      {
        id: uuid4(),
        title: "After Midnight / Funky Duck",
        artist: "Grateful Dead / Vulfpeck",
        original: false,
        url: "https://www.youtube.com/embed/qa35_wDSwGw?si=bU6rFjVx-OE5oh6m",
      },
      {
        id: uuid4(),
        title: "Show Me How",
        artist: "Men I Trust",
        original: false,
        url: "https://www.youtube.com/embed/BlGxgeEysEE?si=Kn2_LegfsGSQlizO",
      },
    ],
  },
];
export const CONTACT_INFO = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
  },
  {
    label: "Facebook",
    value: FACEBOOK_ACCOUNT,
    href: FACEBOOK_URL,
  },
];
