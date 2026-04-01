import React from 'react';

interface SummaryData {
  summary: string[];
  used: number;
  total: number;
  goodPrompts: string[];
  badPrompts: string[];
  score: number; // 1 to 5
}

export const SessionSummary = ({ data }: { data: SummaryData }) => {
  const percentage = (data.used / data.total) * 100;

  const AestheticStar = ({ active }: { active: boolean }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`w-8 h-8 ${active ? 'fill-ink stroke-ink' : 'fill-transparent stroke-ink opacity-20'} stroke-2`}
    strokeLinejoin="miter" // Sharp corners for the star
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

  return (
    <div className="flex flex-col h-full border-2 border-ink bg-paper p-8 space-y-8">
      <h2 className="text-3xl font-bold italic tracking-tight text-center">
        You locked in! Let's see how you did...
      </h2>

      {/* 1. Learning Summary */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">
          Learning session summary
        </h3>
        <ol className="list-decimal list-inside space-y-1 text-lg italic text-ink-muted">
          {data.summary.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </section>

      {/* 2. Prompt Budget */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <h3 className="text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">
            Final Prompt Budget
          </h3>
          <span className="font-bold">{data.used}/{data.total}</span>
        </div>
        <div className="w-full h-8 border-2 border-ink bg-paper relative">
          <div 
            className="h-full bg-ink transition-all duration-500" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xl font-bold italic">
          You used {data.used} prompts this session, that’s {data.total - data.used} under your budget.
        </p>
      </section>

      {/* 3. Good vs Bad Prompts */}
      <div className="grid grid-cols-2 gap-8 border-t-2 border-ink pt-6">
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-green-700">Good prompts</h3>
          <ul className="list-disc list-inside space-y-1 text-sm italic">
            {data.goodPrompts.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
        <section className="space-y-3 border-l-2 border-ink pl-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-red-700">Bad prompts</h3>
          <ul className="list-disc list-inside space-y-1 text-sm italic">
            {data.badPrompts.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      </div>

      {/* 4. Learning Score Footer */}
      <div className="pt-4 border-t-2 border-ink flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tighter text-ink">Learning Score:</h2>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <AestheticStar key={i} active={i < data.score} />
          ))}
        </div>
      </div>
    </div>
  );
};