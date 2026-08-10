"use client";

import { useEffect, useState } from "react";

/**
 * Retorna true quando o usuário pediu menos movimento
 * (prefers-reduced-motion: reduce). Seguro para SSR: começa em `false`
 * e atualiza no cliente, evitando divergência de hydration.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
