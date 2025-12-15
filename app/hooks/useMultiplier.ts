"use client";

import { useEffect, useRef } from "react";
import { gameStore } from "@/app/store/gameStore";
import { GamePhase, CardResult } from "../types/game.types";
import { riskTypes } from "../constants/game.constants";
import { useCallback } from "react";

export const useMultiplier = () => {
  const timersRef = useRef<number[]>([]);
  const setGamePhase = gameStore((state) => state.setGamePhase); 
  const  setCardResults = gameStore((state) => state. setCardResults);
  const risk = gameStore((state) => state.risk);
  const hiddenCards = gameStore((state) => state.hiddenCards);
  const playerCards = gameStore((state) => state.playerCards); 

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const finishGame = () => {
    const timer = window.setTimeout(() => {
      setGamePhase(GamePhase.shown);
    }, 1600);

    timersRef.current.push(timer);
  };

  const startGame = () => {
    setGamePhase(GamePhase.processing);

    const timer = window.setTimeout(() => {
      setGamePhase(GamePhase.open);
      finishGame();
    }, 1200);

    timersRef.current.push(timer);
  };

const determineResults = useCallback(() => {
  const results = playerCards.map((myCard, i) => {
    if (myCard === hiddenCards[i]) {
      return riskTypes[risk][i] === 0
        ? CardResult.lose
        : CardResult.won;
    }
    return CardResult.miss;
  });

  setCardResults(results);
  return results;
}, [playerCards, hiddenCards, risk, setCardResults]);

  return { startGame, determineResults };
};
