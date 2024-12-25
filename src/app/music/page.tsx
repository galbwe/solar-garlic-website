'use client'

import { useState } from 'react'

import YoutubePlayer from "@/components/YoutubePlayer"
import { PAST_EVENTS } from "@/constants"

import {Video, Event} from "@/types"

export default function MusicPage() {
    const [currentVideo, setCurrentVideo] = useState(0);
    
    // TODO: get list of past events from an api endpoint
    const events = PAST_EVENTS
    console.log(events)
    const videos = getVideos(events)
    console.log(videos)


    const video = videos[currentVideo]

    return (
        <section className="mt-8 h-full px-2 md:px-4 lg:px-8 flex flex-col items-center">
            <h1 className="text-8xl text-yellow">Music</h1>
            <div className="flex flex-row h-5/6 w-full">
                <ul className="rounded border-2 border-purple-light flex flex-col w-1/3 bg-purple-dark">
                    {
                        videos.map((v, i) => {
                            return (
                                <li 
                                    key={`youtube-video-${i}`} 
                                    onClick={() => setCurrentVideo(i)}
                                    className="border-b-2 border-b-purple-light"
                                >
                                    <h2 className="text-lg">{v.title}</h2>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <YoutubePlayer
                        width={1000}
                        height={563}
                        src={video.url}
                    />
                </div>

            </div>
        </section>
    )
}

function getVideos(events: Array<Event>): Array<Video> {
    const videos: Array<Video> = []
    for (const i in events) {
        const event = events[i]
        const eventVideos = event.videos ?? []
        for (const j in eventVideos) {
            const v = eventVideos[j]
            videos.push({...v, eventIndex: Number(i)})
        }
    }
    return videos
}