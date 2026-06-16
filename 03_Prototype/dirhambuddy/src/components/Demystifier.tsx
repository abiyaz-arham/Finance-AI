import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { JargonTerm } from '../types';

export const JARGON_DICTIONARY: Record<string, JargonTerm> = {
  "inflation": {
    term: "Inflation",
    definition: "The rate at which the general level of prices for goods and services is rising, and, subsequently, purchasing power is falling.",
    everydayAnalogy: "Imagine your favorite warm Shawarma used to cost AED 7 last year. This year, the price is AED 10, or it's the same AED 7 but half the size. That's inflation stealing your shawarma's girth! Your money is staying the same, but things are getting more expensive.",
    glowUpAlternative: "Tame it by putting spare cash into high-yield accounts/assets rather than letting it evaporate under your mattress."
  },
  "compound interest": {
    term: "Compound Interest",
    definition: "Interest calculated on the initial principal, which also includes all of the accumulated interest of previous periods on a deposit or loan.",
    everydayAnalogy: "It's literally 'interest on interest'. Think of it as a snowball effect for your dirhams. If you save 100 AED and get 10% interest, you have 110 AED. Next time, you earn interest on 110 AED (getting 11 AED), not just 100 AED. It starts slow, but eventually, your money does a massive glow-up and multiplies while you sleep!",
    glowUpAlternative: "Start early! Even 50 AED a month compounding for 10 years beats starting with 500 AED a month for just 2 years."
  },
  "administrative fees": {
    term: "Administrative Fees",
    definition: "Fees charged by financial institutions to cover the costs of maintaining accounts, processing transactions, or managing services.",
    everydayAnalogy: "This is basically the bank charging you a tax for breathing their air. It's like a restaurant charging you a 15 AED 'plate-cleaning fee' on top of your meal price. Annoying, easily missed, and completely eats into your pocket money.",
    glowUpAlternative: "Switch to zero-balance, digital-first accounts (like some modern UAE digital banks) that throw these fees into the bin."
  },
  "foreign exchange spread": {
    term: "Foreign Exchange Spread (FX Fee)",
    definition: "The difference between the wholesale market rate for a currency and the rate a bank charges retail customers.",
    everydayAnalogy: "When you send AED back home or buy something from a US store, the bank uses a slightly worse exchange rate than the true rate and pockets the difference. It's like paying a friend to buy you a bubble tea of 15 AED, they buy it for 12 AED but declare it cost 15 AED and keep the change.",
    glowUpAlternative: "Use dedicated remittance apps with transparent rates instead of sending money directly through old-school bank wire transfers."
  },
  "minimum balance penalty": {
    term: "Minimum Balance Penalty",
    definition: "A charge levied by traditional banks if your average monthly account balance falls below a specific threshold.",
    everydayAnalogy: "The bank literally punishing you for not having enough money! It's like a gym charging you a penalty fee because you didn't work out at least 3 times a week. If your balance dips under 3,000 AED monthly, standard traditional accounts will deduct 25 AED as a fine.",
    glowUpAlternative: "Look for 'no-minimum-balance' accounts or transfer your salary directly to waive the penalty."
  },
  "subscription creep": {
    term: "Subscription Creep",
    definition: "The gradual accumulation of repeating monthly digital subscriptions that go unused but continue to drain funds.",
    everydayAnalogy: "That AED 30/month Spotify + AED 40 Netflix + AED 35 gaming pass + AED 15 premium delivery subscription that you forgot you even signed up for. Each is tiny, but together they devour AED 150+ monthly - which is like 15 free Karak + samosa combos gone!",
    glowUpAlternative: "Audit your bank statement on DirhamBuddy's 'Fee Detector' and ruthlessly cancel anything you haven't used this past week."
  },
  "loan interest caps": {
    term: "CBUAE Loan Interest Regulations",
    definition: "Regulatory rules set by the Central Bank of the UAE limits the maximum debt charges and interest rates on retail finance.",
    everydayAnalogy: "CBUAE acts as the designated referee of the game. If banks try to charge you crazy interest rates or pile up hidden insurance fees on a personal loan, CBUAE rules blow the whistle and say 'Nope! That is illegal'. It protects you from getting trapped in endless debt loops.",
    glowUpAlternative: "If a bank starts acting shady with credit card fee calculations, file a formal complaint! You have legal rights."
  },
  "cbuae": {
    term: "CBUAE (Central Bank of the UAE)",
    definition: "The state financial regulator that supervises banks, rules currency, and protects and mediates customer financial rights.",
    everydayAnalogy: "Think of them as the Ultimate Financial Guard Dog of the UAE. They set all the banking safety rules, and banks are terrified of getting on their bad side. They're here to hold banks accountable if they scam you.",
    glowUpAlternative: "Always quote 'CBUAE Consumer Protection Regulations' in letters to banks - they fast-track your concern immediately!"
  },
  "sanadak": {
    term: "Sanadak (The Ombudsman)",
    definition: "An independent, state-sanctioned financial grievance ombudsman unit in the UAE that resolves disputes with financial institutions.",
    everydayAnalogy: "Like a free private investigator and court judge rolled into one. If your bank says 'Too bad, we won't refund that scam charge', you go to Sanadak. If Sanadak agrees with you, they command the bank to give your money back. The bank has to obey legally!",
    glowUpAlternative: "Always file your complaint with the bank first. If they don't solve it in 30 days, drag them straight to Sanadak!"
  },
  "credit shield premium": {
    term: "Credit Shield Premium",
    definition: "An optional insurance fee charged by credit card companies to cover outstanding debt in case of emergencies.",
    everydayAnalogy: "Banks sneakily check this box when you sign up for a credit card. They charge you a percentage of your balance every month for 'insurance'. It's like buying a screen protector for a AED 300 phone that costs AED 20 every single month. A total money leak if you plan to pay your balance on time!",
    glowUpAlternative: "Call your credit card helpline immediately and say: 'Cancel my Credit Shield fee please!' They must stop charging it."
  },
  "inactive account fee": {
    term: "Inactive Account Fee",
    definition: "An administrative charge applied to accounts with no customer-initiated transaction over a long period.",
    everydayAnalogy: "Think of it like a landlord charging you 'grief tax' because you spent summer vacation away from your room. If you leave a secondary bank account sitting idle for over a year without any action, traditional banks start chipping away AED 10-25 monthly just for keeping it open.",
    glowUpAlternative: "Keep at least one active, free transaction per year, or close down accounts you do not use!"
  }
};

