interface PovertyComparisonProps {
  playerCash: number;
}

export const PovertyComparison = ({ playerCash }: PovertyComparisonProps) => {
  const povertyLine = 1860;
  const topPercent = 460000; // ₹4.6L

  const getProgressWidth = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  return (
    <div className="fixed bottom-4 right-4 md:right-4 md:bottom-4 left-4 md:left-auto bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs md:max-w-xs z-40">
      <h3 className="text-sm font-semibold mb-3 text-foreground">Monthly Comparison</h3>
      
      <div className="space-y-3">
        {/* Player Cash */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Your cash</span>
            <span>₹{playerCash.toLocaleString()}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-cash h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgressWidth(playerCash, povertyLine)}%` }}
            />
          </div>
        </div>

        {/* Poverty Line */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Poverty line</span>
            <span>₹{povertyLine.toLocaleString()}</span>
          </div>
          <div className="w-full bg-poverty-line rounded-full h-2" />
        </div>

        {/* Top 1% */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Top 1% average</span>
            <span>₹4.6L</span>
          </div>
        </div>
      </div>
    </div>
  );
};