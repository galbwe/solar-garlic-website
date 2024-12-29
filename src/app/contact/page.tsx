import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  FACEBOOK_ACCOUNT,
  FACEBOOK_URL,
} from "@/constants";

export default function Contact() {
  return (
    <section className="w-full h-full flex flex-col justify-start items-center pt-8">
      <div className="bg-purple-dark w-full max-w-5xl xl:w-2/3 flex flex-col justify-start items-center gap-6 py-4 border-2 border-purple-light rounded">
        <h1 className="text-yellow text-7xl self-center text-center">
          Contact
        </h1>
        <ul className="w-11/12 xl:w-2/3">
          <li className="flex flex-col md:flex-row flex-wrap h-15 md:h-10 justify-between">
            <p className="text-yellow text-xl lg:text-2xl">Email:</p>
            <a
              className="hover:underline hover:text-yellow text-lg lg:text-xl"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="flex flex-col md:flex-row h-15 md:h-10 justify-between">
            <p className="text-yellow text-xl lg:text-2xl">Instagram:</p>
            <a
              className="hover:underline hover:text-yellow text-lg lg:text-xl"
              href={INSTAGRAM_URL}
            >
              {INSTAGRAM_HANDLE}
            </a>
          </li>
          <li className="flex flex-col md:flex-row h-15 md:h-10 justify-between">
            <p className="text-yellow text-xl lg:text-2xl">Facebook:</p>
            <a
              className="hover:underline hover:text-yellow text-lg lg:text-xl"
              href={FACEBOOK_URL}
            >
              {FACEBOOK_ACCOUNT}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
