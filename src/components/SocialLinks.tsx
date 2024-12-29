import Image from "next/image";

import instagramIcon from "../../public/instagram.svg";
import facebookIcon from "../../public/facebook.svg";
import youtubeIcon from "../../public/youtube.svg";
import emailIcon from "../../public/email.svg";
import { CONTACT_EMAIL } from "@/constants";

export default function SocialLinks() {
  return (
    <div className="flex flex-row justify-center items-center gap-6 sr-only xl:not-sr-only">
      <a href="https://www.instagram.com/solar_garlic_band/" target="_blank">
        <Image src={instagramIcon} alt="Instagram icon" />
      </a>
      <a
        href="https://www.facebook.com/people/Solar-Garlic-Band/61557279204594/?mibextid=kFxxJD"
        target="_blank"
      >
        <Image src={facebookIcon} alt="Facebook icon" />
      </a>
      <a href="https://www.youtube.com/@solar_garlic_band" target="_blank">
        <Image width={50} height={50} src={youtubeIcon} alt="Youtube icon" />
      </a>
      <a href={`mailto:${CONTACT_EMAIL}`}>
        <Image width={50} height={50} src={emailIcon} alt="Email icon" />
      </a>
    </div>
  );
}
