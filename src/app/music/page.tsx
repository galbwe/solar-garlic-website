'use client'

import { useState } from 'react'
import { parseJSON, format } from 'date-fns'
import { tz } from '@date-fns/tz'
import Image from 'next/image'

import YoutubePlayer from "@/components/YoutubePlayer"
import { PAST_EVENTS } from "@/constants"
import youtubeIcon from "../../../public/youtube.svg"

import {Video, Event} from "@/types"

export default function MusicPage() {
    const events = PAST_EVENTS ?? []
    const defaultEvent = events && events.length > 0 ? events[0] : null;
    const defaultVideo = defaultEvent && defaultEvent.videos && defaultEvent.videos.length > 0 ? defaultEvent.videos[0] : null;
    const [selectedEvent, setSelectedEvent] = useState(defaultEvent);
    const [selectedVideo, setSelectedVideo] = useState(defaultVideo);
    const [autoplay, setAutoplay] = useState(false);
    
    // TODO: get list of past events from an api endpoint

    return (
        <section className="mt-8 h-full px-2 md:px-4 lg:px-8 flex flex-col items-center">
            <h1 className="text-8xl text-yellow">Music</h1>
            <div className="flex flex-row h-5/6 w-full">
                <ul className="rounded border-2 border-purple-light flex flex-col w-1/3 bg-purple-dark">
                    {
                        // videos.map((v, i) => {
                        //     return (
                        //         <li 
                        //             key={`youtube-video-${i}`} 
                        //             onClick={() => setCurrentVideo(i)}
                        //             className="border-b-2 border-b-purple-light"
                        //         >
                        //             <h2 className="text-lg">{v.title}</h2>
                        //         </li>
                        //     )
                        // })

                        events.map((e, i) => {
                            const datetime = parseJSON(e.show, {in: tz(e.timezone)})
                            const displayDate = format(datetime, 'LLLL do, yyyy')
                            return (
                                <li key={`event-card-${i}`} className="p-4">
                                    <div className="flex flex-col">
                                        <h2 className="text-xl">{e.venue}</h2>
                                        <p>{displayDate}</p>
                                    </div>

                                    <ul>
                                        {
                                            e.videos.map((v, j) => {
                                                return (
                                                    <li 
                                                        key={`event-video-${i}-${j}`} 
                                                        className="border-b-2 border-b-purple-light"
                                                        onClick={() => {
                                                            setAutoplay(true)
                                                            setSelectedVideo(v)
                                                        }}
                                                    >
                                                        <h2 className="text-lg">{v.title}</h2>
                                                    </li> 
                                                )                                                
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    selectedVideo ? (
                        <div className="h-full w-full flex flex-col justify-center items-center">
                            <YoutubePlayer
                                width={1000}
                                height={563}
                                src={selectedVideo.url}
                                autoplay={autoplay}
                            />
                        </div>
                    ) : (
                        // placeholder if no videos loaded
                        <div
                            style={{width: "1000px", height: "563px"}} 
                            className="bg-purple-dark border-2 border-purple-light rounded h-full w-full flex flex-col justify-center items-center flex justify-center items-center" 
                        >
                            <Image width={100} height={100} src={youtubeIcon} alt={"Youtube Icon"}/>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
