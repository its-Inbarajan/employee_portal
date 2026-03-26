// 'use client';

// import dynamic from 'next/dynamic';

// /**
//  * Three.js touches `window` / `document` — must be client-only.
//  * dynamic() with ssr:false guarantees it never runs on the server.
//  */
// const HelixCube = dynamic(() => import('@/components/HelixCube'), { ssr: false });

// export default function Landing() {
//   return (
//     <main className="relative w-full h-screen overflow-hidden select-none"
//       style={{
//         background:
//           'radial-gradient(ellipse at 38% 38%, #e8e4f8 0%, #ddd8f0 45%, #c8c0e4 100%)',
//       }}
//     >

//       {/* ── Three.js canvas — fills the entire screen ── */}
//       <HelixCube
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       {/* ── UI overlay — sits above the canvas ── */}
//       <div className="absolute inset-0 pointer-events-none flex flex-col"
//         style={{ zIndex: 10 }}>

//         {/* Nav */}
//         <nav className="flex items-center justify-between px-10 pt-8">
//           <span
//             className="text-xs tracking-widest uppercase"
//             style={{ color: '#6655aa', fontFamily: 'Courier New, monospace' }}
//           >
//             Helix UI
//           </span>
//           <div className="flex gap-8 pointer-events-auto">
//             {['Docs', 'Pricing', 'Blog', 'Sign in'].map((label) => (
//               <a
//                 key={label}
//                 href="#"
//                 className="text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
//                 style={{ color: '#6655aa', fontFamily: 'Courier New, monospace' }}
//               >
//                 {label}
//               </a>
//             ))}
//           </div>
//         </nav>

//         {/* Spacer pushes headline to the left-center area */}
//         <div className="flex flex-1 items-center">
//           <div className="pl-10 md:pl-20 max-w-lg">
//             <p
//               className="mb-3 text-xs tracking-widest uppercase"
//               style={{ color: '#9988cc', fontFamily: 'Courier New, monospace' }}
//             >
//               Next-gen interface
//             </p>
//             <h1
//               className="text-5xl md:text-7xl font-light leading-tight mb-6"
//               style={{ color: '#1a1050', letterSpacing: '-0.02em' }}
//             >
//               Shape<br />
//               <span style={{ color: '#4433cc' }}>the future</span>
//             </h1>
//             <p
//               className="text-sm leading-relaxed mb-10"
//               style={{ color: '#6655aa', maxWidth: 360 }}
//             >
//               A radically new kind of UI toolkit — drag, rotate, and explore
//               3D components that feel alive.
//             </p>

//             {/* CTA buttons — re-enable pointer events */}
//             <div className="flex gap-4 pointer-events-auto">
//               <button
//                 className="px-6 py-3 text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
//                 style={{
//                   background: '#2222dd',
//                   color: '#fff',
//                   fontFamily: 'Courier New, monospace',
//                   border: 'none',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Get started
//               </button>
//               <button
//                 className="px-6 py-3 text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
//                 style={{
//                   background: 'transparent',
//                   color: '#4433cc',
//                   fontFamily: 'Courier New, monospace',
//                   border: '1px solid #9988cc',
//                   cursor: 'pointer',
//                 }}
//               >
//                 View docs →
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom hint */}
//         <div
//           className="pb-7 text-center text-xs tracking-widest uppercase"
//           style={{
//             color: '#9088bb',
//             fontFamily: 'Courier New, monospace',
//             animation: 'fadeHint 4s ease 1.2s both',
//           }}
//         >
//           Drag to rotate · Scroll to zoom
//         </div>
//       </div>

//       {/* Keyframe for hint fade */}
//       <style>{`
//         @keyframes fadeHint {
//           0%   { opacity: 0; }
//           25%  { opacity: 1; }
//           75%  { opacity: 1; }
//           100% { opacity: 0; }
//         }
//       `}</style>
//     </main>
//   );
// }
