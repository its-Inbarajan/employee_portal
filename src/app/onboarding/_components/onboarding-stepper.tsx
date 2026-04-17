"use client";
import { CheckIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const STEPS = [
  { step: 1, label: "Basic Info", path: "/onboarding/step-1" },
  { step: 2, label: "Career", path: "/onboarding/step-2" },
  { step: 3, label: "Skills", path: "/onboarding/step-3" },
  { step: 4, label: "Preferences", path: "/onboarding/step-4" },
];

export default function OnboardingStepper({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const pathname = usePathname();

  const currentStep = STEPS.find((s) => pathname.includes(s.path))?.step ?? 1;

  const progressPct = (currentStep / STEPS.length) * 100;
  return (
    <div>
      <div className="w-full bg-gray-200">
        <div
          className="h-0.5 bg-sidebar-primary transition-all duration-500 ease-linear"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="max-w-full mx-auto pt-4 px-4">
        {/* Step indicators */}
        <div className="flex items-center max-w-3xl mx-auto justify-between mb-4 w-full">
          {STEPS.map((s, idx) => {
            const isDone = s.step < currentStep;
            const isCurrent = s.step === currentStep;
            const isLast = idx === STEPS.length - 1;

            return (
              <div key={s.step} className="flex items-center flex-1">
                {/* Circle */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center
                      text-sm font-bold transition-all duration-300 ${
                        isDone
                          ? "bg-primary dark:bg-background dark:ring-white ring-black ring text-white"
                          : isCurrent
                            ? "bg-primary/10 text-primary border-2 border-primary"
                            : "bg-gray-100 text-gray-400 border ring-gray-200 dark:bg-background dark:ring-black ring"
                      }`}
                  >
                    {isDone ? <CheckIcon className="size-3" /> : s.step}
                  </div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap ${
                      isCurrent
                        ? "text-primary"
                        : isDone
                          ? "text-gray-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector line between steps */}
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-4 transition-all duration-500 ${
                      isDone
                        ? "bg-primary dark:bg-primary-foreground"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        {children}
      </div>
    </div>
  );
}
