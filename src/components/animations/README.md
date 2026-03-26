# Helix Cube — Next.js Integration

Drop the 6-arm glossy-blue 3D cross into your Next.js landing page in 3 steps.

---

## File structure

```
your-next-app/
├── app/
│   └── page.jsx                  ← landing page  (copy this)
├── components/
│   └── HelixCube.jsx             ← React wrapper (copy this)
└── hooks/
    └── useHelixCube.js           ← all Three.js logic (copy this)
```

---

## 1 — Install three

```bash
npm install three
# or
yarn add three
# or
pnpm add three
```

---

## 2 — Copy the three files

| File | Destination in your project |
|------|-----------------------------|
| `hooks/useHelixCube.js`   | `hooks/useHelixCube.js`   |
| `components/HelixCube.jsx`| `components/HelixCube.jsx`|
| `app/page.jsx`            | `app/page.jsx` (or import `HelixCube` into your own page) |

> If you use a `src/` directory, adjust the `@/` import alias accordingly
> (it resolves to wherever `jsconfig.json` / `tsconfig.json` points `@`).

---

## 3 — Use it

### Full landing page
Just use the provided `app/page.jsx` as-is.

### Embed in your own page
```jsx
'use client';
import dynamic from 'next/dynamic';

const HelixCube = dynamic(() => import('@/components/HelixCube'), { ssr: false });

export default function MyPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Canvas fills the container */}
      <HelixCube style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Your content on top */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1>Your headline</h1>
      </div>
    </div>
  );
}
```

---

## Why `dynamic(() => ..., { ssr: false })`?

Three.js accesses `window`, `document`, and `WebGLRenderingContext` — none of
which exist on the Node.js server that Next.js uses for SSR/SSG.
`ssr: false` tells Next.js to skip server-rendering this component entirely and
only mount it in the browser.

---

## Interaction

| Action | Effect |
|--------|--------|
| **Drag** | Rotate the shape (momentum on release) |
| **Scroll wheel** | Zoom in / out |
| **Touch drag** | Works on mobile |
| **Idle** | Auto-spins slowly until first interaction |

---

## Customisation

All tuning knobs are at the top of `hooks/useHelixCube.js`:

```js
const ARM_R    = 0.70;   // arm radius
const ARM_HALF = 1.52;   // half-length of each arm
const SEGS     = 48;     // geometry smoothness
const SENS     = 0.008;  // drag sensitivity
const DAMPING  = 0.88;   // momentum decay (0 = instant stop, 1 = no decay)
```

To change the blue colour, edit `blueMat`:
```js
const blueMat = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0x1212dd),  // ← change this
  ...
});
```
