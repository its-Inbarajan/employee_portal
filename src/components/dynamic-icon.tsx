"use client";
import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React from "react";

export type IconName = keyof typeof dynamicIconImports;

interface DynamicIconProps extends LucideProps {
  name: IconName;
}
const iconCache = new Map<IconName, React.ComponentType<LucideProps>>();

export const DynamicIcon = React.memo(
  ({ name, ...props }: DynamicIconProps) => {
    const [IconComponent, setIconComponent] =
      React.useState<React.ComponentType<LucideProps> | null>(
        () => iconCache.get(name) ?? null,
      );

    React.useEffect(() => {
      if (iconCache.has(name)) {
        setIconComponent(() => iconCache.get(name)!);
        return;
      }

      const importFn = dynamicIconImports[name];
      if (typeof importFn !== "function") return;

      let cancelled = false;
      importFn().then((mod) => {
        if (!cancelled) {
          iconCache.set(name, mod.default);
          setIconComponent(() => mod.default);
        }
      });

      return () => {
        cancelled = true;
      };
    }, [name]);

    if (!IconComponent) {
      return (
        <span
          style={{ display: "inline-block", width: "1em", height: "1em" }}
          aria-hidden
        />
      );
    }

    return <IconComponent {...props} />;
  },
);

DynamicIcon.displayName = "DynamicIcon";
