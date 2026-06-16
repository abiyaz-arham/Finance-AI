export interface MockProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  role: string;
  monthlyIncome: number;
  unresolvedFeesText: string;
  categorySpending: {
    category: string;
    spent: number;
    budget: number;
    description: string;
  }[];
  recentTransactions: {
    id: string;
    title: string;
    merchant: string;
    amount: number;
    date: string;
    isFee: boolean;
    feeType?: string;
    feeDescription?: string;
    simpleExplanation?: string;
  }[];
}

export interface JargonTerm {
  term: string;
  definition: string;
  everydayAnalogy: string;
  glowUpAlternative: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}
