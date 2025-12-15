"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gameStore } from "@/app/store/gameStore";

export const Cards = () => {
  const [dragSourceIndex, setDragSourceIndex] = useState<number | null>(null);
  const [dragTargetIndex, setDragTargetIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { playerCards, userCardsSwipe } = gameStore();

  const handleCardClick = (index: number) => {
    if (selectedIndex === null) return setSelectedIndex(index);
    if (selectedIndex === index) return setSelectedIndex(null);
    userCardsSwipe(selectedIndex, index);
    setSelectedIndex(null);
  };

  const onDragBegin = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDragSourceIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (dragSourceIndex !== null && dragSourceIndex !== index) {
      setDragTargetIndex(index);
    }
  };

  const onDragRelease = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault();

    if (dragSourceIndex !== null && dragSourceIndex !== dropIndex) {
      userCardsSwipe(dragSourceIndex, dropIndex);
    }

    setDragSourceIndex(null);
    setDragTargetIndex(null);
  };

  return (
    <motion.div layout className="flex gap-4">
      {playerCards.map((card, index) => {
        const cardKey = `${card}-${index}`;
        const isDragging = dragSourceIndex === index;
        const isDragOver = dragTargetIndex === index;
        const isSelected = selectedIndex === index;
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={cardKey}
            layoutId={card}
            layout
            draggable
            className="relative w-full aspect-[1/2] cursor-pointer rounded-[1.25rem]"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(index)}
            onDragStartCapture={(e: React.DragEvent<HTMLDivElement>) =>
              onDragBegin(e, index)
            }
            onDragOverCapture={(e: React.DragEvent<HTMLDivElement>) =>
              handleDragOver(e, index)
            }
            onDropCapture={(e: React.DragEvent<HTMLDivElement>) =>
              onDragRelease(e, index)
            }
            onDragEnd={() => {
              setDragSourceIndex(null);
              setDragTargetIndex(null);
            }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setTilt({
                x: -((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 15,
                y: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 15,
              });
            }}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{
              scale: isDragging ? 0.92 : isDragOver ? 1.06 : isSelected ? 1 : 1,
              rotateX: tilt.x,
              rotateY: tilt.y,
            }}
            transition={{
              layout: { type: "spring", stiffness: 100, damping: 22 },
              duration: 0.25,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0  pointer-events-none w-full h-49.5 min-[480px]:max-[590px]:max-h-30 max-[480px]:max-h-25"
              animate={{
                opacity: isDragging
                  ? 0
                  : isSelected || isDragOver || isHovered
                  ? 1
                  : 0,
              }}
              transition={{ duration: 0.25 }}
              style={{
               
                borderRadius: "20px",
                boxShadow: isDragging
                  ? "none"
                  : isSelected
                  ? "0 0 4px 5.5px rgb(230, 96, 24)"
                  : isDragOver
                  ? "0 0 4px 5.5px rgb(230, 96, 24)"
                  : "0 0 4px 5.5px rgb(38, 64, 121)",
              }}
            />
            <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden z-10 w-full h-50 min-[480px]:max-[590px]:max-h-30 max-[480px]:max-h-25">
              <Image
                src={card}
                alt={`card ${index}`}
                fill
                className="object-cover rounded-[1.25rem] pointer-events-none"
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
