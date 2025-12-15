"use client";

import { Howl } from "howler";
import { gameStore } from "@/app/store/gameStore";
import { useEffect, useRef } from "react";
import { SomeMusic} from "../types/game.types";
import { useCallback } from "react";

type SoundMap = {
  [key: string]: Howl;
};

export const useMusic = () => {
  const soundEnabled = gameStore((s) => s.soundEnabled);
  const musicRef = useRef<SoundMap>({});
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    musicRef.current = {
      [SomeMusic.reward]: new Howl({
        src: ["/audio/reward.mp3"],
        volume: 0.4,
        preload: true,
      }),

      [SomeMusic.bet]: new Howl({
        src: ["/audio/bet.mp3"],
        volume: 0.4,
        preload: true,
      }),
      [SomeMusic.reveal]: new Howl({
        src: ["/audio/reveal.mp3"],
        volume: 0.4,
        preload: true,
      }),

      [SomeMusic.flipcard]: new Howl({
        src: ["/audio/card-flip.mp3"],
        volume: 0.4,
        preload: true,
      }),
      [SomeMusic.result]: new Howl({
        src: ["/audio/result.mp3"],
        volume: 0.4,
        preload: true,
      }),

      [SomeMusic.click]: new Howl({
        src: ["/audio/click.wav"],
        volume: 0.4,
        preload: true,
      }),
    };

    return () => {
      Object.values(musicRef.current).forEach((music) => music.unload());
      musicRef.current = {};
      isInitialized.current = false;
    };
  }, []);

 const playMusic = useCallback(
  (nameMusic: SomeMusic) => {
    if (!soundEnabled) return;

    const music = musicRef.current[nameMusic];
    if (music) {
      music.play();
    }
  },
  [soundEnabled]
);

  return { playMusic };
};
