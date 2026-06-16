import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Copy, Check, ShieldAlert, Sparkles, AlertTriangle, RefreshCw, Send, ChevronRight, HelpCircle } from 'lucide-react';
import { Demystifier } from './Demystifier';

interface DisputeFormState {
  fullName: string;
  email: string;
  phone: string;
  bankName: string;
  disputeType: string;
  unauthorizedAmount: string;
  transactionDate: string;
  details: string;
  exemptionClaim: boolean;
}

export const DisputeAssistant: React.FC = () => {
  const [form, setForm] = useState<DisputeFormState>({
    fullName: '',
    email: '',
    phone: '',
    bankName: '',
    disputeType: 'unauthorized_scam',
    unauthorizedAmount: '',
    transactionDate: '',
    details: '',
    exemptionClaim: true
  });

  const [step, setStep] = useState<1 | 2>(1);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const prefillMock = (profileName: string) => {
    if (profileName === 'zara') {
      setForm({
        fullName: 'Zara Al-Mansoori',
        email: 'zara.alm@outlook.com',
        phone: '+971 50 123 4567',
        bankName: 'Legacy Bank Corp',
        disputeType: 'minimum_balance',
        unauthorizedAmount: '25',
        transactionDate: '2026-06-08',
        details: 'Minimum balance fee charged on my student account. Student accounts must be exempt from minimum balance rules as per CBUAE regulations.',
        exemptionClaim: true
      });
    } else if (profileName === 'ahmed') {
      setForm({
        fullName: 'Ahmed Bin Sulayem',
        email: 'ahmed.codes@outlook.com',
        phone: '+971 55 987 6543',
        bankName: 'Shady Card Bank DXB',
        disputeType: 'credit_shield',
        unauthorizedAmount: '150',
        transactionDate: '2026-06-09',
        details: 'Charging me a monthly premium for Credit Shield insurance which I never requested or checked any tick-box for when taking the credit card.',
        exemptionClaim: true
      });
    } else {
      setForm({
        fullName: 'Mariam Al-Harmoodi',
        email: 'mariam.creations@gmail.com',
        phone: '+971 52 333 4444',
        bankName: 'Vibrant Credit Card Corp',
        disputeType: 'cross_border',
        unauthorizedAmount: '250',
        transactionDate: '2026-06-07',
        details: 'A massive 2.5% FX administrative charge and fine was assessed on raw equipment import without clear pre-purchase warning and breakdown of costs in the SMS statement.',
        exemptionClaim: true
      });
    }
  };

  const generateLetterText = () => {
    const dateToday = new Date().toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' });
    const refNum = `DB-${Math.floor(100000 + Math.random() * 900000)}`;

    let specificComplaintText = '';
    let referencedRegulation = '';

    switch (form.disputeType) {
      case 'unauthorized_scam':
        specificComplaintText = `On ${form.transactionDate || '[Date]'}, an unauthorized charge of AED ${form.unauthorizedAmount || '[Amount]'} was processed on my account from merchant details that I do not recognize. I suspect this is fraudulent/scam activity. I was not prompted with an OTP or multi-factor approval, meaning security standard procedures of the portal did not guard this transaction. I require a complete dispute investigation and chargeback processing.`;
        referencedRegulation = `CBUAE Consumer Protection Regulations, specifically regarding Retail Payment Security standards and unauthorized liability guidelines.`;
        break;
      case 'minimum_balance':
        specificComplaintText = `I noticed an active deduction of AED ${form.unauthorizedAmount || '[Amount]'} labeled as a 'Minimum Balance Penalty Fee' on ${form.transactionDate || '[Date]'}. As a student, my bank account is exempted from being penalized for monthly average balance drops. This fee is unfair and violates standard consumer guidelines regarding low-income/student financial protection.`;
        referencedRegulation = `CBUAE Decretal Federal Law No. (14) of 2018 regarding minimum balance fee exemptions for protected categories (students, salary-transfer, and low-income residents).`;
        break;
      case 'credit_shield':
        specificComplaintText = `A recurring monthly fee of AED ${form.unauthorizedAmount || '[Amount]'} has been assessed against my account for 'Credit Shield / Debt Insurance Premium'. I did not select this option, nor did I explicitly authorize this premium at the inception of setting up this card. This is a non-consensual fee addition. Please cancel this insurance immediately and credit back all past premium charges.`;
        referencedRegulation = `CBUAE Retail Banking Consumer Care mandates on fair treatment, prohibit pre-ticked check-boxes and automated unsolicited premium deductions.`;
        break;
      case 'cross_border':
        specificComplaintText = `I am writing to challenge an excessive FX administrative charge of AED ${form.unauthorizedAmount || '[Amount]'} applied to my payment on ${form.transactionDate || '[Date]'}. Traditional disclosure rules require that the full conversion markup be communicated clearly to the customer. This was not highlighted prior to carrying out the transaction.`;
        referencedRegulation = `CBUAE Consumer Protection Standards on Transparency, demanding full upfront cost breakdowns and clear disclosure of currency markups.`;
        break;
      default:
        specificComplaintText = `I am disputing a transaction charge of AED ${form.unauthorizedAmount || '[Amount]'} made on ${form.transactionDate || '[Date]'}. ${form.details || 'The bank has applied unfair fees without consent or clear notice.'}`;
        referencedRegulation = `CBUAE Financial Consumer Protection Directive.`;
    }

    return `Date: ${dateToday}
Ref No: ${refNum}

TO:
The Customer Services & Complaints Unit
${form.bankName || '[Bank Name]'}
United Arab Emirates

RE: FORMAL DISPUTE LETTER - UNAUTHORIZED / UNFAIR SERVICES BILLING

Dear Sir / Madam,

I am writing this formal letter to lodge a dispute regarding charges on my account. My details are provided below:

- Full Name: ${form.fullName || '[Your Full Name]'}
- Associated Email: ${form.email || '[Your Email]'}
- Connected Phone: ${form.phone || '[Your Phone]'}
- Disputed Transaction Date: ${form.transactionDate || '[Date]'}
- Disputed Fine Amount: AED ${form.unauthorizedAmount || '[Amount]'}

Complaint Specifics:
${specificComplaintText}

Extra Context / Explanatory details:
${form.details || 'The charge is unfair and lacks transactional transparency.'}

Regulatory Reference:
I am submitting this grievance in reference to the ${referencedRegulation}. Under these standards, the bank is obliged to preserve consumer welfare, investigate unfair fee structures, and reverse non-consensual penalty deductions.

Ombudsman Action (Sanadak Escalation):
Please resolve this issue and reverse the disputed fee and any associated rolled-up compound interest charges within thirty (30) calendar days. Should the bank fail to reply or arrive at a fair redress within this time frame, I will immediately escalate this petition to the independent national financial ombudsman unit (Sanadak) for binding arbitration.

Thank you. I look forward to your speedy assistance.

Sincerely,

_________________________
${form.fullName || '[Your Full Name]'}
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateLetterText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="dispute-workflow" className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5 mb-5 md:flex-row flex-col">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 block">
              <ShieldAlert className="w-5 h-5 shrink-0" />
            </span>
            <h2 className="font-display font-bold text-lg text-slate-900">
              CBUAE Dispute Letter Assistant
            </h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
            UA banking disputes skyrocketed by <b>54%</b> recently. If your bank snuck in weird fees or didn't secure deep scam losses, you have legally protected rights! Generate a solid dispute letter quoting <Demystifier term="cbuae">CBUAE regulations</Demystifier> to demand a refund.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 self-stretch md:self-auto">
          <span className="text-xs font-semibold text-slate-400 self-center">Autofill Profile mock:</span>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => prefillMock('zara')}
              className="px-2 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors border border-indigo-200 cursor-pointer"
            >
              Zara's Case 👩‍🎓
            </button>
            <button
              onClick={() => prefillMock('ahmed')}
              className="px-2 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200 cursor-pointer"
            >
              Ahmed's Case 👨‍💻
            </button>
            <button
              onClick={() => prefillMock('mariam')}
              className="px-2 py-1.5 text-xs font-medium rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors border border-amber-200 cursor-pointer"
            >
              Mariam's Case 👩‍🎨
            </button>
          </div>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-2.5 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900 block">Did you know?</span>
              Traditional banks MUST reply or refund within 30 days! After 30 days, if they play hard to get, you can immediately send this exact letter with ticket numbers to <Demystifier term="sanadak">Sanadak</Demystifier> for legal support.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Dispute Category</label>
              <select
                name="disputeType"
                value={form.disputeType}
                onChange={handleInputChange}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="unauthorized_scam">Unknown Scam / Unauthorized Card Deduction</option>
                <option value="minimum_balance">Unfair Minimum Balance Fine (Student Exemptions)</option>
                <option value="credit_shield">Non-consensual Credit Shield Fee Removal</option>
                <option value="cross_border">Sneaky Exchange Fee / Foreign markup Lack of Notice</option>
                <option value="other">Other Unfair Service Charge / Late Fee Markup</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Bank Name</label>
              <input
                type="text"
                name="bankName"
                placeholder="e.g. Emirates NBD, ADCB, Mashreq..."
                value={form.bankName}
                onChange={handleInputChange}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Ahmed Al-Hashimi"
                value={form.fullName}
                onChange={handleInputChange}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Disputed AED Amount</label>
                <input
                  type="number"
                  name="unauthorizedAmount"
                  placeholder="e.g. 150"
                  value={form.unauthorizedAmount}
                  onChange={handleInputChange}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Transaction Date</label>
                <input
                  type="date"
                  name="transactionDate"
                  value={form.transactionDate}
                  onChange={handleInputChange}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contact Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="habibi@dm.ae"
                value={form.email}
                onChange={handleInputChange}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Associated Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+971 5X XXX XXXX"
                value={form.phone}
                onChange={handleInputChange}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tell the exact story (What happened?)</label>
            <textarea
              name="details"
              rows={3}
              placeholder="Provide any context. e.g. 'I was charged on my salary card despite the salary transfer waive', 'I received no OTP validation text for the Amazon US transaction...'"
              value={form.details}
              onChange={handleInputChange}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="exemptionClaim"
              name="exemptionClaim"
              checked={form.exemptionClaim}
              onChange={handleCheckboxChange}
              className="rounded text-teal-600 accent-teal-600 cursor-pointer"
            />
            <label htmlFor="exemptionClaim" className="text-xs text-slate-600 cursor-pointer">
              Cite relevant legal <Demystifier term="cbuae">CBUAE guidelines</Demystifier> for protective pressure. (Highly Recommended)
            </label>
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={() => {
                if (!form.fullName || !form.bankName || !form.unauthorizedAmount) {
                  alert('Habibi, kindly fill out at least Name, Bank and Amount to generate a solid draft!');
                  return;
                }
                setStep(2);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Build Formal Letter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-700">PDF Draft Built Successfully!</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Go Back & Edit
              </button>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute right-3 top-3 pointer-events-none opacity-10 font-mono text-slate-500 font-bold select-none text-2xl rotate-12">
              CBUAE DIRECTIVE COMPLIANT
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 font-mono text-xs max-h-96 overflow-y-auto leading-relaxed shadow-inner font-sans scrollbar-thin scrollbar-thumb-slate-200">
              <pre className="whitespace-pre-wrap text-slate-700 font-mono select-all">
                {generateLetterText()}
              </pre>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Next Steps to secure your refund:</span>
              <ul className="list-decimal pl-4 space-y-1.5 mt-1 text-amber-950 font-sans">
                <li>Copy the letter using the button above.</li>
                <li>Submit it via your bank's official application Portal or email to their support handle. Make sure to claim a <b>complaint ticket ID</b>!</li>
                <li>If the bank fails to reverse this penalty or ignore you within <b>30 days</b>, head onto Sanadak.gov.ae, file a claim, and paste this exact letter!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
