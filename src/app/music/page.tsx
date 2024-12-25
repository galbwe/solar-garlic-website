'use client'

import { useState } from 'react'

import YoutubePlayer from "@/components/YoutubePlayer"
import { VIDEOS } from "@/constants"

export default function MusicPage() {
    const [currentVideo, setCurrentVideo] = useState(0);
    
    // TODO: get list of videos from an api endpoint
    const videos = VIDEOS
    const video = videos[currentVideo]

    return (
        <section className="mt-8 h-full px-2 md:px-4 lg:px-8 flex flex-col items-center">
            <h1 className="text-8xl text-yellow">Music</h1>
            <div className="flex flex-row h-5/6 w-full">
                <ul className="rounded border-2 border-purple-light flex flex-col w-1/4 bg-purple-dark">
                    {
                        videos.map((video, i) => {
                            return (
                                <li 
                                    key={`youtube-video-${i}`} 
                                    onClick={() => setCurrentVideo(i)}
                                >
                                    {video.title}
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