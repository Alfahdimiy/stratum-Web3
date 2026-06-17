"use client"

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, UserPlus, Search, MoreHorizontal, Settings, Upload, Trash2 } from "lucide-react";

const WHITELISTED_WALLETS = [
  { address: "0x71C7...f6D2", phase: "Seed", addedAt: "2024-02-15", status: "Active" },
  { address: "0x1A2B...3C4D", phase: "Private", addedAt: "2024-02-14", status: "Active" },
  { address: "0x9E8F...7G6H", phase: "Seed", addedAt: "2024-02-13", status: "Pending" },
  { address: "0x5J4K...3L2M", phase: "Private", addedAt: "2024-02-12", status: "Active" },
  { address: "0x1N0P...9Q8R", phase: "Seed", addedAt: "2024-02-11", status: "Blocked" },
];

export default function AdminPage() {
  const [newWallet, setNewWallet] = useState("");

  return (
    <main className="min-h-screen pt-24 pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold font-headline">Whitelisting Management</h1>
            <p className="text-muted-foreground">Administrative tools for project owners and DAO operators.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Settings className="w-4 h-4" /> Global Settings</Button>
            <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" /> Export CSV</Button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-panel border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  Add Address
                </CardTitle>
                <CardDescription>Manually add an address to the seed whitelist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Wallet Address</label>
                  <Input 
                    placeholder="0x..." 
                    value={newWallet}
                    onChange={(e) => setNewWallet(e.target.value)}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Round Phase</label>
                  <select className="w-full bg-background/50 border border-white/10 rounded-md p-2 text-sm">
                    <option>Seed Round</option>
                    <option>Private A</option>
                    <option>Private B</option>
                  </select>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 glow-primary font-bold">Add to Whitelist</Button>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-headline">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm"><ShieldCheck className="w-4 h-4 mr-2" /> Verify All Pending</Button>
                <Button variant="ghost" className="w-full justify-start text-sm text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4 mr-2" /> Clear All Addresses</Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-white/5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search addresses..." className="pl-10 bg-background/50 border-white/10" />
              </div>
              <Badge variant="outline" className="h-10 px-4 border-white/10">{WHITELISTED_WALLETS.length} Total Addresses</Badge>
            </div>

            <Card className="glass-panel overflow-hidden border-white/5">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="font-headline uppercase text-[10px] tracking-widest text-muted-foreground">Address</TableHead>
                    <TableHead className="font-headline uppercase text-[10px] tracking-widest text-muted-foreground">Phase</TableHead>
                    <TableHead className="font-headline uppercase text-[10px] tracking-widest text-muted-foreground">Added Date</TableHead>
                    <TableHead className="font-headline uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {WHITELISTED_WALLETS.map((wallet, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-white/5">
                      <TableCell className="font-mono text-xs">{wallet.address}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-white/5 text-white font-normal">{wallet.phase}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{wallet.addedAt}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "font-bold text-[10px] uppercase",
                          wallet.status === 'Active' ? 'bg-accent/20 text-accent' : 
                          wallet.status === 'Pending' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'
                        )}>
                          {wallet.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}