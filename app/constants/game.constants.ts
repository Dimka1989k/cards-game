import { imageSearch } from "@/app/helpers/imageSearch";
import { GamePhase } from "../types/game.types";

export const DragonType = {
  earth: imageSearch("earth"),
  empty: imageSearch("empty"),
  fire: imageSearch("fire"),
  frost: imageSearch("frost"),
  shadow: imageSearch("shadow"),
  storm: imageSearch("storm"),
};

export const riskTypes = [
  [0, 1, 2, 1, 2.5, 1.5],
  [0, 3, 5, 0, 6, 1.5],
  [0, 0, 25, 0, 50, 0],
  [0, 3.5, 4, 0, 10, 7],
];


export const isActionButtonDisabled = (gamePhase: GamePhase) => {
  return !(gamePhase === GamePhase.idle || gamePhase === GamePhase.shown);
};

export const formatAmount = (num: number) => {
  return num.toFixed(2);
}




