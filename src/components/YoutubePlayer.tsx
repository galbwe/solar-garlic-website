import Image from "next/image";

import youtubeIcon from "../../public/youtube.svg";

interface YoutubePlayerProps {
  height: number;
  width: number;
  src?: string;
  autoplay?: boolean;
  fallbackUrl: string;
}

export default function YoutubePlayer({
  width,
  height,
  src,
  autoplay = false,
  fallbackUrl,
}: YoutubePlayerProps) {
  if (src) {
    // set the autoplay parameter in the youtube source url
    const urlParams = new URLSearchParams(src);
    let youtubeUrl = src;
    if (autoplay && Number(urlParams.get("autoplay")) !== 1) {
      youtubeUrl = `${youtubeUrl}&autoplay=1`;
    } else if (!autoplay && Number(urlParams.get("autoplay")) === 1) {
      youtubeUrl = youtubeUrl.replace("autoplay=1", "autoplay=0");
    }
    // enable the js api in url params if it is not present
    if (Number(urlParams.get("enablejsapi")) !== 1) {
      youtubeUrl = `${youtubeUrl}&enablejsapi=1`;
    }

    // disable related videos
    youtubeUrl = youtubeUrl.replace("&rel=1", "");
    youtubeUrl = `${youtubeUrl}&rel=0`;

    // use white controls instead of red to stay closer to the sites theme
    youtubeUrl = youtubeUrl.replace("&color=red", "");
    youtubeUrl = `${youtubeUrl}&color=white`;

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
    );
  }

  // return a placeholder if no video source
  // link to the fallbackUrl, which should be the band's youtube channel
  return (
    <a href={fallbackUrl} target="_blank">
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`
                    bg-purple-dark 
                    border-2 
                    border-purple-light 
                    rounded 
                    flex 
                    justify-center 
                    items-center`}
      >
        <Image
          width={100}
          height={100}
          src={youtubeIcon}
          alt={"Youtube Icon"}
        />
      </div>
    </a>
  );
}
