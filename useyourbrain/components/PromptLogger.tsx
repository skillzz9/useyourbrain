import React from 'react';

interface Prompt {
  text: string;
  source: 'ChatGPT' | 'Gemini';
  time: string;
}

export const PromptLog = ({ prompts }: { prompts: Prompt[] }) => {
  return (
    <div className="flex flex-col h-full border-2 border-ink bg-paper overflow-hidden">
      <div className="p-4 border-b-2 border-ink bg-ink text-paper">
        <h2 className="text-xl font-bold uppercase tracking-widest">Prompts recorded</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {prompts.map((p, i) => (
          <div key={i} className="p-4 border-b border-ink/20 last:border-b-0 space-y-2">
            <p className="text-lg italic leading-tight text-ink">"{p.text}"</p>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter opacity-60">
              <span className="underline decoration-1 underline-offset-4">{p.source}</span>
              <span>{p.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};