import { create } from "zustand";

import { DragonType } from "../constants/game.constants";

import { playCards, GameData, Risk, GamePhase } from "../types/game.types";

export const gameStore = create<GameData>()((set) => ({
  balance: 1000,

  increaseBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),

  decreaseBalance: (amount) =>
    set((state) => ({ balance: state.balance - amount })),

  currentBet: 1,
  betAmount: (currentBet) => set({ currentBet }),

  risk: Risk.low,
  riskLevel: (risk: Risk) => set({ risk }),

  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  gamePhase: GamePhase.idle,
  setGamePhase: (gamePhase: GamePhase) => set({ gamePhase }),

  cardResults: [1, 1, 1, 1, 1, 1],
  setCardResults: (status: number[]) => set({ cardResults: status }),

  hiddenCards: playCards(),
  setHiddenCards: (cards: string[]) => set({ hiddenCards: cards }),

  playerCards: [
    DragonType.fire,
    DragonType.frost,
    DragonType.shadow,
    DragonType.storm,
    DragonType.earth,
    DragonType.empty,
  ],

  userCardsSwipe: (fromId, toId) =>
    set((state) => {
      const newOrder = [...state.playerCards];
      [newOrder[fromId], newOrder[toId]] = [newOrder[toId], newOrder[fromId]];
      return { playerCards: newOrder };
    }),
}));
