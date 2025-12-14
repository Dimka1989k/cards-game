import { Risk } from "../types/game.types";
import { riskTypes } from "../constants/game.constants";


export const useRisk = () => {
  const myRisk = (gameRisk: Risk) => {
    return riskTypes[gameRisk];
  };

  return { myRisk };
};