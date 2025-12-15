"use client";

import { useEffect, useState } from "react";
import { gameStore } from "@/app/store/gameStore";
import { GamePhase, playCards, SomeMusic} from "@/app/types/game.types";

import { riskTypes } from "@/app/constants/game.constants";

import Image from "next/image";
import { useMultiplier } from "@/app/hooks/useMultiplier";

import { useMusic} from "@/app/hooks/useMusic";

import { motion } from "framer-motion";
import { imageSearch } from "@/app/helpers/imageSearch";


function preloadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();

    img.onload = () => resolve(src);
    img.onerror = () =>
      reject(new Error(`Failed to preload image: ${src}`));

    img.src = src;
  });
}


export const GridCards = () => {

  const { gamePhase, hiddenCards, setHiddenCards, risk, currentBet, increaseBalance } =
    gameStore();

  const { determineResults } = useMultiplier();
  const { playMusic } = useMusic();
   const [flipCard, setFlipCard] = useState<boolean[]>(Array(6).fill(false));

  const backside = imageSearch("backface");

  useEffect(() => {
  if (gamePhase !== GamePhase.processing) return;

  playMusic(SomeMusic.reveal);
  setFlipCard(Array(6).fill(false));

  const newCards = playCards();
  setHiddenCards(newCards);

  Promise.allSettled(newCards.map(preloadImage)).then((results) => {
    const failed = results.filter(r => r.status === "rejected");
    if (failed.length) {
      console.warn(
        "[GridCards] preload failed:",
        failed.map(f => f.reason)
      );
    }
  });
}, [gamePhase, playMusic, setHiddenCards]);



useEffect(() => {
  if (gamePhase !== GamePhase.open) return;

  const timeouts: number[] = [];

  for (let index = 0; index < 6; index++) {
    const flipTimeout = window.setTimeout(() => {
      playMusic(SomeMusic.flipcard);

      setFlipCard((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });

      if (index === 5) {
        window.setTimeout(() => {
          const resultGame = determineResults();

          if (resultGame.includes(2) && !resultGame.includes(0)) {
            playMusic(SomeMusic.reward);

            const winMoney = resultGame.reduce((acc, item, idx) => {
              if (item === 2) acc.push(riskTypes[risk][idx]);
              return acc;
            }, [] as number[]);

            const amount = winMoney.reduce(
              (acc, m) => acc + m * currentBet,
              0
            );

            increaseBalance(amount);
          } else {
            playMusic(SomeMusic.result);
          }
        }, 500);
      }
    }, index * 350);

    timeouts.push(flipTimeout);
  }
}, [gamePhase, playMusic, determineResults, risk, currentBet, increaseBalance]);


useEffect(() => {
  return () => {
    setFlipCard([]);
  };
}, []);

  useEffect(() => {
    if (gamePhase !== GamePhase.finish) return;
    playMusic(SomeMusic.flipcard);
    setFlipCard(Array(6).fill(false));
  }, [gamePhase]);

  return (
    <div className="flex gap-4">
      {hiddenCards.map((front, i) => {
        const isFlipped = flipCard[i];
        return (
          <motion.div
            key={i}
            className="relative w-full aspect-[1/2] perspective-[1000px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative w-full h-full [transform-style:preserve-3d]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
            >            
              <div className="absolute inset-0  rounded-[1.25rem] [backface-visibility:hidden] w-full h-50  min-[480px]:max-[590px]:h-30 min-[480px]:max-[591px]:h-30 max-[670px]:h-45 max-[480px]:h-25">   
                <Image
                  src={backside}
                  alt="backCards"
                  fill
                  className="object-cover rounded-[1.25rem]"
                />
              </div>
              <div className="absolute inset-0  rounded-[1.25rem] [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-50 min-[480px]:max-[590px]:h-30 max-[670px]:h-45 max-[480px]:h-25">
                <Image
                  src={front}
                  alt="frontCards"
                  fill
                  className="object-cover rounded-[1.25rem]"
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
