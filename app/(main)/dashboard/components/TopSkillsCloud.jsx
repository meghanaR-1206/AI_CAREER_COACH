import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function RecommendedSkills({ skills }) {
  return (
    <Card className="bg-[#FCECDD] border border-[#FF7601]/30 shadow-sm">
      <CardHeader className="text-[#00809D] font-semibold text-lg">
        Recommended Skills
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-[#FF7601]/10 border border-[#FF7601] text-[#00809D] px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
