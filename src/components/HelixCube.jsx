'use client';

import React from 'react';
import { useHelixCube } from '@/hooks/useHelixCube';
import { cn } from '@/lib/utils';

/**
 * HelixCube
 * Drop-in Three.js canvas component.
 *
 * Props:
 *   className  – extra Tailwind / CSS classes for the wrapper div
 *   style      – inline style override for the wrapper div
 */
export default function HelixCube({ className = '', style = {} }) {
  const containerRef = React.useRef(null);
  useHelixCube(containerRef);          // mounts renderer into containerRef

  return (
    <div
      ref={containerRef}
      className={cn(className, 'w-full h-full')}
      style={{
        cursor: 'grab',
        touchAction: 'none',   // prevents scroll fighting on mobile
        ...style,
      }}
    />
  );
}
