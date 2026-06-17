"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Loader2, Sparkles, TrendingUp, Info } from "lucide-react";
import { aiStakingRewardForecaster, AiStakingRewardForecasterOutput } from "@/ai/flows/ai-staking-reward-forecaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ForecasterTool() {
  const [amount, setAmount] = useState("1000");
  const [days, setDays] = useState(90);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<AiStakingRewardForecasterOutput | null>(null);

  const handleForecast = async () => {
    setLoading(true);
    try {
      const result = await aiStakingRewardForecaster({
        stakedAmount: amount,
        tokenSymbol: "FORGE",
        stakingDurationDays: days,
        historicalApyDescription: "Historical APY has ranged from 12% to 18.5% over the last 12 months, usually spiking during high launch activity.",
        contractTVLDescription: "Total Value Locked currently stands at $4.2M, with a steady growth rate of 5% month-over-month.",
        pastRewardDistributionSummary: "Rewards are emitted every block. Withdrawals before term completion incur a 5% slashing penalty.",
      });
      setForecast(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-panel border-primary/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <BrainCircuit className="w-32 h-32 text-primary" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-primary mb-1">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Powered</span>
        </div>
        <CardTitle className="font-headline text-2xl">Reward Forecaster</CardTitle>
        <CardDescription>Predict your future yields based on deep protocol analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stake Amount (FORGE)</label>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background/50 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration (Days)</label>
            <div className="flex gap-2">
              {[30, 90, 180].map((d) => (
                <Button
                  key={d}
                  variant={days === d ? "default" : "outline"}
                  onClick={() => setDays(d)}
                  className="flex-1"
                >
                  {d}d
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button 
          onClick={handleForecast} 
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 glow-primary h-12"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Protocol State...
            </>
          ) : (
            <>
              <BrainCircuit className="mr-2 h-4 w-4" />
              Generate Forecast
            </>
          )}
        </Button>

        {forecast && (
          <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-muted-foreground block mb-1">Estimated APY</span>
                <span className="text-2xl font-bold text-accent">{forecast.predictedYieldPercentage.toFixed(2)}%</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-muted-foreground block mb-1">Est. Total Rewards</span>
                <span className="text-2xl font-bold text-primary">{forecast.predictedTotalRewards}</span>
              </div>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <TrendingUp className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary font-headline">Predictive Summary</AlertTitle>
              <AlertDescription className="text-sm text-foreground/80 leading-relaxed">
                {forecast.predictiveSummary}
              </AlertDescription>
            </Alert>

            <Alert className="bg-accent/5 border-accent/20">
              <Info className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent font-headline">Optimization Recommendations</AlertTitle>
              <AlertDescription className="text-sm text-foreground/80 leading-relaxed">
                {forecast.recommendations}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}