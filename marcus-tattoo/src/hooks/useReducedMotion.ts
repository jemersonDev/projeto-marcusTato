"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** Snapshot do servidor: assume movimento permitido, igual à 1ª pintura no cliente. */
function getServerSnapshot() {
  return false;
}

/**
 * Retorna true quando o usuário pediu menos movimento
 * (prefers-reduced-motion: reduce). Usa useSyncExternalStore — a forma
 * recomendada pelo React para assinar APIs externas do navegador (como
 * matchMedia) sem precisar chamar setState dentro de um efeito.
 * Seguro para SSR: getServerSnapshot retorna false, igual à pintura inicial
 * no cliente, evitando divergência de hydration.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
