import { MockProfile } from './types';

export const MOCK_PROFILES: MockProfile[] = [
  {
    id: "zara",
    name: "Zara",
    avatar: "👩‍🎓",
    age: 21,
    role: "The Hustling College Student",
    monthlyIncome: 3000,
    unresolvedFeesText: "75 AED of sneaky leaks found!",
    categorySpending: [
      { category: "Talabat & Food Delivery 🍔", spent: 1600, budget: 800, description: "A few midnight burger cravings and delivery fees devoured more than half your budget!" },
      { category: "Metro & Transport 🚇", spent: 400, budget: 450, description: "Under budget! Using the Metro instead of taxis saves major dirhams." },
      { category: "Fun, Boba & Boba accessories 🧋", spent: 750, budget: 400, description: "Over budget because those aesthetic cafe runs with friends multiplied fast." },
      { category: "Future Savings Bag 💰", spent: 250, budget: 1350, description: "45% of UAE residents haven't saved for retirement or emergencies. You saved 250 AED, but hidden leaks stopped you from saving more!" }
    ],
    recentTransactions: [
      {
        id: "z-t1",
        title: "Sneaky Balance Fine",
        merchant: "Legacy Bank Corp",
        amount: 25,
        date: "Yesterday",
        isFee: true,
        feeType: "minimum balance penalty",
        feeDescription: "Charged because your balance dropped below 1,000 AED on your personal wallet.",
        simpleExplanation: "They literally penalized you for not having enough cash. In the UAE, student accounts should be exempt from minimum balance rules!"
      },
      {
        id: "z-t2",
        title: "Gym Pass Creep",
        merchant: "ActiveFit Gym App",
        amount: 35,
        date: "3 days ago",
        isFee: true,
        feeType: "subscription creep",
        feeDescription: "Monthly automatic billing for an workout application you opened exactly once.",
        simpleExplanation: "A silent money leak. Tiny repeat charges that bank on your forgetfulness. Cancel it today!"
      },
      {
        id: "z-t3",
        title: "Legacy Wallet Fee",
        merchant: "Old Traditional Bank",
        amount: 15,
        date: "Last week",
        isFee: true,
        feeType: "inactive account fee",
        feeDescription: "Charge applied on an old, forgotten savings bank booklet.",
        simpleExplanation: "They are charging you rent on an empty account. Keep it active with 1 transaction per year or shut it down completely!"
      },
      {
        id: "z-t4",
        title: "Talabat Super Saver Delivery",
        merchant: "Talabat Delivery",
        amount: 85,
        date: "Yesterday",
        isFee: false
      },
      {
        id: "z-t5",
        title: "Freelance TikTok Subtitles Payment",
        merchant: "SocialMedia Agency DXB",
        amount: 1500,
        date: "5 days ago",
        isFee: false
      }
    ]
  },
  {
    id: "ahmed",
    name: "Ahmed",
    avatar: "👨‍💻",
    age: 24,
    role: "The Entry-Level Techie",
    monthlyIncome: 8000,
    unresolvedFeesText: "197 AED in structural bank leaks detected!",
    categorySpending: [
      { category: "Rent & AC Bills (DEWA) 🏠", spent: 4500, budget: 4000, description: "AC bill surged because of summer heat, plus rent is a heavy slice of the pie." },
      { category: "Groceries & Cafe Karak ☕", spent: 1200, budget: 1000, description: "Daily Karak runs (2.5 AED each) are fine, but grocery deliveries add hidden admin fees." },
      { category: "Family Support Wire 🚀", spent: 1500, budget: 1500, description: "Honoring family remittance obligations. Solid job, but traditional wire fees hit hard." },
      { category: "Fun & Leisure DXB 🏄‍♂️", spent: 600, budget: 500, description: "Slightly over budget owing to active social weekends in Marina." },
      { category: "Savings Stack 🏦", spent: 200, budget: 1000, description: "Struggling to build the emergency fund because bank admin charges leak cash." }
    ],
    recentTransactions: [
      {
        id: "a-t1",
        title: "Sneaky Credit Shield Premium",
        merchant: "Shady Card Bank DXB",
        amount: 150,
        date: "Yesterday",
        isFee: true,
        feeType: "credit shield premium",
        feeDescription: "Hidden premium charge added automatically to protect outstanding card debt.",
        simpleExplanation: "They snuck in credit card insurance. If you pay your card off on time, this is an expensive, useless leak. Call them and cancel it."
      },
      {
        id: "a-t2",
        title: "Remittance FX Fee Markup",
        merchant: "Traditional Exchange House",
        amount: 35,
        date: "3 days ago",
        isFee: true,
        feeType: "foreign exchange spread",
        feeDescription: "Implicit cost of converting AED currency into hometown rate with high margins.",
        simpleExplanation: "The exchange house gave you a bad conversion rate and kept the change. Use smart mobile apps next time for flat rates!"
      },
      {
        id: "a-t3",
        title: "Paper Invoice Printing Charge",
        merchant: "Retail Bank UAE",
        amount: 12,
        date: "Last week",
        isFee: true,
        feeType: "administrative fees",
        feeDescription: "Charged for sending or printing hardcopy debit card slips.",
        simpleExplanation: "Charging you 12 AED to print paper. Switch to e-statements in the banking app to instantly opt-out."
      },
      {
        id: "a-t4",
        title: "Monthly Salary Credit",
        merchant: "Dubai Tech Solutions",
        amount: 8000,
        date: "Last week",
        isFee: false
      },
      {
        id: "a-t5",
        title: "Carrefour Weekly Organic",
        merchant: "Carrefour DXB",
        amount: 220,
        date: "2 days ago",
        isFee: false
      }
    ]
  },
  {
    id: "mariam",
    name: "Mariam",
    avatar: "👩‍🎨",
    age: 27,
    role: "The Budding Creator",
    monthlyIncome: 12000,
    unresolvedFeesText: "350 AED in premium leaks detected!",
    categorySpending: [
      { category: "Rent & Co-working ☕", spent: 6500, budget: 6000, description: "A hot-desk in Alserkal Avenue and home rent consume half of mariam's cash." },
      { category: "Camera Gear & Tech 📸", spent: 2500, budget: 2000, description: "Imported lens from foreign retailer sparked heavy cross-border admin taxes!" },
      { category: "Food, Matcha & Dinners 🍣", spent: 2500, budget: 2000, description: "DXB's aesthetic restaurants and specialty specialty Matcha are premium drains." },
      { category: "Future Wealth Accumulator 📈", spent: 500, budget: 2000, description: "Sparing little for future investing, hindered by credit cards with high admin fee marks." }
    ],
    recentTransactions: [
      {
        id: "m-t1",
        title: "Cross-Border Transaction Fee",
        merchant: "Global Camera Store US",
        amount: 250,
        date: "Yesterday",
        isFee: true,
        feeType: "administrative fees",
        feeDescription: "Sneaky 2.5% administrative and FX markup fee for buying a lens from an American webstore.",
        simpleExplanation: "The bank takes a cut just because your currency traveled digitally across continents. Next time, use local sellers or pay with multi-currency virtual cards."
      },
      {
        id: "m-t2",
        title: "Late Payment Penalty Fee",
        merchant: "Vibrant Credit Card Corp",
        amount: 100,
        date: "4 days ago",
        isFee: true,
        feeType: "administrative fees",
        feeDescription: "Charged for being 1 day late on credit card bill transfer.",
        simpleExplanation: "A hefty fine. Set up automated direct debits in your banking application to trigger payments a day early to escape this trap!"
      },
      {
        id: "m-t3",
        title: "Zoom Premium Inactive",
        merchant: "Zoom Inc Subscription",
        amount: 55,
        date: "Last week",
        isFee: false,
        feeType: "subscription creep"
      },
      {
        id: "m-t4",
        title: "Creator Brand Collaboration",
        merchant: "Vogue Dubai",
        amount: 12000,
        date: "Last week",
        isFee: false
      }
    ]
  }
];

