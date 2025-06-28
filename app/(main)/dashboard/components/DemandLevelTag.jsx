import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function DemandLevelCard({ level }) {
  const colorMap = {
    High: "bg-[#00809D] text-white",       // Blue
    Medium: "bg-[#FF7601] text-white",     // Orange
    Low: "bg-[#F3A26D] text-white",        // Light Orange / Cream
  };

  return (
    <Card className="bg-[#FCECDD] border border-[#FF7601]/30 shadow-sm">
      <CardHeader className="text-[#00809D] font-semibold text-lg">
        Demand Level
      </CardHeader>
      <CardContent>
        <Badge className={`${colorMap[level]} px-4 py-2 rounded-full text-sm`}>
          {level}
        </Badge>
      </CardContent>
    </Card>
  );
}
