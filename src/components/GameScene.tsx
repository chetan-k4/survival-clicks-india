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
}

export const GameScene = ({ 
  title, 
  description, 
  choices, 
  onChoice,
  backgroundImage,
  centerImage,
  centerImageSize
}: GameSceneProps) => {
  return (
    <div 
      className={`min-h-screen w-full h-full pt-20 pb-32 md:pb-8 px-4 flex items-start justify-center relative bg-white`}
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
      <Card className="w-full max-w-2xl relative z-10 bg-card/95 backdrop-blur-sm mt-8 md:mt-16">
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
              className="option w-full h-auto p-6 text-left justify-start whitespace-normal font-bold text-[18px] rounded-[16px] border-[2px] border-[#25395B] bg-[#F7F7F7] hover:bg-[#33CC99] hover:text-white hover:border-[#33CC99] transition-colors duration-150"
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
              onClick={() => onChoice(choice)}
            >
              {typeof choice.text === 'string' ? choice.text : (Array.isArray(choice.text) ? choice.text.join('') : choice.text)}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};