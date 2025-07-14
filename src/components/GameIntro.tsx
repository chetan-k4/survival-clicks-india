import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Heart, BookOpen } from "lucide-react";

interface GameIntroProps {
  onStart: () => void;
}

export const GameIntro = ({ onStart }: GameIntroProps) => {
  return (
    <div className="min-h-screen px-4 flex items-center justify-center bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2 font-heading text-brand-navy">
            Life on ₹1860
          </CardTitle>
          <CardDescription className="text-lg">
            A simulation of poverty in rural India
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p className="mb-4">
              You are managing finances for a family of four living below the poverty line in rural India. Your goal is to survive one month above ₹1860 while keeping your family healthy and your child in school.
            </p>
            <p className="mb-4">
              Every choice has consequences. Can you navigate the complex realities of poverty?
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ background: '#F7F7F7' }}>
              <Coins className="h-8 w-8 text-cash mx-auto mb-2" />
              <div className="font-semibold">₹2,000</div>
              <div className="text-sm text-muted-foreground">Starting Cash</div>
            </div>
            
            <div className="text-center p-4 rounded-lg" style={{ background: '#F7F7F7' }}>
              <Heart className="h-8 w-8 text-health mx-auto mb-2" />
              <div className="font-semibold">80/100</div>
              <div className="text-sm text-muted-foreground">Family Health</div>
            </div>
            
            <div className="text-center p-4 rounded-lg" style={{ background: '#F7F7F7' }}>
              <BookOpen className="h-8 w-8 text-education mx-auto mb-2" />
              <div className="font-semibold">Grade 3</div>
              <div className="text-sm text-muted-foreground">Child's Education</div>
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ background: '#F7F7F7' }}>
            <h3 className="font-semibold mb-2">Poverty Context</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>• Poverty line this month: ₹1,860</div>
              <div>• Top 1% average income: ₹4.6 lakh</div>
              <div>• Your starting position: Below poverty line</div>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>
              This simulation is based on economic research and real data about poverty in India.
              <br />
              Inspired by the work of Banerjee & Duflo.
            </p>
          </div>

          <Button onClick={onStart} className="cta-btn w-full text-lg py-6 font-bold" style={{background:'#25395B',color:'#FFF',borderRadius:'40px',fontSize:'18px',padding:'16px 48px',boxShadow:'0 2px 8px 0 rgba(0,0,0,0.08)'}}>
            Begin Simulation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};