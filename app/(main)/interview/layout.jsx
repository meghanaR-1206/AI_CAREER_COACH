import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/Stats-Cards";
import PerformanceChart from "./_components/Performance-charts";
import QuizList from "./_components/Quiz-List";
import MockInterviewPage from "./_components/MockInterview";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div className="space-y-12 bg-gradient-to-b from-[#00809D] via-[#00A0C2] to-[#CDEAF1] text-white px-4 py-10 rounded-xl">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          Interview Preparation
        </h1>
        <p className="text-md mt-2 text-white/80 max-w-2xl mx-auto">
          Track your progress and test your skills with AI-powered quizzes
        </p>
      </div>

      {/* Stats and Analytics */}
      <section className="space-y-10">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </section>

      {/* Mock Interview at the bottom */}
      <section className="pt-12 border-t border-white/30">
        <MockInterviewPage />
      </section>
    </div>
  );
}
