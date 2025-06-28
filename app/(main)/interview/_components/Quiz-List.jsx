"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./Quiz-Result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="bg-[#FCECDD] text-[#00809D] rounded-xl shadow-sm p-4">
      <Card className="bg-[#FFF4EE] text-[#00809D] border border-[#FF7601]/30 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-3xl md:text-4xl text-[#FF7601] font-extrabold">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-[#00809D]/80">
                Review your past quiz performance
              </CardDescription>
            </div>
            
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {assessments?.length > 0 ? (
            assessments.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="bg-[#FFF4EE] hover:bg-[#FF7601]/10 border border-[#FF7601]/30 rounded-lg shadow-sm cursor-pointer transition-all"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#00809D]">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex justify-between text-sm text-[#00809D]/80">
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>

                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-[#FF7601]/90 italic">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <p className="text-center text-sm opacity-80">
              No quizzes taken yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quiz Result Modal */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFF4EE] text-[#00809D] border-[#FF7601]/30 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-[#FF7601] font-bold text-2xl">
              Quiz Details
            </DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
