import { useEffect, useState } from "react";
import { gameStore } from "@/app/store/gameStore";
import { GamePhase } from "@/app/types/game.types";
import { useRisk } from "@/app/hooks/useRisk";


export const MultiplierLabel = () => {
  const { myRisk } = useRisk();
  const [slotMultiplier, setSlotMultiplier] = useState<number[]>([]);
  const [showResultColors, setShowResultColors] = useState(false);

  const { gamePhase, cardResults, risk } = gameStore();


    useEffect(() => {
    if (gamePhase === GamePhase.shown) {
      setShowResultColors(true);
    }
  }, [gamePhase]);

  
  useEffect(() => {
    setSlotMultiplier(myRisk(risk));
    setShowResultColors(false);
  }, [risk]);



  return (
    <div className="flex justify-between text-2xl font-bold gap-7 max-sm:gap-3 max-[465px]:px-0 max-[640px]:px-4   px-3.5 mt-7 max-[401px]:mt-10 max-[465px]:mt-8 max-[590px]:mt-6  max-[622px]:mt-16  max-[690px]:mt-14">
      {slotMultiplier.map((slotMultiplier, index) => {
        const isWin = showResultColors && cardResults[index] === 2;
        const isLose = showResultColors && cardResults[index] === 0;

        return (
          <div
            key={index}
            className={`
              flex items-between justify-center bg-black rounded-lg max-w-15  transition-colors duration-400
              ${isWin ? "text-green" : ""}
              ${isLose ? "text-red" : ""}
            `}
          >
            <div className="flex justify-center items-center px-3 text-medieval size-15  max-sm:size-7 max-md:size-10">
              <span>{slotMultiplier === 0 ? "LOST" : `${slotMultiplier}x`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
