"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "./Quiz";

export default function MockInterviewPage() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="container mx-auto space-y-8 py-10 px-4 bg-[#FCECDD] text-[#00809D] rounded-xl shadow-md">
      {/* Back button */}
      <div className="flex flex-col space-y-4 mx-2">
        <Link href="/interview">
          <Button variant="link" className="gap-2 pl-0 text-[#FF7601] hover:text-[#F3A26D]">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        {/* Title */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-[#00809D]">
            Mock Interview
          </h1>
          <p className="text-md text-[#00809D]/80">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>

      {/* Start Button or Quiz */}
      {!started ? (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleStart}
            className="text-lg px-8 py-3 bg-[#FF7601] hover:bg-[#F3A26D] text-white font-semibold rounded-lg"
          >
            Start Quiz
          </Button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}
