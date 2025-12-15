"use client";

import { gameStore } from "@/app/store/gameStore";
import { useMultiplier } from "@/app/hooks/useMultiplier";
import { useMusic } from "@/app/hooks/useMusic";
import { SomeMusic } from "@/app/types/game.types";
import { isActionButtonDisabled } from "@/app/constants/game.constants";
import { minBet } from "../../features/Bet/Bet";
import { motion } from "framer-motion";

export const GameBtn = () => {
  const { currentBet, decreaseBalance, gamePhase, balance } = gameStore();
  const { startGame } = useMultiplier();
  const { playMusic } = useMusic();

  const isDisabled =
    isActionButtonDisabled(gamePhase) || balance < minBet;

  const handleStartGame = () => {
    if (isDisabled) return;
    playMusic(SomeMusic.click);
    decreaseBalance(currentBet);
    startGame();
  };

  return (
    <motion.button
      onClick={handleStartGame}
      disabled={isDisabled}
      className="
      text-rubik-bold
        w-full h-10 rounded-lg font-bold
        bg-btn-bet cursor-pointer
        text-white
        disabled:opacity-40 disabled:cursor-not-allowed
      "      
      whileHover={
        !isDisabled
          ? {
              scale: 1.02,
              boxShadow: "0 0 12px rgba(80, 160, 255, 0.7)",
            }
          : undefined
      }      
      whileTap={
        !isDisabled
          ? {
              scale: 0.97,
            }
          : undefined
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      Place Bet
    </motion.button>
  );
};
