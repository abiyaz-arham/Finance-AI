import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  Coins,
  FileText,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Info,
  ExternalLink,
  Percent,
  Briefcase,
  AlertCircle,
  PiggyBank,
  CreditCard,
  Search,
  BookOpen,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { MOCK_PROFILES, REGULATORY_FACTS } from './data';
import { JARGON_DICTIONARY, Demystifier } from './components/Demystifier';
import { DisputeAssistant } from './components/DisputeAssistant';
import { CompanionBot } from './components/CompanionBot';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cbuae' | 'dictionary'>('dashboard');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('zara');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get selected profile data
  const profile = MOCK_PROFILES.find(p => p.id === selectedProfileId) || MOCK_PROFILES[0];

  // Filter dictionary terms based on search query
  const filteredTerms = Object.values(JARGON_DICTIONARY).filter(t =>
    t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.everydayAnalogy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-100 antialiased selection:text-teal-900">
      
      {/* TOP NAVIGATION */}
      <header className="shrink-0 sticky top-0 z-30 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <nav className="flex justify-between items-center bg-white px-6 sm:px-8 py-4 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center text-white text-xl font-bold select-none">
              🐪
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Dirham<span className="text-teal-600">Buddy</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium font-sans uppercase tracking-widest leading-none mt-0.5">
                Gen-Z UAE Care Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-right">
              <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">CURRENT PROFILE</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">{profile.name} Al-Hashimi (Active ⚡)</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-teal-500 p-0.5 shrink-0 shadow-xs">
              <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 text-xl sm:text-2xl select-none">
                {profile.avatar}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* PARENT CONTAINER - Tab view + Chat grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT 2 COLUMNS - Tab Contents */}
          <section className="lg:col-span-2 space-y-6">
            
            {/* Sub-navigation Tabs control */}
            <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1.5 max-w-md">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'dashboard' ? 'bg-white text-slate-900 shadow-xs border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>My Money Tab</span>
              </button>
              <button
                onClick={() => setActiveTab('cbuae')}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'cbuae' ? 'bg-white text-slate-900 shadow-xs border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Disputes & CBUAE</span>
              </button>
              <button
                onClick={() => setActiveTab('dictionary')}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'dictionary' ? 'bg-white text-slate-900 shadow-xs border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Jargon Dictionary</span>
              </button>
            </div>

            {/* TAB CONTENTS - Active view Switcher */}
            <div className="min-h-[460px]">
              
              {/* TAB 1: MY MONEY DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  
                  {/* Account profile Selection & Toggle */}
                  <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">Simulated Account API</span>
                        <h2 className="font-display font-bold text-slate-900 text-base">Select Your Live UAE Demo Profile</h2>
                      </div>
                      
                      {/* Interactive Buttons Toggle */}
                      <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                        {MOCK_PROFILES.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedProfileId(p.id)}
                            className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${selectedProfileId === p.id ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                          >
                            <span>{p.avatar}</span>
                            <span>{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Profile Info bar */}
                    <div className="bg-gradient-to-r from-teal-500/10 to-transparent p-4 rounded-xl border border-teal-500/10 flex items-center gap-3.5">
                      <span className="w-11 h-11 bg-white border border-teal-100 rounded-full flex items-center justify-center text-2xl shadow-sm select-none">
                        {profile.avatar}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 text-sm">{profile.name} Al-Hashimi</h3>
                          <span className="text-[10px] px-2 py-0.5 font-semibold bg-white border border-slate-200 text-slate-600 rounded-full">{profile.role}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          Monthly Disposable Income: <b className="text-slate-800 font-sans text-sm">{profile.monthlyIncome.toLocaleString()} AED</b>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Balance & Quick Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-teal-400 to-teal-700 text-white p-6 rounded-[24px] shadow-sm flex flex-col justify-between border border-teal-600/10">
                      <p className="text-teal-100 text-[11px] font-semibold uppercase tracking-wider">Total Balance</p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">AED {(profile.monthlyIncome).toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
                      <div className="mt-2.5 flex items-center gap-1.5">
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-lg">+2.4% from salary transfer</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col justify-between">
                      <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Spending Limit</p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">AED {(profile.monthlyIncome * 0.45).toLocaleString(undefined, {maximumFractionDigits: 0})}</h2>
                      <p className="text-xs text-rose-500 font-medium mt-2">85% used this week</p>
                    </div>

                    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col justify-between">
                      <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Savings Goal</p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
                        AED {(profile.categorySpending.find(c => c.category.includes('Savings'))?.spent || 250).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </h2>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                        <div className="bg-teal-500 h-full w-[65%] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Spending Breakdown Category Segment with visual progress bars */}
                  <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
                      <div>
                        <h3 className="font-display font-bold text-slate-900 text-sm">Where is My Money Slipping Away? 💸</h3>
                        <p className="text-[10px] text-slate-500">Uncluttered real spending ledger vs monthly budgets.</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">No Complex Pie Charts Required!</span>
                    </div>

                    <div className="space-y-5">
                      {profile.categorySpending.map((cat, index) => {
                        const ratio = cat.spent / cat.budget;
                        const isOver = cat.spent > cat.budget;
                        const percentString = `${Math.min(ratio * 100, 100)}%`;

                        return (
                          <div key={index} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-800">{cat.category}</span>
                              <div className="font-mono text-slate-500 flex gap-2">
                                <span>Spent: <b className={isOver ? 'text-red-500' : 'text-teal-600'}>{cat.spent} AED</b></span>
                                <span>/</span>
                                <span>Budget: {cat.budget} AED</span>
                              </div>
                            </div>
                            
                            {/* Simple, intuitive progress meter */}
                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                              <div
                                style={{ width: percentString }}
                                className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500' : (ratio > 0.8 ? 'bg-amber-500' : 'bg-teal-500')}`}
                              />
                            </div>

                            {/* Witty Gen-Z feedback */}
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-1.5 min-h-[46px]">
                              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                              <p className="text-[10px] text-slate-600 leading-relaxed font-sans font-medium">
                                {cat.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* "FINE PRINT" & HIDDEN FEE DETECTOR */}
                  <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                    
                    {/* Corner badge */}
                    <div className="absolute right-0 top-0 bg-rose-500 text-white font-bold text-[8px] py-1 px-3 uppercase tracking-wider rounded-bl-xl select-none">
                      Warning: Leak Found!
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600 block">
                        <AlertCircle className="w-4.5 h-4.5" />
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-slate-900 text-sm">
                          {profile.name}'s Hidden Fee & Jargon Detector
                        </h3>
                        <p className="text-[10px] text-slate-500">
                          We audited the fine print of actual statements. Click the orange <span className="text-amber-700 bg-amber-50 font-bold px-1 rounded">Demystify It</span> tags below!
                        </p>
                      </div>
                    </div>

                    {/* Alert summary block */}
                    <div className="bg-rose-50/50 border border-rose-100 text-rose-900 p-3.5 rounded-xl mb-4 text-xs font-semibold flex items-center justify-between">
                      <span>Total Unresolved Money Leaks:</span>
                      <span className="font-mono font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-lg">
                        {profile.unresolvedFeesText}
                      </span>
                    </div>

                    {/* Fee Transaction List */}
                    <div className="space-y-3.5">
                      {profile.recentTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className={`p-4 rounded-xl border transition-all ${tx.isFee ? 'bg-amber-50/20 border-amber-200/60' : 'bg-slate-50/50 border-slate-100'}`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-slate-900 text-xs">{tx.title}</span>
                                {tx.isFee && tx.feeType && (
                                  <Demystifier term={tx.feeType} className="scale-90" />
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 block mt-0.5">{tx.merchant} • {tx.date}</span>
                            </div>
                            <span className={`font-mono text-xs font-bold ${tx.isFee ? 'text-amber-700 font-extrabold' : 'text-slate-700'}`}>
                              {tx.isFee ? '–' : ''} {tx.amount} AED
                            </span>
                          </div>

                          {/* Simplified explanation of fee */}
                          {tx.isFee && (
                            <div className="bg-white border border-amber-100 rounded-lg p-2.5 mt-2 flex items-start gap-1.5">
                              <span className="text-xs shrink-0 select-none">🧐</span>
                              <div>
                                <span className="text-[10px] text-slate-400 block leading-tight">The sneaky part:</span>
                                <p className="text-[10px] text-slate-600 leading-snug mt-0.5">{tx.feeDescription}</p>
                                <span className="text-[10px] text-teal-700 font-semibold block mt-1">
                                  💡 Everyday translation: {tx.simpleExplanation}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 text-center">
                      <button
                        onClick={() => setActiveTab('cbuae')}
                        className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 justify-center mx-auto transition-colors cursor-pointer"
                      >
                        <span>Need a refund? Launch the CBUAE Letter builder</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: CBUAE LAWS & DISPUTE LETTER BUILDER */}
              {activeTab === 'cbuae' && (
                <div className="space-y-6">

                  {/* Highlights section: CBUAE mandates made simple */}
                  <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                      <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 block select-none">
                        ⚖️
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-slate-900 text-sm">
                          Your Rights: CBUAE Consumer Protection Demystified
                        </h3>
                        <p className="text-[10px] text-slate-500">
                          We translated the massive Central Bank rulebook into simple, unpenalized terms.
                        </p>
                      </div>
                    </div>

                    {/* Horizontal scroll grid of simplified rules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {REGULATORY_FACTS.map((fact) => (
                        <div key={fact.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50 hover:bg-slate-50/80 transition-all flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold bg-teal-100/60 text-teal-800 px-2 py-0.5 rounded-full select-none w-fit">
                              {fact.category} Law Protected
                            </span>
                            <span className="block font-bold text-slate-900 text-xs tracking-tight leading-snug">
                              {fact.title}
                            </span>
                            <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                              {fact.simplifiedLaw}
                            </p>
                          </div>
                          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100 mt-3 text-[10px] text-amber-900 leading-snug">
                            <p><b>🔑 Why care?</b> {fact.whyCare}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-step dispute generator assistant form */}
                  <DisputeAssistant />

                </div>
              )}

              {/* TAB 3: STANDALONE JARGON DICTIONARY SEARCH */}
              {activeTab === 'dictionary' && (
                <div className="space-y-6">
                  
                  {/* Search Engine Header */}
                  <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm">
                    <div className="max-w-xl">
                      <h3 className="font-display font-bold text-slate-900 text-sm mb-1">
                        Gen-Z Financial Jargon Search Engine 🌯
                      </h3>
                      <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">
                        Never feel intimidated by credit brokers again! Type any weird finance word below and expand the "Shawarma Math" everyday analogy instantly.
                      </p>
                      
                      {/* Search Bar input */}
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="Search e.g. compound interest, inflation, credit shield..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Active Term results listing */}
                  <div className="space-y-4">
                    {filteredTerms.length > 0 ? (
                      filteredTerms.map((t) => (
                        <div key={t.term} className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm space-y-3.5">
                          <div className="flex items-center justify-between border-b border-slate-50 pb-2 flex-wrap gap-2">
                            <span className="font-display font-semibold text-slate-900 text-base flex items-center gap-1.5">
                              📙 <span className="text-teal-600">{t.term}</span>
                            </span>
                            <Demystifier term={t.term.toLowerCase()}>Click to Test Tooltip!</Demystifier>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="bg-slate-50 p-3 rounded-lg">
                              <span className="font-bold text-slate-900 block mb-0.5">Formal Definition:</span>
                              <p className="text-slate-500 leading-relaxed text-[11px] italic">{t.definition}</p>
                            </div>

                            <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-100">
                              <span className="font-bold text-amber-950 flex items-center gap-1 mb-1 text-[11px]">
                                💡 Shawarma Math (Everyday Analogy):
                              </span>
                              <p className="text-slate-700 leading-relaxed font-sans">{t.everydayAnalogy}</p>
                            </div>

                            <div className="bg-teal-50 p-2.5 rounded-lg border border-teal-100 text-[11px]">
                              <p className="text-slate-700"><b>🚀 Money Glow-up Move:</b> {t.glowUpAlternative}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-xs">
                        No matches found for "{searchQuery}". Ask our AI Companion below to define it for you!
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

          </section>

          {/* RIGHT COLUMN - Persistent AI chat assistant panel */}
          <aside className="lg:col-span-1 space-y-4">
            
            {/* Quick Education Fact snippet box */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-amber-600 tracking-wider">Education Highlight</span>
              <h4 className="font-bold text-slate-900 text-xs mt-0.5 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Empathetic PEER chatbot
              </h4>
              <p className="text-[10px] text-slate-700 leading-relaxed font-sans">
                Our inline helper <b>DirhamBuddy</b> behaves as a witty, smart guide. It automatically turns jargon into easy-to-understand UAE examples, and savings hurdles into micro-challenges. Ask it to "Give me a Daily Save Challenge" below!
              </p>
            </div>

            {/* AI Companion chatbot widget body */}
            <CompanionBot onSelectedProfileName={profile.name} />

          </aside>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-medium">
            🐪 DirhamBuddy • Dedicated to raising Gen-Z financial welfare & literacy in the UAE.
          </p>
          <div className="mt-2 flex flex-wrap gap-2.5 justify-center items-center">
            <span>Powered by Gemini Artificial Intelligence</span>
            <span>•</span>
            <span>All dispute letter drafts are reference materials adhering to CBUAE standards.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
