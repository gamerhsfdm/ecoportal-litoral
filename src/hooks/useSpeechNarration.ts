"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSpeechSupportSnapshot() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function getServerSnapshot() {
  return false;
}

export function useSpeechNarration() {
  const [isPlaying, setIsPlaying] = useState(false);
  const isSupported = useSyncExternalStore(
    subscribe,
    getSpeechSupportSnapshot,
    getServerSnapshot,
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || typeof window === "undefined") return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported],
  );

  const toggle = useCallback(
    (text: string) => {
      if (isPlaying) {
        stop();
      } else {
        speak(text);
      }
    },
    [isPlaying, speak, stop],
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { isPlaying, isSupported, speak, stop, toggle };
}
