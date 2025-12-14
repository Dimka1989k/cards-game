import { gameStore } from "@/app/store/gameStore";
import { useMusic } from "@/app/hooks/useMusic";
import { bntStatus } from "@/app/constants/game.constants";
import { SomeMusic } from "@/app/types/game.types";

const riskLabels = ["Low", "Medium", "High", "Classic"];

export const RiskSelectors = () => {
  const { playMusic } = useMusic();
    const { risk, riskLevel, gamePhase } = gameStore();

  const handleClickRisk = (index: number) => {
    playMusic(SomeMusic.bet);
    riskLevel(index);
  };

    const isDisabled = bntStatus(gamePhase);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-rubik-bold">Risk</h2>

      <div className="flex gap-1.5 w-full">
        {riskLabels.map((label, index) => {
          const isActive = index === risk;

          return (
            <button
              key={label}
              disabled={isDisabled}
              onClick={() => handleClickRisk(index)}
              className={`
                h-8 flex-1 rounded-md text-rubik
                flex items-center justify-center
                bg-btn-bg cursor-pointer
                transition-colors
                ${isActive
                  ? "bg-btn-hover text-btn-active shadow-[inset_0_0_7.4px_#ffd0260d] opacity-80"
                  : "hover:bg-btn-hover text-gray-text"}
                ${isDisabled ? "opacity-80" : ""}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
