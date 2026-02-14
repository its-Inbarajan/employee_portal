import React, { Suspense } from "react";
import ClientApplied from "./applied";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-black">
          <div className="animate-spin bg-transparent rounded-full w-20 h-20 border-2 border-white" />
        </div>
      }
    >
      <ClientApplied />
    </Suspense>
  );
}
