import ResumeForm from "./components/ResumeForm";

export default function ResumeEditorPage() {
  return (
    <main className="min-h-screen bg-[#FCECDD] text-[#00809D] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-[#FF7601]">
            Resume Builder
          </h1>
          <p className="text-md text-[#00809D]/80">
            Craft your resume with AI assistance — edit, preview, and download.
          </p>
        </div>

        <ResumeForm />
      </div>
    </main>
  );
}
