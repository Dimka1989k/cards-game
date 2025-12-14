"use client";

import Image from "next/image";

import { BtnMusic } from "../ui/BtnMusic";
import { MultiplierLabel } from "../../features/Card/MultiplierLabel";

import { Cards } from "../../features/Card/Cards";
import { GridCards } from "../../features/Card/GridCards";

import { imageSearch } from "@/app/helpers/imageSearch";

export const GameBoard = () => {
  const bgDragon = imageSearch("dragon-bg", "cards");

  return (
    <div className="relative w-full h-full lg:min-h-0">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full max-w-182.5 h-full relative">
          <Image
            src={bgDragon}
            alt="bg-dragon"
            width={700}    
            height={700}            
            className="object-cover w-full lg:rounded-r-2xl"               
          />
        </div>
        <BtnMusic />
      </div>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full px-6 py-6 flex flex-col max-w-182.5 ">
        <GridCards />
        <Cards />
        <MultiplierLabel />
      </div>
    </div>
  );
};
