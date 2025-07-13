import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Choice {
  text: string;
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
}

export const GameScene = ({ 
  title, 
  description, 
  choices, 
  onChoice,
  backgroundImage 
}: GameSceneProps) => {
  return (
    <div 
      className="min-h-screen pt-20 pb-32 md:pb-8 px-4 flex items-start justify-center relative"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {backgroundImage && (
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
        
        <CardContent className="space-y-3">
          {choices.map((choice, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-auto p-4 text-left justify-start whitespace-normal"
              onClick={() => onChoice(choice)}
            >
              {choice.text}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};