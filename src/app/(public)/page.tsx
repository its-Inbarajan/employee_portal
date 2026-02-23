import React from 'react';

export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
            {/* Grid Background Layer */}
            <div className="absolute inset-0 h-full w-full bg-white 
            bg-[repeating-linear-gradient(to_right,#80808012_1px,transparent_1px),repeating-linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[80px_80px]  [mask-image:linear-gradient(to_bottom_right,transparent_10%,black_90%)]"
            ></div>

            {/* <div className="absolute inset-0 z-0 hidden dark:block 
           bg-gradient-to-br from-transparent via-transparent to-[#8C45FF] to-95%"
            
            >
            </div> */}

            {/* Content Layer */}
            <div className="relative z-10 p-24">
                <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Your Landing Page
                </h1>
            </div>
        </div>
    );
}


