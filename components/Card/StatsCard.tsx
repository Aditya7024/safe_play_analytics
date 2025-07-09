import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  stat?: number | string;
  description: string;
  statColour?: string;
  titleIcon?: React.ReactNode;
  includeDollarSign?: boolean;
}

const StatsCard = ({
  title,
  description,
  stat,
  statColour,
  titleIcon,
  includeDollarSign,
}: Props) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {titleIcon}
          <p>{title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${statColour ? statColour : ""}`}>
          {includeDollarSign ? `$ ${stat}` : stat}
        </div>
        <p className="text-xs text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
