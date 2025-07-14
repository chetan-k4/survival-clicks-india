import { Coins, Heart, BookOpen } from "lucide-react";

interface GameHUDProps {
  cash: number;
  health: number;
  education: number;
}

export const GameHUD = ({ cash, health, education }: GameHUDProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-card border-b border-border p-4 md:py-8 z-50">
      <div className="flex justify-center items-center w-full">
        <div className="flex gap-8 md:gap-16 text-base md:text-2xl">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 md:h-8 md:w-8 text-cash" />
            <span className="font-semibold">₹{cash.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 md:h-8 md:w-8 text-health" />
            <span className="font-semibold">{health}/100</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-education" />
            <span className="font-semibold">Grade {education}</span>
          </div>
        </div>
      </div>
    </div>
  );
};