export interface RegulatoryFact {
  id: string;
  title: string;
  category: "Sanadak" | "Balance Rules" | "Interest Limits" | "Settlement Penalty";
  ruleName: string;
  simplifiedLaw: string;
  whyCare: string;
}

export const REGULATORY_FACTS: RegulatoryFact[] = [
  {
    id: "reg-1",
    title: "Sanadak Escalation Law",
    category: "Sanadak",
    ruleName: "Right to Complaint Ombudsman Redressal",
    simplifiedLaw: "If you submit a formal complaint about a banking issue (such as unauthorized fee, card scam, or fake credit shield charge) and the bank refuses to resolve it or fails to reply within 30 calendar days, you can lodge it directly to Sanadak, the free UAE ombudsman.",
    whyCare: "It stops banks from ignoring your emails. Sanadak is legally authorized to override the bank and force them to issue a full refund."
  },
  {
    id: "reg-2",
    title: "The Zero-Balance Student Mandate",
    category: "Balance Rules",
    ruleName: "Exemptions from minimum balance penalty",
    simplifiedLaw: "Traditional banks are restricted from penalizing students, low-income earners, or salary depositors with minimum average balance fees.",
    whyCare: "If a traditional bank charged you 25 AED for dipping under a 3,000 AED threshold, they might have violated the law. You are entitled to claim that back!"
  },
  {
    id: "reg-3",
    title: "Personal Loan Penalty Safeguard",
    category: "Settlement Penalty",
    ruleName: "Caps on Early Settlement Charges",
    simplifiedLaw: "According to the Central Bank of the UAE regulatory guides, the late settlement fees and early loan closure penalties are capped at a absolute maximum of 1% or 10,000 AED, whichever is smaller.",
    whyCare: "Some banks try to charge you a huge fee if you try to pay off your debt early! CBUAE rules stop them from trying to trap you in interest loops."
  },
  {
    id: "reg-4",
    title: "Minimum Payment Fraud Warnings",
    category: "Interest Limits",
    ruleName: "CBUAE Banking Care Directive",
    simplifiedLaw: "Banks must outline clearly to patrons that paying only the '5% minimum balance' on credit card invoices creates rolling multi-period rates that result in high debt.",
    whyCare: "Paying only the minimum leaves 95% of your bill compounding. It's how banks make bill payments last 10 years for a single iPad purchase!"
  }
];
