import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Gauge } from "lucide-react";

export default function MarketOutlookMeter({ outlook }) {
  const colorMap = {
    Positive: "bg-[#A3D9A5] text-green-800",   // light green
    Neutral: "bg-[#F3A26D] text-white",        // orange
    Negative: "bg-[#FF6B6B] text-white",       // red
  };

  const labelMap = {
    Positive: "📈 Positive",
    Neutral: "😐 Neutral",
    Negative: "📉 Negative",
  };

  return (
    <Card className="bg-[#FCECDD] border border-[#FF7601]/30 shadow-sm">
      <CardHeader className="text-[#00809D] font-semibold text-lg flex items-center gap-2">
        <Gauge className="w-5 h-5 text-[#FF7601]" />
        Market Outlook
      </CardHeader>
      <CardContent>
        <div
          className={`px-4 py-2 rounded-full text-center font-medium w-fit ${colorMap[outlook]}`}
        >
          {labelMap[outlook]}
        </div>
      </CardContent>
    </Card>
  );
}
