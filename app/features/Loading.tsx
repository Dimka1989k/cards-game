import React from 'react';
import Image from "next/image";

import logo from '@/public/evo-gaming-logo.svg'



export const Loading = () => {
  return (
    <div className="bg-background flex items-center justify-center h-dvh">
      <div className="items-center gap-1 flex flex-col ">
        <Image src={logo} alt="logo" width={280} height={110} />   
        <div className="w-70 h-1 bg-bet-color rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-600 animate-loading-progress"       
          />
        </div>
      </div>
    </div>
  );
};
