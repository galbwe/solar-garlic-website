interface YoutubePlayerProps {
    height: number
    width: number
    src: string
    autoplay?: boolean
}

export default function YoutubePlayer({width, height, src, autoplay = false}: YoutubePlayerProps) {
    
    // set the autoplay parameter in the youtube source url
    const urlParams = new URLSearchParams(src);
    let youtubeUrl = src;
    if (autoplay && Number(urlParams.get('autoplay')) !== 1) {
        youtubeUrl = `${youtubeUrl}&autoplay=1`
    } else if (!autoplay && Number(urlParams.get('autoplay')) === 1) {
        youtubeUrl = youtubeUrl.replace('autoplay=1', 'autoplay=0')
    }

    return (
        <iframe 
            className="rounded border-2 border-purple-light"
            width={`${width}`}
            height={`${height}`}
            src={youtubeUrl}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen 
        />
    )
}