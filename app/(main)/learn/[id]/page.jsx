import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 🔍 Ask Gemini to explain the step in depth
async function getStepExplanation(stepTitle, stepContent) {
  const prompt = `
You are an expert tutor. Provide a JSON response with the following structure:

{
  "detailed": "Detailed explanation of the topic",
  "learn": ["Point 1", "Point 2", "Point 3"],
  "useCase": "Real-world example where this is used",
  "quiz": "Ask a reflection question for the learner"
}

Topic: "${stepTitle}"
Content: "${stepContent}"

Only return valid raw JSON. No markdown.
  `;

  const result = await model.generateContent(prompt);
  const raw = await result.response.text();
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

export default async function CoursePage({ params, searchParams }) {
  const { userId } = await auth();
  if (!userId) {
    return <div className="p-6 text-red-600">You must be signed in to view this course.</div>;
  }

  const course = await db.course.findUnique({
    where: { id: params.id },
    include: {
      steps: { orderBy: { order: "asc" } },
    },
  });

  if (!course) {
    return <div className="p-6 text-red-500">Course not found</div>;
  }

  const stepIndex = parseInt(searchParams.step || "0");
  const step = course.steps[stepIndex];

  if (!step) {
    return <div className="p-6 text-red-500">Step not found</div>;
  }

  // 🧠 Get enriched AI explanation
  const explain = await getStepExplanation(step.title, step.content);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-blue-700">{step.title}</h2>
        <p className="text-gray-700">{step.content}</p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <p className="text-sm text-yellow-900">
            ⚡ <strong>Detailed Explanation:</strong> {explain.detailed}
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
          <p className="font-medium text-blue-800">📘 What You’ll Learn:</p>
          <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
            {explain.learn.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
          <p className="font-medium text-green-800">🌍 Real-World Use Case:</p>
          <p className="text-sm text-green-900">{explain.useCase}</p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-md">
          <p className="font-medium text-purple-800">🧠 Reflection Prompt:</p>
          <p className="text-sm text-purple-900">{explain.quiz}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {stepIndex > 0 ? (
          <a
            href={`/learn/${params.id}?step=${stepIndex - 1}`}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Previous Step
          </a>
        ) : (
          <div />
        )}

        {stepIndex + 1 < course.steps.length ? (
          <a
            href={`/learn/${params.id}?step=${stepIndex + 1}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next Step →
          </a>
        ) : (
          <div className="text-green-600 font-medium">🎉 You've reached the end!</div>
        )}
      </div>
    </div>
  );
}
