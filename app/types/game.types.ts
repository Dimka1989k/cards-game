import { DragonType } from "../constants/game.constants";

export enum CardResult {
  lose = 0,
  miss = 1,
  won = 2,
}

export enum SomeMusic {
  reward = "reward",
  click = "click",
  result = "result",
  flipcard = "flipcard",
  bet = "bet",
  reveal = "reveal",
}

export enum Risk {
  low,
  medium,
  high,
  classic,
}

export enum GamePhase {
  idle = "idle",
  processing = "processing",
  open = "open",
  shown = "shown",
  finish = "finish",
}

export const playCards = () => {
  const cards = [
    DragonType.fire,
    DragonType.frost,
    DragonType.shadow,
    DragonType.storm,
    DragonType.earth,
    DragonType.empty,
  ];

  return cards
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export type GameData = {
  balance: number;
  increaseBalance: (amount: number) => void;
  decreaseBalance: (amount: number) => void;

  risk: Risk;
  riskLevel: (risk: Risk) => void;

  cardResults: number[];
  setCardResults: (status: number[]) => void;

  hiddenCards: string[];
  setHiddenCards: (hiddenCardsOrder: string[]) => void;

  currentBet: number;
  betAmount: (currentBet: number) => void;

  playerCards: string[];
  userCardsSwipe: (fromId: number, toId: number) => void;

  soundEnabled: boolean;
  toggleSound: () => void;

  gamePhase: GamePhase;
  setGamePhase: (gameStatus: GamePhase) => void;
};
