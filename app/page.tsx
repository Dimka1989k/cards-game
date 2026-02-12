"use client";

import { useEffect, useState } from "react";
import { BetPanel } from "./components/BetPanel/BetPanel";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { Loading } from "./features/Loading";

import { formatAmount } from "./constants/game.constants";
import { gameStore } from "@/app/store/gameStore";

export default function HomePage() {
  const balance = gameStore((state) => state.balance);
  const [isDesktop, setIsDesktop] = useState(false);
  const [forceLoading, setForceLoading] = useState(true);
 
useEffect(() => {
  const timeout = setTimeout(() => {
    setForceLoading(false);
  }, 1000);

  return () => clearTimeout(timeout);
}, []);

  useEffect(() => {
    const updateSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

if (forceLoading) {
  return <Loading />;
}

  return (
    <div className="flex justify-center items-center max-sm:items-start min-h-screen w-full">
      <div className="w-full max-w-262.5 py-5 max-lg:px-5">
        {isDesktop ? (
          <div className="flex w-full">
            <div className="w-87.5 shrink-0">
              <BetPanel />
            </div>
            <div className="flex-1">
              <GameBoard />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-182.5 flex flex-col gap-4 mx-auto">
            <div className="text-rubik bg-btn-bg flex py-2.5 justify-center items-center gap-2 rounded-lg">
              <span className="text-gray-text">Balance:</span>
              <span className="font-rubik-num">{formatAmount(balance)}</span>
            </div>
            <GameBoard />
            <BetPanel />
          </div>
        )}
      </div>
    </div>
  );
}
