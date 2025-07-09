"use client";
import type React from "react";

import { useState } from "react";
import { TrendingUp, User, DollarSign, Clock, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import playersData from "../data/players.json";
import StatsCard from "@/components/Card/StatsCard";
import { getAddictionLevel, getRiskLevel } from "@/lib/utils";
import Header from "@/components/Header/header";
import PlayerCard from "@/components/Card/PlayerCard";

export default function SafePlayAnalytics() {
  const [players, setPlayers] = useState<PlayerData[]>(playersData);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<PlayerData>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.player_id) {
      const newPlayer: PlayerData = {
        player_id: formData.player_id,
        affluent_loss_prone: formData.affluent_loss_prone || 0,
        chase_addict: formData.chase_addict || 0,
        impulsive_behaviour_flag: formData.impulsive_behaviour_flag || 0,
        "spike_inflation_%": formData["spike_inflation_%"] || 0,
        age_classification: formData.age_classification || 0,
        selfexc_history: formData.selfexc_history || 0,
        "latenight_session%_x": formData["latenight_session%_x"] || 0,
        sum_net_result_x: formData.sum_net_result_x || 0,
        deposit_amount_x: formData.deposit_amount_x || 0,
        age: formData.age || 0,
        gender: formData.gender || 0,
        country: formData.country || "",
        "avg_total_hands/session": formData["avg_total_hands/session"] || 0,
        avg_buyin_amount: formData.avg_buyin_amount || 0,
        risk_percentage: formData.risk_percentage || 0,
      };
      setPlayers([...players, newPlayer]);
      setFormData({});
      setShowForm(false);
    }
  };

  const chartConfig = {
    risk: {
      label: "Risk Level",
      color: "hsl(var(--chart-1))",
    },
    addiction: {
      label: "Addiction Factors",
      color: "hsl(var(--chart-2))",
    },
    financial: {
      label: "Financial Impact",
      color: "hsl(var(--chart-3))",
    },
    behavioral: {
      label: "Behavioral Patterns",
      color: "hsl(var(--chart-4))",
    },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <Header />
        {selectedPlayer ? (
          /* Player Detail View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setSelectedPlayer(null)}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  Player ID: {selectedPlayer.player_id}
                </Badge>
                <Badge
                  variant={
                    getRiskLevel(selectedPlayer.risk_percentage).color as any
                  }
                  className="text-lg px-4 py-2"
                >
                  {getRiskLevel(selectedPlayer.risk_percentage).level} Risk
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Player Overview */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Player Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-slate-500">Age</Label>
                      <p className="font-semibold">{selectedPlayer.age}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Country</Label>
                      <p className="font-semibold">{selectedPlayer.country}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Gender</Label>
                      <p className="font-semibold">
                        {selectedPlayer.gender === 0 ? "Male" : "Female"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-slate-500">Addiction Level</Label>
                      <p className="font-semibold text-red-600">
                        {getAddictionLevel(selectedPlayer)}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Risk Percentage
                      </span>
                      <span className="font-semibold">
                        {selectedPlayer.risk_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedPlayer.risk_percentage >= 70
                            ? "bg-red-500"
                            : selectedPlayer.risk_percentage >= 40
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${selectedPlayer.risk_percentage}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Risk Factor Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <BarChart
                      data={[
                        {
                          name: "Chase Addiction",
                          value: selectedPlayer.chase_addict * 25,
                        },
                        {
                          name: "Loss Prone",
                          value: selectedPlayer.affluent_loss_prone * 25,
                        },
                        {
                          name: "Impulsive Behavior",
                          value: selectedPlayer.impulsive_behaviour_flag * 25,
                        },
                        {
                          name: "Self-Exclusion History",
                          value: selectedPlayer.selfexc_history * 12.5,
                        },
                        {
                          name: "Late Night Sessions",
                          value: selectedPlayer["latenight_session%_x"],
                        },
                        {
                          name: "Spike Inflation",
                          value: selectedPlayer["spike_inflation_%"],
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="" />
                      <XAxis
                        dataKey="name"
                        angle={-30}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="green" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Financial & Behavioral Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Net Result"
                description="Total losses"
                stat={selectedPlayer.sum_net_result_x}
                statColour="text-red-600"
                titleIcon={<DollarSign className="h-4 w-4" />}
                includeDollarSign
              />
              <StatsCard
                title="Deposits"
                description="Total deposited"
                stat={selectedPlayer.deposit_amount_x}
                statColour="text-blue-600"
                titleIcon={<TrendingUp className="h-4 w-4" />}
                includeDollarSign
              />
              <StatsCard
                title=" Avg Buy-in"
                description="Per session"
                stat={selectedPlayer.avg_buyin_amount}
                statColour="text-slate-500"
                titleIcon={<Target className="h-4 w-4" />}
                includeDollarSign
              />
              <StatsCard
                title=" Avg Hands"
                description="Per session"
                stat={selectedPlayer["avg_total_hands/session"]}
                statColour="text-slate-500"
                titleIcon={<Clock className="h-4 w-4" />}
                includeDollarSign
              />
            </div>

            {/* Behavioral Pattern Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Behavioral Pattern Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-1/2"
                >
                  <LineChart
                    data={[
                      {
                        time: "Week 1",
                        risk: selectedPlayer.risk_percentage * 0.7,
                      },
                      {
                        time: "Week 2",
                        risk: selectedPlayer.risk_percentage * 0.8,
                      },
                      {
                        time: "Week 3",
                        risk: selectedPlayer.risk_percentage * 0.9,
                      },
                      { time: "Week 4", risk: selectedPlayer.risk_percentage },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="green"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Main Dashboard */
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="dashboard">Player Dashboard</TabsTrigger>
              <TabsTrigger value="predict">Risk Prediction</TabsTrigger>
            </TabsList>
            {/* FIRST TAB THE MAIN DASHBOARD STARTS HERE */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                  title="Total Players"
                  stat={players.length}
                  description="Active monitoring"
                />
                <StatsCard
                  title="High Risk Players"
                  stat={`${
                    players.filter((p) => p.risk_percentage >= 70).length
                  }`}
                  description="Require Immediate attention"
                  statColour="text-red-600"
                />

                <StatsCard
                  title="Average Risk"
                  stat={`${(
                    players.reduce((sum, p) => sum + p.risk_percentage, 0) /
                    players.length
                  ).toFixed(1)}%`}
                  description="Across all players"
                />
              </div>

              {/* Players List */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by Player ID or Country..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full"
                  />
                </div>
                <Select
                  value={filterRisk}
                  onValueChange={(value) => {
                    setFilterRisk(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk (70%+)</SelectItem>
                    <SelectItem value="medium">Medium Risk (40-69%)</SelectItem>
                    <SelectItem value="low">Low Risk (&lt;40%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <PlayerCard
                players={players}
                setSelectedPlayer={setSelectedPlayer}
                searchTerm={searchTerm}
                filterRisk={filterRisk}
              />
            </TabsContent>
            {/* SECOND TAB RISK PREDICTION STARTS HERE */}
            <TabsContent value="predict" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Player Risk Prediction</CardTitle>
                  <CardDescription>
                    Enter player data to assess addiction risk level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="player_id">Player ID</Label>
                        <Input
                          id="player_id"
                          type="number"
                          value={formData.player_id || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              player_id: Number.parseInt(e.target.value),
                            })
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              age: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              gender: Number.parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Male</SelectItem>
                            <SelectItem value="1">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="affluent_loss_prone">
                          Affluent Loss Prone
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              affluent_loss_prone: Number.parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                            <SelectItem value="2">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="chase_addict">Chase Addiction</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              chase_addict: Number.parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">None</SelectItem>
                            <SelectItem value="1">Low</SelectItem>
                            <SelectItem value="2">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="impulsive_behaviour_flag">
                          Impulsive Behavior
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              impulsive_behaviour_flag: Number.parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="selfexc_history">
                          Self-Exclusion History
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              selfexc_history: Number.parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">None</SelectItem>
                            <SelectItem value="1">Once</SelectItem>
                            <SelectItem value="2">Multiple</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="spike_inflation">
                          Spike Inflation %
                        </Label>
                        <Input
                          id="spike_inflation"
                          type="number"
                          step="0.01"
                          value={formData["spike_inflation_%"] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              "spike_inflation_%": Number.parseFloat(
                                e.target.value
                              ),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="latenight_session">
                          Late Night Session %
                        </Label>
                        <Input
                          id="latenight_session"
                          type="number"
                          step="0.01"
                          value={formData["latenight_session%_x"] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              "latenight_session%_x": Number.parseFloat(
                                e.target.value
                              ),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="sum_net_result">Net Result</Label>
                        <Input
                          id="sum_net_result"
                          type="number"
                          value={formData.sum_net_result_x || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sum_net_result_x: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="deposit_amount">Deposit Amount</Label>
                        <Input
                          id="deposit_amount"
                          type="number"
                          value={formData.deposit_amount_x || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              deposit_amount_x: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="avg_hands">Avg Hands/Session</Label>
                        <Input
                          id="avg_hands"
                          type="number"
                          value={formData["avg_total_hands/session"] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              "avg_total_hands/session": Number.parseInt(
                                e.target.value
                              ),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="avg_buyin">Avg Buy-in Amount</Label>
                        <Input
                          id="avg_buyin"
                          type="number"
                          value={formData.avg_buyin_amount || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              avg_buyin_amount: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="risk_percentage">Risk Percentage</Label>
                        <Input
                          id="risk_percentage"
                          type="number"
                          step="0.01"
                          value={formData.risk_percentage || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              risk_percentage: Number.parseFloat(
                                e.target.value
                              ),
                            })
                          }
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Predict Addiction Risk
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
