
import type { HTMLAttributes, ReactNode } from "react";

/** Attach a Joyride target to an existing element. */
export function tourTargetProps(id: string) {
  return { "data-tour": id } as const;
}

/** Wrapper for elements that need their own target. */
export function TourTarget({
  id,
  children,
  ...props
}: {
  id: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-tour={id} {...props}>
      {children}
    </div>
  );
}

/** CSS selector consumed by React Joyride. */
export function tourSelector(id: string) {
  return `[data-tour="${id}"]`;
}
