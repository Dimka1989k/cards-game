import React from 'react';
import Image from "next/image";

import logo from '@/public/evo-gaming-logo.svg'

interface LoadingProps {
  progress: number;
}

export const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div className="bg-background flex items-center justify-center h-dvh">
      <div className="items-center gap-1 flex flex-col ">
        <Image src={logo} alt="logo" width={280} height={110} />   
        <div className="w-70 h-1 bg-bet-color rounded-full overflow-hidden">
          <div
           style={{ width: `${progress}%` }}
            className="h-full bg-violet-600 transition-all ease-in duration-500"           
          />
        </div>
      </div>
    </div>
  );
};
