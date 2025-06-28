"use client";

import { useEffect, useState } from "react";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tip, setTip] = useState("");

  useEffect(() => {
    (async () => {
      const quiz = await generateQuiz();
      setQuestions(quiz);
      setAnswers(new Array(quiz.length).fill(null));
    })();
  }, []);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = option;
    setAnswers(updatedAnswers);

    const isCorrect = questions[currentIndex].correctAnswer === option;
    if (isCorrect) setCorrectCount((prev) => prev + 1);

    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        handleFinalSubmit(updatedAnswers, isCorrect ? correctCount + 1 : correctCount);
      }
    }, 2000); // Wait 2 seconds before moving to next question
  };

  const handleFinalSubmit = async (finalAnswers, finalScore) => {
    const result = await saveQuizResult(questions, finalAnswers, finalScore);
    setTip(result.improvementTip || "Keep practicing!");
    setSubmitted(true);
  };

  if (!questions.length) return <p>Loading questions...</p>;

  if (submitted) {
    return (
      <div className="space-y-6 bg-[#FCECDD] text-[#00809D] p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-[#FF7601]">Quiz Completed</h2>
        <p className="text-xl">
          Score: {correctCount} / {questions.length}
        </p>
        <div className="bg-[#FFF4EE] border-l-4 border-[#FF7601] p-4 rounded-md shadow-sm">
          <p className="font-semibold text-[#00809D]">Improvement Tip:</p>
          <p className="italic text-[#00809D]/80">{tip}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="bg-[#FCECDD] text-[#00809D] p-6 rounded-xl space-y-6 shadow">
      <div className="space-y-2">
        <p className="text-lg font-semibold">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <h3 className="text-xl font-bold">{currentQuestion.question}</h3>
      </div>

      <div className="space-y-2">
        {currentQuestion.options.map((opt, i) => (
          <Button
            key={i}
            variant="outline"
            disabled={answers[currentIndex] !== null}
            onClick={() => handleAnswer(opt)}
            className={`w-full text-left border-[#FF7601]/40 hover:bg-[#FF7601]/10 ${
              answers[currentIndex] === opt ? "border-2 border-[#FF7601]" : ""
            }`}
          >
            {opt}
          </Button>
        ))}
      </div>

      {showExplanation && (
        <div className="bg-[#FFF4EE] border-l-4 border-[#FF7601] p-4 rounded-md shadow-sm">
          <p className="text-sm font-semibold text-[#00809D]">Explanation:</p>
          <p className="text-sm text-[#00809D]/80">
            {currentQuestion.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
