"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourseWithGemini } from "@/actions/learning";
import { Loader2 } from "lucide-react";

export default function LearnClient({ courses }) {
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleGenerate(e) {
    e.preventDefault();
    if (!skill.trim()) return;

    try {
      setLoading(true);
      await createCourseWithGemini(skill);
      router.refresh();
      setSkill("");
    } catch (err) {
      alert("❌ Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00809D] via-[#00A0C2] to-[#CDEAF1] px-4 py-10 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            📘 Learn a New Skill
          </h1>
          <p className="text-md text-white/80">
            AI-powered beginner-friendly courses tailored just for you.
          </p>
        </header>

        {/* Skill Input */}
        <form
          onSubmit={handleGenerate}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g. React, Python, SQL, UI/UX"
            className="p-3 w-full max-w-md rounded border border-white bg-white/90 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-[#00809D] px-5 py-3 rounded font-semibold shadow hover:bg-white/80 transition flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            {loading ? "Generating..." : "Generate Course"}
          </button>
        </form>

        {/* Courses */}
        <section>
          {courses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <a
                  key={course.id}
                  href={`/learn/${course.id}`}
                  className="block bg-[#FFF8E7] text-[#0F3D3E] hover:shadow-xl p-5 rounded-xl border border-[#FFBF69]/30 hover:border-[#FFBF69] transition space-y-2"
                >
                  <h2 className="text-lg font-bold text-[#FF7601]">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-700">{course.description}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/90 mt-12">
              <p className="text-lg font-medium">
                🚀 No courses yet. Enter a skill above and let AI create one just for you!
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
