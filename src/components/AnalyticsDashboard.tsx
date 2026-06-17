"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Wallet, ArrowUpRight } from "lucide-react";

const chartData = [
  { date: "Jan", tvl: 1200000, participants: 450 },
  { date: "Feb", tvl: 1800000, participants: 800 },
  { date: "Mar", tvl: 1400000, participants: 650 },
  { date: "Apr", tvl: 2500000, participants: 1200 },
  { date: "May", tvl: 3800000, participants: 1800 },
  { date: "Jun", tvl: 4200000, participants: 2200 },
];

const chartConfig = {
  tvl: {
    label: "Total Value Locked ($)",
    color: "hsl(var(--primary))",
  },
  participants: {
    label: "Participants",
    color: "hsl(var(--accent))",
  },
};

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
          <TrendingUp className="w-4 h-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$4,285,192</div>
          <p className="text-xs text-muted-foreground">
            +18.1% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
          <Users className="w-4 h-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,248</div>
          <p className="text-xs text-muted-foreground">
            +12 new in last 24h
          </p>
        </CardContent>
      </Card>

      <Card className="glass-panel md:col-span-2 lg:col-span-4 h-[400px]">
        <CardHeader>
          <CardTitle className="font-headline">Protocol Growth Trends</CardTitle>
          <CardDescription>Visualizing historical TVL and user adoption metrics</CardDescription>
        </CardHeader>
        <CardContent className="h-full pb-12">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))'}}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fill: 'hsl(var(--muted-foreground))'}}
                  tickFormatter={(value) => `$${value / 1000000}M`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="tvl" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorTvl)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}