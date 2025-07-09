import { clsx, type ClassValue } from "clsx";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRiskLevel = (riskPercentage: number) => {
  if (riskPercentage >= 70)
    return { level: "High", color: "destructive", icon: AlertTriangle };
  if (riskPercentage >= 40)
    return { level: "Medium", color: "warning", icon: TrendingUp };
  return { level: "Low", color: "success", icon: CheckCircle };
};

export const getAddictionLevel = (player: PlayerData) => {
  const factors = [
    player.chase_addict,
    player.affluent_loss_prone,
    player.impulsive_behaviour_flag,
    player.selfexc_history,
  ];
  const score = factors.reduce((sum, factor) => sum + factor, 0);

  if (score >= 6) return "High Risk";
  if (score >= 3) return "Moderate Risk";
  return "Low Risk";
};
