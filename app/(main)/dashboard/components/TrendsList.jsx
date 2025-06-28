import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function TrendsList({ trends }) {
  return (
    <Card className="bg-[#FCECDD] border border-[#FF7601]/30 shadow-sm">
      <CardHeader className="text-[#00809D] font-semibold text-lg">
        Key Trends
      </CardHeader>
      <CardContent className="space-y-2">
        {trends.map((trend, idx) => (
          <div key={idx} className="flex items-center text-sm text-[#00809D]">
            <ChevronRight className="w-4 h-4 mr-2 text-[#FF7601]" />
            <span>{trend}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
