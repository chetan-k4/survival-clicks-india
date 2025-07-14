import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Choice {
  text: string | React.ReactNode;
  effects: {
    cash?: number;
    health?: number;
    education?: number;
    setFlag?: string;
  };
}

interface GameSceneProps {
  title: string;
  description: string;
  choices: Choice[];
  onChoice: (choice: Choice) => void;
  backgroundImage?: string;
  centerImage?: string;
  centerImageSize?: 'sm' | 'md' | 'lg';
  cash: number;
  health: number;
  education: number;
}

export const GameScene = ({ 
  title, 
  description, 
  choices, 
  onChoice,
  backgroundImage,
  centerImage,
  centerImageSize,
  cash,
  health,
  education
}: GameSceneProps) => {
  return (
    <div 
      className={`min-h-screen w-full h-full pt-2 pb-8 md:pb-8 px-2 md:px-4 flex items-start justify-center relative bg-white`}
      style={
        centerImage
          ? undefined
          : {
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
      }
    >
      {backgroundImage && !centerImage && (
        <div className="absolute inset-0 bg-black/30" />
      )}
      <div className="w-full flex justify-center scale-[.92]">
        <Card className="w-full max-w-2xl relative z-10 bg-card/95 backdrop-blur-sm mt-4 md:mt-8">
          <div className="w-full flex flex-col gap-2 md:gap-4 items-center justify-center px-2 pt-4">
            <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
              <div className="text-center p-2 md:p-3 rounded-lg bg-[#F7F7F7]">
                <svg className="h-6 w-6 md:h-8 md:w-8 text-cash mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4m8-4h-4m-8 0H4" /></svg>
                <div className="font-semibold text-base md:text-lg">₹{cash.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Cash</div>
              </div>
              <div className="text-center p-2 md:p-3 rounded-lg bg-[#F7F7F7]">
                <svg className="h-6 w-6 md:h-8 md:w-8 text-health mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.46243 6.46243 3 9.5 3C11.1569 3 12.5 4.34315 12.5 6C12.5 4.34315 13.8431 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 13.5 12 21 12 21Z" /></svg>
                <div className="font-semibold text-base md:text-lg">{health}/100</div>
                <div className="text-xs text-muted-foreground">Health</div>
              </div>
              <div className="text-center p-2 md:p-3 rounded-lg bg-[#F7F7F7]">
                <svg className="h-6 w-6 md:h-8 md:w-8 text-education mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3L2 9l10 6 10-6-10-6zm0 13v5m-4-4h8" /></svg>
                <div className="font-semibold text-base md:text-lg">Grade {education}</div>
                <div className="text-xs text-muted-foreground">Education</div>
              </div>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              {title}
            </CardTitle>
            <CardDescription className="text-base text-center leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>
          {centerImage && (
            <div className="flex justify-center items-center py-2 w-full">
              <img 
                src={centerImage} 
                alt="scene" 
                className={`w-auto max-w-full rounded-2xl shadow-lg 
                  ${centerImageSize === 'sm' ? 'max-h-56 md:max-h-[400px]' : 'max-h-64 md:max-h-[500px]'}
                `}
                style={{height: 'auto'}}
              />
            </div>
          )}
          <CardContent className="space-y-3">
            {choices.map((choice, index) => (
              <Button
                key={index}
                variant="outline"
                className="option w-full h-auto py-2.5 px-3 text-left justify-start whitespace-normal font-normal text-[1.1rem] rounded-[12px] border-[2px] border-[#25395B] bg-[#F7F7F7] hover:bg-[#33CC99] hover:text-white hover:border-[#33CC99] transition-colors duration-150"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
                onClick={() => onChoice(choice)}
              >
                {typeof choice.text === 'string' ? choice.text : (Array.isArray(choice.text) ? choice.text.join('') : choice.text)}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};