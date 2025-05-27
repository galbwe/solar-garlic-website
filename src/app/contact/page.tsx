"use client";
import { useState } from "react";

import { CONTACT_INFO } from "@/constants";
import { teko } from "@/fonts";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleSubscribeToMailingList = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: get the api host from environment variables
      const res = await fetch("http://localhost:8080/api/v1/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        console.log("Success creating email ...");
        setStatus({
          type: "success",
          message:
            "Now one more step ... Please check your email and click the verification link to finish signing up.",
        });
        setEmail("");
      } else {
        console.error("Error creating email. Received error status code.");
        setStatus({
          type: "error",
          message:
            "Uh oh, there was a problem subscribing that email. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error creating email");
      console.error(err);
      setStatus({
        type: "error",
        message:
          "Uh oh, there was a problem subscribing that email. Please try again.",
      });
    }
  };

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
      <div className="bg-purple-dark w-full max-w-5xl xl:w-2/3 flex flex-col justify-start items-center gap-6 py-4 border-2 border-purple-light rounded">
        <h2
          className={`${teko.className} text-yellow text-5xl self-center text-center`}
        >
          Join Our Mailing List
        </h2>
        <form
          onSubmit={handleSubscribeToMailingList}
          className="space-y-4 w-full"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
            className="block w-full p-2 border text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
          {
            // TODO: add styling depending on status type
            status?.message && <p>{status.message}</p>
          }
        </form>
      </div>
    </section>
  );
}
