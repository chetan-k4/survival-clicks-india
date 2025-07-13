import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Heart, BookOpen, Trophy } from "lucide-react";

interface GameSummaryProps {
  cash: number;
  health: number;
  education: number;
  onReplay: () => void;
}

export const GameSummary = ({ cash, health, education, onReplay }: GameSummaryProps) => {
  const povertyLine = 3889;
  const survived = cash >= 0 && health > 0 && education > 0;
  const abovePovertyLine = cash >= povertyLine;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex items-center justify-center bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Month End Summary</CardTitle>
          <CardDescription>How did your family fare?</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status Badge */}
          {survived && (
            <div className="text-center">
              {abovePovertyLine ? (
                <Badge variant="secondary" className="text-lg p-3">
                  <Trophy className="h-5 w-5 mr-2" />
                  Above Poverty Line!
                </Badge>
              ) : (
                <Badge variant="outline" className="text-lg p-3">
                  <Trophy className="h-5 w-5 mr-2" />
                  You Survived the Month
                </Badge>
              )}
            </div>
          )}

          {/* Final Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Coins className="h-8 w-8 text-cash mx-auto mb-2" />
              <div className="font-semibold">₹{cash.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Cash</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <Heart className="h-8 w-8 text-health mx-auto mb-2" />
              <div className="font-semibold">{health}/100</div>
              <div className="text-sm text-muted-foreground">Health</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <BookOpen className="h-8 w-8 text-education mx-auto mb-2" />
              <div className="font-semibold">Grade {education}</div>
              <div className="text-sm text-muted-foreground">Education</div>
            </div>
          </div>

          {/* Progress Comparison */}
          <div className="space-y-3">
            <h3 className="font-semibold">Income Comparison</h3>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Your cash: ₹{cash.toLocaleString()}</span>
                <span>Poverty line: ₹{povertyLine.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-cash h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((cash / povertyLine) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Top 1% average: ₹4.6L</span>
              </div>
              <div className="w-full bg-top-percent rounded-full h-2" />
            </div>
          </div>

          <Button onClick={onReplay} className="w-full">
            Play Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};