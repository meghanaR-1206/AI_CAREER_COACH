import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function GrowthRateCard({ rate }) {
  return (
    <Card className="bg-[#FCECDD] border border-[#FF7601]/30 shadow-sm">
      <CardHeader className="text-[#00809D] font-semibold text-lg">
        Growth Rate
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-[#FF7601]">{rate}%</p>
      </CardContent>
    </Card>
  );
}
