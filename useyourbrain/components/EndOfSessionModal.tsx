import { PromptLog } from "./PromptLogger";
import { SessionSummary } from "./SummaryData";
const fakePrompts = [
  { 
    text: "Explain the ratio decidendi of Donoghue v Stevenson", 
    source: 'ChatGPT', 
    time: '13:03' 
  },
  { 
    text: "Differentiate between duty of care and standard of care", 
    source: 'Gemini', 
    time: '13:12' 
  },
  /* NEW GOOD PROMPT: Australian Precedent Comparison */
  { 
    text: "Compare the application of the 'neighbor principle' in Grant v Australian Knitting Mills versus the original UK ruling.", 
    source: 'Gemini', 
    time: '13:25' 
  },
  /* NEW GOOD PROMPT: Theoretical Critique */
  { 
    text: "Critique the three-stage test from Caparo Industries plc v Dickman regarding pure economic loss in Australia.", 
    source: 'ChatGPT', 
    time: '13:40' 
  },
  /* NEW BAD PROMPT: Direct Answer Request */
  { 
    text: "whats the answer to question 2", 
    source: 'ChatGPT', 
    time: '14:02' 
  }
];

const fakeSummary = {
  summary: [
    "Analyzed the evolution of negligence in Australian Common Law.",
    "Critiqued the Caparo three-stage test for duty of care.", // Updated for new prompt
    "Verified the elements of a breach under the Civil Liability Act."
  ],
  used: 5, // Updated count
  total: 15,
  goodPrompts: [
    "Differentiate duty vs standard", 
    "Ratio analysis", 
    "Australian precedent comparison", // New
    "Caparo test critique" // New
  ],
  badPrompts: [
    "Write my essay intro", 
    "whats the answer to question 2" // New
  ],
  score: 4
};

export default function SessionResults() {
  return (
    // Reduced from 80vh to 65vh to make it more compact
    <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-6 h-[60vh] max-w-6xl mx-auto p-4 mb-50">
      <PromptLog prompts={fakePrompts} />
      <SessionSummary data={fakeSummary} />
    </div>
  );
}