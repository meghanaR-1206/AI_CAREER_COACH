"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto bg-[#FCECDD] text-[#00809D] p-6 rounded-xl space-y-6 shadow-md">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-[#00809D]">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6 p-0">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-extrabold text-[#FF7601]">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress value={result.quizScore} className="w-full bg-white" />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-[#FF7601]/10 p-4 rounded-lg border border-[#FF7601]/30">
            <p className="font-semibold text-[#FF7601]">Improvement Tip:</p>
            <p className="text-sm mt-1">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#00809D]">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-[#00809D]/20 rounded-lg p-4 space-y-2 bg-white"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-[#00809D]">{index + 1}. {q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Your answer:</span>{" "}
                  <span className="text-[#00809D]/80">{q.userAnswer}</span>
                </p>
                {!q.isCorrect && (
                  <p>
                    <span className="font-semibold">Correct answer:</span>{" "}
                    <span className="text-green-700">{q.answer}</span>
                  </p>
                )}
              </div>

              <div className="text-sm bg-[#00809D]/10 p-3 rounded">
                <p className="font-semibold">Explanation:</p>
                <p className="text-[#00809D]/90">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      
    </div>
  );
}