interface DemystifierProps {
  term: string;
  children?: React.ReactNode;
  className?: string;
}

export const Demystifier: React.FC<DemystifierProps> = ({ term, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const normalizedKey = term.toLowerCase().trim();
  const jargon = JARGON_DICTIONARY[normalizedKey] || {
    term: term,
    definition: "A complex financial term used to describe market mechanics or fees.",
    everydayAnalogy: `Think of ${term} like a sneaky side charge or rules that can drain your wallet if you aren't paying attention!`,
    glowUpAlternative: "Simplify and review your bank statements regularly to protect your dirhams."
  };

  return (
    <span className="inline-block relative">
      <button
        id={`demystify-${normalizedKey.replace(/\s+/g, '-')}`}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium hover:bg-amber-100 transition-colors cursor-pointer select-none ${className}`}
        title="Click to Demystify This Term!"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>{children || jargon.term}</span>
        <ChevronDown className={`w-3 h-3 text-amber-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for easy click-away targeting */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-72 sm:w-80 md:w-96 rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50 text-left text-xs text-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span className="font-display font-semibold text-slate-900 text-sm">
                    Demystifying: <span className="text-teal-600">{jargon.term}</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-900 block mb-0.5">The Boring definition:</span>
                  <p className="text-slate-500 leading-relaxed italic">{jargon.definition}</p>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-100">
                  <span className="font-semibold text-amber-900 flex items-center gap-1 mb-1">
                    💡 The Shawarma Math (Everyday Analogy):
                  </span>
                  <p className="text-slate-700 leading-relaxed font-sans">{jargon.everydayAnalogy}</p>
                </div>

                <div className="bg-teal-50/70 p-2.5 rounded-lg border border-teal-100">
                  <span className="font-semibold text-teal-900 block mb-0.5">🚀 Money Glow-up Move:</span>
                  <p className="text-slate-700 leading-relaxed">{jargon.glowUpAlternative}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
};
