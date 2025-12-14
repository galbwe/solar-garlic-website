"use client";
import { useState } from "react";

import { CONTACT_INFO } from "@/constants";
import { API_HOST } from "@/environment";
import { teko } from "@/fonts";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(e.target.value);
  };

  const handleSubscribeToMailingList = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: get the api host from environment variables
      const res = await fetch(`${API_HOST}/api/v1/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus({
          type: "success",
          message:
            "Now for one last step... Please check your inbox for a verifcation email and click the link to finish signing up.",
        });
        setEmail("");
      } else {
        setStatus({
          type: "error",
          message: "Something didn't work quite as expected. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          "Uh oh, there was a problem subscribing that email. Please try again.",
      });
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-start items-center pt-8 gap-2">
      <div className="bg-purple-dark w-full max-w-5xl xl:w-2/3 flex flex-col justify-start items-center gap-6 py-6 border-2 border-purple-light rounded-sm">
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
      <div className="bg-purple-dark w-full max-w-5xl xl:w-2/3 flex flex-col justify-start items-center gap-6 px-4 lg:px-0 py-6 border-2 border-purple-light rounded-sm">
        <form
          onSubmit={handleSubscribeToMailingList}
          className="space-y-4 w-full lg:w-2/3 flex flex-col items-start"
        >
          <h2
            className={`${teko.className} text-yellow text-5xl lg:text-7xl self-center w-full text-center lg:text-start`}
          >
            Join Our Mailing List
          </h2>
          <p className="text-lg lg:text-2xl text-center lg:text-start mb-6">
            Enter your email to get the latest updates on Solar Garlic shows and
            releases!
          </p>
          <input
            type="email"
            name="email"
            placeholder="jammer@funkytimes.com"
            value={email}
            onChange={handleEmailChange}
            required
            className="block w-full p-2 border text-black bg-white h-14"
          />
          <button
            type="submit"
            className="text-2xl font-bold bg-blue-500 text-white px-4 py-2 rounded-sm w-full h-14"
          >
            Sign Up
          </button>
          {
            // TODO: add styling depending on status type
            status?.message &&
              (status.type === "success" ? (
                <>
                  <p className="text-4xl text-yellow">Success!</p>
                  <p className="text-2xl text-white">{status.message}</p>
                </>
              ) : status.type === "error" ? (
                <>
                  <p className="text-4xl text-red-500">Oh No!</p>
                  <p className="text-2xl text-white-500">{status.message}</p>
                </>
              ) : (
                <></>
              ))
          }
        </form>
      </div>
    </section>
  );
}
