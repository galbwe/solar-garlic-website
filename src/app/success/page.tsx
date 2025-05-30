import Link from "next/link";
import { teko } from "@/fonts";

// page that we redirect to on email verification success when signing up for the mailing list

export default function Success() {
  return (
    <section className="w-full h-full flex justify-center align-center">
      <div className="bg-purple-dark w-full lg:w-3/4 lg:mt-10 h-1/4 rounded p-4 flex flex-col justify-center align-center gap-3">
        <h1 className={`${teko.className} text-yellow text-7xl text-center`}>
          Success!
        </h1>
        <p className="text-2xl lg:text-3xl text-center mb-2">
          Nice! You are on the list.
        </p>
        <p className="text-2xl lg:text-2xl text-yellow text-center hover:underline w-full">
          <Link href="/">Back To Home</Link>
        </p>{" "}
      </div>
    </section>
  );
}
