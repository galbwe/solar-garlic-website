interface YoutubePlayerProps {
    height: number
    width: number
    src: string
}

export default function YoutubePlayer({width, height, src}: YoutubePlayerProps) {
    return (
        <iframe 
            className="rounded border-2 border-purple-light"
            width={`${width}`}
            height={`${height}`}
            src={src}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen 
        />
    )
}