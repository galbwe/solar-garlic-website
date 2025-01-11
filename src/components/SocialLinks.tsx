import Image from "next/image";

import instagramIcon from "../../public/instagram.svg";
import facebookIcon from "../../public/facebook.svg";
import youtubeIcon from "../../public/youtube.svg";
import emailIcon from "../../public/email.svg";
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  YOUTUBE_URL,
} from "@/constants";

interface SocialLinksProps {
  width: number;
  height: number;
}

export default function SocialLinks({ width, height }: SocialLinksProps) {
  return (
    <div className="flex flex-row justify-center items-center gap-4 sr-only xl:not-sr-only">
      <a href={INSTAGRAM_URL} target="_blank">
        <Image
          src={instagramIcon}
          alt="Instagram icon"
          width={width}
          height={height}
        />
      </a>
      <a href={FACEBOOK_URL} target="_blank">
        <Image
          src={facebookIcon}
          alt="Facebook icon"
          width={width}
          height={height}
        />
      </a>
      <a href={YOUTUBE_URL} target="_blank">
        <Image
          src={youtubeIcon}
          alt="Youtube icon"
          width={width}
          height={height}
        />
      </a>
      <a href={`mailto:${CONTACT_EMAIL}`}>
        <Image src={emailIcon} alt="Email icon" width={width} height={height} />
      </a>
    </div>
  );
}
