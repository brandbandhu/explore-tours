"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ExplorersAIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "bot-welcome",
      role: "assistant",
      content: "Ask me about trek difficulty, best travel month, or packing essentials."
    }
  ]);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) {
      return;
    }

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: value };
    const botReply: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "AI backend hook pending. Connect this widget to your OpenAI route for personalized recommendations."
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-6 right-4 z-50 w-[320px] cursor-grab active:cursor-grabbing sm:right-6"
    >
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-brand-slate/80 shadow-glass backdrop-blur">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <span className="font-display text-sm text-white">Explorers AI Guide</span>
          <span className="text-brand-mint">{isOpen ? "-" : "+"}</span>
        </button>

        {isOpen ? (
          <div className="space-y-3 border-t border-white/10 p-3">
            <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.role === "assistant"
                      ? "bg-white/10 text-brand-fog"
                      : "ml-auto max-w-[85%] bg-brand-mint/20 text-white"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question..."
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-mint"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand-amber px-3 text-sm font-semibold text-brand-ink"
              >
                Send
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
