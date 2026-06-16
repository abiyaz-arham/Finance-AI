import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Bot, User, Trash2, ArrowRight, CornerDownRight, Loader } from 'lucide-react';
import { ChatMessage } from '../types';

interface CompanionBotProps {
  onSelectedProfileName?: string;
  onTermClick?: (term: string) => void;
}

export const CompanionBot: React.FC<CompanionBotProps> = ({ onSelectedProfileName = "Zara", onTermClick }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `Hey habibi! I'm **DirhamBuddy**, your personal, witty companion here to protect your dirhams from traditional banking sharks! 💸\n\nDid you know that **45% of UAE residents have NOT started saving for retirement yet**? Let's make sure you aren't one of them! \n\nWhat are we doing today? Ask me about **Compound Interest**, get a **daily saving challenge**, or ask me why your traditional bank account charged you for breathing!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const QUICK_PROMPTS = [
    { text: "Give me a Daily Save Challenge! 🎯", value: "Give me a witty daily financial saving challenge to beat the 45% non-saving retirement stat!" },
    { text: "Explain Compound Interest like I'm 5 🍿", value: "Explain compound interest using Karak tea or Shawarma math!" },
    { text: "How do I dodge Low Balance Fees? 🚫", value: "How do I evade minimum balance penalty and administrative fees in the UAE?" },
    { text: "Is my student account fee illegal? 🎓", value: "Are traditional banks allowed to fine students for dropping below their minimum limits in Dubai?" }
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map existing messages to history payload
      const historyPayload = messages.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Server response went sideways");
      }

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "assistant",
        text: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        text: "Uh oh, habibi! I lost my internet connection. Please verify your internet or ensure your server.ts is running. You can still test out other awesome features of DirhamBuddy on the dashboard!",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        text: `Chat reset! Let's build a budget and skip some hidden fees today. What's on your mind?`,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div id="dirhambuddy-chat-panel" className="bg-slate-900 text-white rounded-[24px] border border-slate-800 p-5 shadow-xl flex flex-col h-[540px]">
      {/* Bot Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="w-9 h-9 rounded-xl bg-teal-500 text-slate-900 flex items-center justify-center font-bold text-lg select-none">
              🐪
            </span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-tight text-teal-400">DirhamBuddy Expert</h3>
            <p className="text-[10px] text-slate-400">Witty saving buddy • Online</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bubble Message Stream */}
      <div className="flex-1 overflow-y-auto px-1 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs select-none shrink-0 ${m.role === 'user' ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800'}`}>
              {m.role === 'user' ? '👤' : '🐪'}
            </div>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs inline-block leading-relaxed ${m.role === 'user' ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-800'}`}>
              <pre className="whitespace-pre-wrap font-sans font-normal antialiased">
                {m.text}
              </pre>
              <span className="block text-[8px] opacity-40 text-right mt-1">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs shrink-0 text-slate-500 animate-spin">
              <Loader className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-800 text-slate-400 rounded-xl rounded-tl-none px-3 py-2 text-xs border border-slate-800 italic">
              DirhamBuddy is writing shawarma math...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Quick nudges */}
      <div className="py-2 overflow-x-auto flex gap-1.5 scrollbar-none shrink-0 border-t border-slate-800 mt-2">
        {QUICK_PROMPTS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.value)}
            className="whitespace-nowrap px-2.5 py-1 text-[10px] font-medium rounded-full bg-slate-800 hover:bg-teal-500 hover:text-slate-950 transition-all border border-slate-700 hover:border-teal-500 cursor-pointer shrink-0 text-slate-300"
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        className="flex items-center gap-1.5 pt-2 border-t border-slate-800 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything, e.g. "Draft Zara a saving plan"...`}
          className="flex-1 bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
