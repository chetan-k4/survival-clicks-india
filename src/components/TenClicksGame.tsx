import React from "react";
import { useState, useCallback, useEffect } from "react";
import { GameHUD } from "./GameHUD";
import { GameScene, Choice } from "./GameScene";
import { GameSummary } from "./GameSummary";
import { GameAlert } from "./GameAlert";
import { GameIntro } from "./GameIntro";
import { useToast } from "@/hooks/use-toast";

// Import background images
import immunisationSvg from "@/assets/Untitled design (2).svg";
import schoolDueSvg from "@/assets/Untitled design (3).svg";
import constructionSvg from "@/assets/Untitled design (1).svg";

interface GameState {
  cash: number;
  health: number;
  education: number;
  scene: string;
  flags: Set<string>;
  gameOver: boolean;
  showSummary: boolean;
}

interface AlertState {
  isOpen: boolean;
  title: string;
  description: string;
}

const initialState: GameState = {
  cash: 2000,
  health: 80,
  education: 3,
  scene: 'intro',
  flags: new Set(),
  gameOver: false,
  showSummary: false,
};

export const TenClicksGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [alert, setAlert] = useState<AlertState>({ isOpen: false, title: '', description: '' });
  const { toast } = useToast();

  const showAlert = (title: string, description: string) => {
    setAlert({ isOpen: true, title, description });
  };

  const resetGame = useCallback(() => {
    setGameState(initialState);
    setAlert({ isOpen: false, title: '', description: '' });
  }, []);

  const startGame = () => {
    setGameState(prev => ({ ...prev, scene: 'immunisation' }));
  };

  const checkFailStates = (newState: Partial<GameState>) => {
    const cash = newState.cash ?? gameState.cash;
    const health = newState.health ?? gameState.health;
    const education = newState.education ?? gameState.education;

    if (cash < 0) {
      showAlert("Out of money", "Your family ran out of money. Try making different choices.");
      return true;
    }
    if (health <= 0) {
      showAlert("Health crisis", "Your family's health collapsed. Healthcare access is crucial for survival.");
      return true;
    }
    if (education <= 0) {
      showAlert("Education lost", "Your child left school permanently, limiting future opportunities.");
      return true;
    }
    return false;
  };

  const applyChoice = (choice: Choice) => {
    const newState: Partial<GameState> = {};
    
    if (choice.effects.cash) newState.cash = gameState.cash + choice.effects.cash;
    if (choice.effects.health) newState.health = Math.min(100, Math.max(0, gameState.health + choice.effects.health));
    if (choice.effects.education) newState.education = Math.max(0, gameState.education + choice.effects.education);
    
    if (choice.effects.setFlag) {
      const newFlags = new Set(gameState.flags);
      newFlags.add(choice.effects.setFlag);
      newState.flags = newFlags;
    }

    // Check for failure before applying
    if (checkFailStates(newState)) {
      return;
    }

    // Move to next scene
    const sceneOrder = ['immunisation', 'school', 'job', 'drought', 'summary'];
    const currentIndex = sceneOrder.indexOf(gameState.scene);
    const nextScene = sceneOrder[currentIndex + 1];
    
    if (nextScene === 'summary') {
      newState.showSummary = true;
    } else {
      newState.scene = nextScene;
    }

    setGameState(prev => ({ ...prev, ...newState }));
  };

  const getSceneData = () => {
    switch (gameState.scene) {
      case 'immunisation':
        return {
          title: "Child's Immunisation Day",
          description: "You just remembered that it is the day for your child's routine immunisation.",
          backgroundImage: undefined,
          centerImage: immunisationSvg,
          centerImageSize: 'sm' as const,
          choices: [
            {
              text: "Go to clinic (-₹300, +10 health)",
              effects: { cash: -300, health: 10 }
            },
            {
              text: "Skip this month (save money, but miss vaccination)",
              effects: { setFlag: 'missed_vaccine' }
            }
          ]
        };

      case 'school':
        return {
          title: "School Fees Due",
          description: "The school now charges ₹900 for uniforms and books.",
          backgroundImage: undefined,
          centerImage: schoolDueSvg,
          centerImageSize: 'sm' as const,
          choices: [
            {
              text: "Pay from savings (-₹900, child advances grade)",
              effects: { cash: -900, education: 1 }
            },
            {
              text: "Borrow at 4%/month (-₹936 total, child advances)",
              effects: { cash: -936, education: 1 }
            },
            {
              text: "Child works today (+₹400, no grade advancement)",
              effects: { cash: 400 }
            }
          ]
        };

      case 'job':
        return {
          title: "Construction Job Opportunity",
          description: "A construction site 15 km away will pay ₹600 more each week if you can commute.",
          backgroundImage: undefined,
          centerImage: constructionSvg,
          centerImageSize: 'sm' as const,
          choices: [
            {
              text: "Buy monthly bus pass (-₹300, +₹600 income)",
              effects: { cash: 300 } // Net +300
            },
            {
              text: "Borrow for bicycle (-₹1,530 with interest, +₹1,200)",
              effects: { cash: -330 } // Net -330
            },
            {
              text: "Decline offer (no change)",
              effects: {}
            }
          ]
        };

      case 'drought': {
        // Always show a drought message, even if not wiped out
        const cashAfterDrought = gameState.cash - 1000;
        let description = "A drought halves day-labour demand. Income this month drops by ₹1,000.";
        if (cashAfterDrought < 0) {
          description += " The drought wiped out your savings. Economic shocks hit the poor hardest.";
        }
        return {
          title: "Economic Shock",
          description,
          backgroundImage: undefined, // Pure white background
          choices: [
            {
              text: "Continue (-₹1,000)",
              effects: { cash: -1000 }
            }
          ]
        };
      }

      default:
        return {
          title: "Unknown Scene",
          description: "Something went wrong.",
          choices: []
        };
    }
  };

  // Scroll to top on scene change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameState.scene]);

  // Show intro screen
  if (gameState.scene === 'intro') {
    return <GameIntro onStart={startGame} />;
  }

  if (gameState.showSummary) {
    return (
      <>
        <GameSummary
          cash={gameState.cash}
          health={gameState.health}
          education={gameState.education}
          onReplay={resetGame}
        />
      </>
    );
  }

  const sceneData = getSceneData();

  return (
    <>
      <GameHUD 
        cash={gameState.cash}
        health={gameState.health}
        education={gameState.education}
      />
      
      <GameScene
        title={sceneData.title}
        description={sceneData.description}
        choices={sceneData.choices}
        onChoice={applyChoice}
        backgroundImage={sceneData.backgroundImage}
        centerImage={sceneData.centerImage}
        centerImageSize={sceneData.centerImageSize}
      />
      
      <GameAlert
        isOpen={alert.isOpen}
        title={alert.title}
        description={alert.description}
        onClose={resetGame}
      />
    </>
  );
};