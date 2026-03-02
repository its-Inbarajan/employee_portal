import React from 'react';

export default function LandingPage() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,#B48CDE,#000)]">
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center">
                <h1 className="text-5xl font-bold text-white">Your SaaS Headline</h1>
                <p className="mt-4 text-slate-400">Build faster with our premium UI kit.</p>
            </div>
        </section>
    );
}


