import React from 'react';

export default function AcademicWaitlistEmail() {
  return (
    // The "Paper" Background
    <div className="bg-paper p-10 min-h-screen font-serif flex items-center justify-center text-ink">
      
      {/* The Central "Ledger" Card */}
      <div className="max-w-2xl w-full bg-paper border-2 border-ink shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12 space-y-10">
        
        {/* Header Section */}
        <div className="border-b-2 border-ink pb-6 flex justify-between items-baseline">
          <h1 className="text-3xl font-bold tracking-tighter">
            useyourbrain.
          </h1>
        </div>

        {/* Hero Message */}
        <section className="space-y-6">
          <h2 className="text-5xl font-bold italic leading-tight tracking-tight">
            Welcome to the real thinkers.
          </h2>
          <p className="text-xl leading-relaxed opacity-90">
            Your registration for the waitlist has been processed. You have chosen to join the top 10% of students who refuse to outsource their critical thinking to machines.
          </p>
        </section>

        {/* The "Logic Asset" Box */}
        <div className="bg-card border-2 border-ink p-6 italic space-y-2">
          <p className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">
            Status Update
          </p>
          <p className="text-lg">
            "The goal is not to use AI less. The goal is to use your brain more. We will notify you the moment the portal opens."
          </p>
        </div>

        {/* Closing Block */}
        <div className="pt-10 border-t-2 border-ink flex justify-between items-end">
          <div className="space-y-1">
            <p className="font-bold text-lg">Stay Focused.</p>
          </div>
          
          {/* A small decorative element like a stamp */}
          <div className="w-16 h-16 border-2 border-ink rounded-full flex items-center justify-center font-bold text-xs uppercase rotate-12">
            Verified
          </div>
        </div>

      </div>
    </div>
  );
}