import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn, getAddictionLevel, getRiskLevel } from "@/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Props {
  players: PlayerData[];
  setSelectedPlayer: React.Dispatch<React.SetStateAction<PlayerData | null>>;
  searchTerm: string;
  filterRisk: string;
}

const PlayerCard = ({
  players,
  setSelectedPlayer,
  searchTerm,
  filterRisk,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.player_id.toString().includes(searchTerm) ||
      player.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk =
      filterRisk === "all" ||
      (filterRisk === "high" && player.risk_percentage >= 70) ||
      (filterRisk === "medium" &&
        player.risk_percentage >= 40 &&
        player.risk_percentage < 70) ||
      (filterRisk === "low" && player.risk_percentage < 40);
    return matchesSearch && matchesRisk;
  });

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const currentPlayers = filteredPlayers.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Risk Assessment</CardTitle>
        <CardDescription>
          Click on any player to view detailed analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentPlayers.map((player) => {
            const risk = getRiskLevel(player.risk_percentage);
            const RiskIcon = risk.icon;

            return (
              <div
                key={player.player_id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => setSelectedPlayer(player)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <RiskIcon
                      className={`h-5 w-5 ${
                        risk.color === "destructive"
                          ? "text-red-500"
                          : risk.color === "warning"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-semibold">
                        Player #{player.player_id}
                      </p>
                      <p className="text-sm text-slate-500">
                        {player.age} years • {player.country} •{" "}
                        {getAddictionLevel(player)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{player.risk_percentage}%</p>
                    <p className="text-sm text-slate-500">{risk.level} Risk</p>
                  </div>
                  <Badge
                    variant={
                      risk.color === "destructive" ? "destructive" : "outline"
                    }
                    className={cn(
                      `${
                        risk.color === "warning"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`
                    )}
                  >
                    {risk.level}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages} ({filteredPlayers.length}{" "}
              players)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
