"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "@fontsource/khand/700.css";
import "@fontsource/quicksand/400.css";

export default function Home() {
  const [messages, setMessages] = useState<{ sender: "user" | "otto"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: { sender: "user" | "otto"; text: string } = {
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // const res = await fetch("/api/chat", {
      const res = await fetch("https://api.danielsydney.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage: { sender: "user" | "otto"; text: string } = {
        sender: "otto",
        text: data.message || "Otto is speechless...",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "otto", text: "Error contacting Otto 💥" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const suggestedPrompts = [
    "Tell me about Daniel’s experience with design systems",
    "What sectors has Daniel worked in?",
    "What’s Daniel’s design process?",
    "Can I download Daniel’s CV?",
    "What’s Daniel’s latest project?",
    "What has he worked on most recently, Otto?",
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 font-[Quicksand]">
      <header className="flex justify-between items-center max-w-6xl mx-auto mb-10">
        <h1 className="text-white font-bold text-xl font-[Khand]">
          DANIEL <span className="text-gray-400">UX/UI & PRODUCT DESIGNER.</span>
        </h1>
        <nav className="space-x-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/other" className="hover:text-white">Other</Link>
        </nav>
      </header>

      <section className="max-w-3xl mx-auto text-left mb-6">
        <h2 className="text-gray-400 text-5xl font-[Khand] font-bold">Welcome to Otto,</h2>
        <h3 className="text-white text-5xl font-[Khand] font-bold leading-tight mb-4">
          Ask about Daniel’s design work
        </h3>
        <p className="text-gray-300 mb-[7.5rem]">
          Daniel is a <strong className="text-white">Creative-problem Solving Designer</strong> based in Bedford.
          He wields the power of visual storytelling to transform dense information into
          eye-catching narratives that inform, inspire, and ignite action.
        </p>

        <div className="flex flex-wrap justify-start gap-2 mb-6">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(prompt);
                sendMessage();
              }}
              className="bg-gray-800 hover:bg-gray-700 text-sm px-4 py-2 rounded-full text-white"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto w-full flex flex-col items-center">
        <div className="bg-white text-black w-full rounded-xl p-4 h-[300px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(
                      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
                      '<a href="$2" target="_blank" class="text-blue-400 underline">$1</a>'
                    ),
                  }}
                />
              </span>
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500 italic">Otto is typing...</p>}
          <div ref={chatEndRef} />
        </div>

        <div className="w-full mt-4 flex bg-white rounded-full shadow overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Otto anything..."
            className="flex-grow px-4 py-3 text-black placeholder-gray-500 bg-transparent focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-semibold"
          >
            Send...
          </button>
        </div>
      </section>
    </main>
  );
}