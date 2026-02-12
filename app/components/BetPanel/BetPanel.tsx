"use client";

import { FC } from "react";
import { RiskSelectors } from "../../features/Bet/RiskSelectors";
import { GameBtn } from "../ui/GameBtn";
import { Bet } from "../../features/Bet/Bet";


import { formatAmount } from "@/app/constants/game.constants";
import { gameStore } from "@/app/store/gameStore";

export const BetPanel: FC = () => {
  const { balance } = gameStore();

  return (
    <div className="w-full h-full bg-bet-color rounded-l-2xl flex flex-col justify-between px-4 py-6 border-bet max-lg:rounded-2xl">
      <div className="flex flex-col gap-4.5">
        <Bet />
        <RiskSelectors />
        <GameBtn />
      </div>
      <div className="text-rubik bg-btn-bg flex py-2.5 justify-center items-center gap-2 rounded-lg max-lg:hidden">
        <span className="text-gray-text">Balance:</span>
        <span className="font-rubik-num">{formatAmount(balance)}</span>
      </div>
    </div>
  );
};
