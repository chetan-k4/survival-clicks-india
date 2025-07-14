import React from "react";
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
  const povertyLine = 1860;
  const survived = cash >= 0 && health > 0 && education > 0;
  const abovePovertyLine = cash >= povertyLine;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex items-center justify-center bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Life On ₹1860</CardTitle>
          <CardDescription>How did your family fare?</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status Badge */}
          {survived && (
            <div className="text-center">
              {abovePovertyLine ? (
                <Badge variant="secondary" className="text-lg p-3">
                  {<span className="inline-flex items-center">Above Poverty Line!</span>}
                </Badge>
              ) : (
                <span className="text-lg font-semibold text-red-600">Below Poverty Line</span>
              )}
            </div>
          )}

          {/* Final Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ background: '#F7F7F7' }}>
              <Coins className="h-8 w-8 text-cash mx-auto mb-2" />
              <div className="font-semibold">₹{cash.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Cash</div>
            </div>
            
            <div className="text-center p-4 rounded-lg" style={{ background: '#F7F7F7' }}>
              <Heart className="h-8 w-8 text-health mx-auto mb-2" />
              <div className="font-semibold">{health}/100</div>
              <div className="text-sm text-muted-foreground">Health</div>
            </div>
            
            <div className="text-center p-4 rounded-lg" style={{ background: '#F7F7F7' }}>
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
            </div>
          </div>

          <Button onClick={onReplay} className="cta-btn w-full text-lg py-6 font-bold" style={{background:'#25395B',color:'#FFF',borderRadius:'40px',fontSize:'18px',padding:'16px 48px',boxShadow:'0 2px 8px 0 rgba(0,0,0,0.08)'}}>
            Play Again
          </Button>

          <div className="text-center text-base mt-6 text-muted-foreground">
            Life isn't fair. We all have different starting points. Some of us are just lucky.<br />
            <span className="font-semibold text-green-700">Empower people with direct cash transfers.</span><br />
            <a href="https://project-deep.org/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Donate now at https://project-deep.org/</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};