import { gameStore } from "@/app/store/gameStore";
import { useMusic } from "@/app/hooks/useMusic";
import { formatAmount, bntStatus } from "@/app/constants/game.constants";

import { SomeMusic } from "@/app/types/game.types";
import { ChangeEvent, useEffect, useState } from "react";
import { BetInput } from "../../components/ui/BetInput";


export const minBet = 1;

export const Bet = () => {
  const { currentBet, betAmount, balance, gamePhase } = gameStore();
  const { playMusic } = useMusic();
  const maxBet = 1000;
  const [inputValue, setInputValue] = useState( currentBet.toFixed(2));
  const isDisabled = bntStatus(gamePhase);

  const betControlBtns = ["1/2", "x2", "Max"];

  useEffect(() => {
    setInputValue( currentBet.toFixed(2));
  }, [currentBet]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    setInputValue(value);
  };

  const handleBlur = () => {
    let num = parseFloat(inputValue);

    if (isNaN(num)) num = 0;
    if (num < minBet) num = minBet;
    if (num > maxBet) num = maxBet;
    if (num > balance) num = balance;

    num = +formatAmount(num);
    betAmount(num);
    setInputValue(num.toFixed(2));
  };

  const handleButtonClick = (action: string) => {
    let newBet = currentBet;
    playMusic(SomeMusic.bet);

    switch (action) {
      case "1/2":
         newBet= Math.max(minBet,  currentBet / 2);
        break;
      case "x2":
        newBet = Math.min(maxBet, balance,  currentBet * 2);
        break;
      case "Max":
        newBet = Math.min(maxBet, balance);
        break;
    }

    newBet = +formatAmount(newBet);
     betAmount(newBet);
    setInputValue(newBet.toFixed(2));
  };

  return (
    <div className="flex gap-2 flex-col">
      <p className="text-rubik-bold">Bet Amount</p>
      <div className="flex justify-between text-rubik-small text-gray-text">
        <p>Max Bet: {formatAmount(maxBet)}</p>
        <p className="text-text-color">$</p>
      </div>
      <BetInput
        value={inputValue}
        disabled={isDisabled}
        buttons={betControlBtns}
        onInputChange={handleChangeInput}
        onInputBlur={handleBlur}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};
