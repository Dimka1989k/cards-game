import { useEffect, useState } from "react";
import { gameStore } from "@/app/store/gameStore";
import { GamePhase } from "@/app/types/game.types";
import { useRisk } from "@/app/hooks/useRisk";


export const MultiplierLabel = () => {
  const { myRisk } = useRisk();
  const [slotMultiplier, setslotMultiplier] = useState<number[]>([]);
  const [showResultColors, setShowResultColors] = useState(false);

  const { gamePhase, cardResults, risk } = gameStore();


    useEffect(() => {
    if (gamePhase === GamePhase.shown) {
      setShowResultColors(true);
    }
  }, [gamePhase]);

  
  useEffect(() => {
    setslotMultiplier(myRisk(risk));
    setShowResultColors(false);
  }, [risk]);



  return (
    <div className="flex justify-between text-2xl font-bold gap-7 px-3.5 mt-7">
      {slotMultiplier.map((slotMultiplier, index) => {
        const isWin = showResultColors && cardResults[index] === 2;
        const isLose = showResultColors && cardResults[index] === 0;

        return (
          <div
            key={index}
            className={`
              flex items-between justify-center bg-black rounded-lg min-w-15  transition-colors duration-400
              ${isWin ? "text-green" : ""}
              ${isLose ? "text-red" : ""}
            `}
          >
            <div className="flex justify-center items-center px-3 text-medieval size-15">
              <span>{slotMultiplier === 0 ? "LOST" : `${slotMultiplier}x`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
