import { getIndustryInsights } from "@/actions/dashboard";
import SalaryChart from "./components/SalaryChart";
import GrowthRateCard from "./components/GrowthRateCard";
import DemandLevelTag from "./components/DemandLevelTag";
import TopSkillsCloud from "./components/TopSkillsCloud";
import MarketOutlookMeter from "./components/MarketOutlookMeter";
import TrendsList from "./components/TrendsList";
import RecommendedSkills from "./components/RecommendedSkills";

export default async function IndustryInsightsPage() {
  const insights = await getIndustryInsights();

  return (
    <div className="p-6 space-y-6 bg-gradient-to-tr from-[#FCECDD] via-[#E0F7FA] to-[#FFF5E1] min-h-screen">

      <h1 className="text-3xl font-bold text-[#FF7601]">Industry Insights: {insights.industry}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <GrowthRateCard rate={insights.growthRate} />
        <DemandLevelTag level={insights.demandLevel} />
      </div>

      <SalaryChart salaryRanges={insights.salaryRanges} />
      <TopSkillsCloud skills={insights.topSkills} />
      <MarketOutlookMeter outlook={insights.marketOutlook} />
      <TrendsList trends={insights.keyTrends} />
      <RecommendedSkills skills={insights.recommendedSkills} />
    </div>
  );
}
