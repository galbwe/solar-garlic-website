'use client'

import { useState } from 'react'
import { parseJSON, format } from 'date-fns'
import { tz } from '@date-fns/tz'
import Image from 'next/image'

import YoutubePlayer from "@/components/YoutubePlayer"
import { PAST_EVENTS } from "@/constants"
import chevronDown from "../../../public/chevron-down.svg"
import chevronLeft from "../../../public/chevron-left.svg"

export default function MusicPage() {
    const events = PAST_EVENTS ?? []
    const defaultEvent = events && events.length > 0 ? events[0] : null;
    const defaultVideo = defaultEvent && defaultEvent.videos && defaultEvent.videos.length > 0 ? defaultEvent.videos[0] : null;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(defaultVideo);
    const [autoplay, setAutoplay] = useState(false);
    
    // TODO: get list of past events from an api endpoint

    return (
        <section className="h-screen max-h-screen flex flex-col items-center">
            <div className="flex flex-row h-screen max-h-screen w-screen">
                <ul className={`
                    border-r-2 
                    border-r-purple-light 
                    flex flex-col 
                    min-w-96 
                    max-w-1/3 
                    h-full
                    bg-purple-dark overflow-scroll
                `}>
                    {
                        events.map((e, i) => {
                            const datetime = parseJSON(e.show, {in: tz(e.timezone)})
                            const displayDate = format(datetime, 'LLLL do, yyyy')
                            return (
                                <li key={`event-card-${i}`}>
                                    <div 
                                        className="flex flex-row cursor-pointer w-full justify-between px-3 py-3 border-b-2 border-b-purple-light"
                                        onClick={() => {
                                            if (selectedEvent && selectedEvent === e) {
                                                setSelectedEvent(null)
                                            } else {
                                                setSelectedEvent(e)
                                            }
                                        }}
                                    >
                                        <div 
                                            className="flex flex-col"
                                        >
                                            <h2 className="text-2xl text-yellow">{e.venue}</h2>
                                            <p>{displayDate}</p>
                                        </div>
                                        {
                                            selectedEvent === e ? (

                                                <Image src={chevronDown} alt="Chevron down icon" width={30} height={30}/>
                                            ) : (
                                                <Image src={chevronLeft} alt="Chevron left icon" width={16} height={16}/>
                                            )
                                        }
                                    </div>
                                    <ul>
                                        
                                        {
                                            selectedEvent && selectedEvent === e && (
                                                e.videos.map((v, j) => {
                                                    const bgColor = j % 2 == 0 ? 'purple' : 'purple-dark';
                                                    return (
                                                        <li 
                                                            key={`event-video-${i}-${j}`} 
                                                            className={`
                                                                border-b-2 
                                                                border-b-purple-light 
                                                                cursor-pointer 
                                                                px-3 
                                                                py-1 
                                                                flex 
                                                                flex-col 
                                                                bg-${bgColor}
                                                            `}
                                                            onClick={() => {
                                                                setAutoplay(true)
                                                                setSelectedVideo(v)
                                                            }}
                                                        >
                                                            <h2 className="text-lg text-yellow">{v.title}</h2>
                                                            {
                                                                v.original ? (
                                                                    <p>Original</p>
                                                                ) : v.artist && (
                                                                    <p>{v.artist} Cover</p>
                                                                ) 
                                                            }
                                                        </li> 
                                                    )                                                
                                                })
                                            )
                                        }
                                    </ul>

                                </li>
                            )
                        })
                    }
                </ul>
                <div className={`
                    w-full
                    flex
                    flex-col
                    justify-start
                    items-center
                `}>
                    <h1 className="text-7xl py-5 text-yellow">Music</h1>
                    <YoutubePlayer
                        width={1444}
                        height={788}
                        src={selectedVideo?.url}
                        autoplay={autoplay}
                        fallbackUrl='https://www.youtube.com/@Solar_Garlic_Band'
                    />
                </div>
            </div>
        </section>
    )
}
