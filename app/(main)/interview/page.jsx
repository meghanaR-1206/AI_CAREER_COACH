import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/Stats-cards";
import PerformanceChart from "./_components/Performance-charts";
import QuizList from "./_components/Quiz-list";
import MockInterviewPage from "./_components/MockInterview"; // ✅

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
          Interview Preparation
        </h1>
      </div>

      {/* ✅ Show Mock Interview Test here */}
      <div className="mb-10">
        <MockInterviewPage />
      </div>

      {/* ✅ Rest of the dashboard */}
      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
