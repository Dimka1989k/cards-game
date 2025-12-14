"use client";

import { gameStore } from "@/app/store/gameStore";
import { imageSearch } from "@/app/helpers/imageSearch";
import Image from "next/image";
import { motion } from "framer-motion";

export const BtnMusic = () => {
  const { soundEnabled, toggleSound } = gameStore();

  const soundImg = {
     off: imageSearch("sound-off", "img", "svg"),
    on: imageSearch("sound-on", "img", "svg"),
   
  };

  return (
    <motion.button
      onClick={toggleSound}
      className="
        w-10 h-10 absolute top-4 left-4
        flex justify-center items-center
        bg-bet-color
        rounded-lg cursor-pointer
      "
   
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 12px rgba(80, 160, 255, 0.7)",
      }}
    
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
    >
      <motion.div
        key={ soundEnabled ? "sound-on" : "sound-off"}
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 16,
        }}
      >
        <Image
          src={soundEnabled? soundImg.on : soundImg.off}
          alt="iconMusic"
          width={25}
          height={25}
        />
      </motion.div>
    </motion.button>
  );
};
