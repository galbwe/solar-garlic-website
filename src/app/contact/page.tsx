import { CONTACT_INFO } from "@/constants";
import { teko } from "@/fonts";

export default function Contact() {
  return (
    <section className="w-full h-full flex flex-col justify-start items-center pt-8">
      <div className="bg-purple-dark w-full max-w-5xl xl:w-2/3 flex flex-col justify-start items-center gap-6 py-4 border-2 border-purple-light rounded">
        <h1
          className={`${teko.className} text-yellow text-7xl self-center text-center`}
        >
          Contact
        </h1>
        <ul className="w-11/12 xl:w-2/3">
          {CONTACT_INFO.map(({ label, value, href }) => {
            return (
              <li
                key={`contact-${label}`}
                className="flex flex-col md:flex-row flex-wrap h-15 md:h-10 justify-between"
              >
                <p className="text-yellow text-xl lg:text-2xl">{label}:</p>
                <a
                  className="hover:underline hover:text-yellow text-lg lg:text-xl"
                  href={href}
                >
                  {value}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
