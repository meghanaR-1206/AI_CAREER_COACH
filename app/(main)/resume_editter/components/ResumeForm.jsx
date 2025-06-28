"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "../../../lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { improveTextWithAI, getResume, saveResume } from "@/actions/resume";
import ResumePreview from "./ResumePreview";

export default function ResumeEditor() {
  const [mode, setMode] = useState("edit"); // edit | preview
  const [loading, setLoading] = useState(false);
  const [loadingField, setLoadingField] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
      },
      summary: "",
      skills: "",
      experience: [{ title: "", description: "" }],
      education: [{ title: "", description: "" }],
      projects: [{ title: "", description: "" }],
    },
  });

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const projectFields = useFieldArray({ control, name: "projects" });

  useEffect(() => {
    (async () => {
      const existing = await getResume();
      if (existing) {
        reset(existing);
      }
    })();
  }, [reset]);

  const handleImprove = async (label, path) => {
    const value = getValues(path);
    setLoadingField(path);
    const res = await improveTextWithAI(value, label);
    setLoadingField(null);
    if (res.improved) {
      setValue(path, res.improved);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await saveResume(data);
    setLoading(false);
    setMode("preview");
  };

  // ---- Preview Mode ----
  if (mode === "preview") {
    const values = getValues();
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
        <ResumePreview data={values} />
        <div className="flex justify-between pt-4">
          <Button onClick={() => setMode("edit")} className="bg-[#00809D] text-white">
            Back to Edit
          </Button>
          <Button variant="outline">Download PDF (Coming Soon)</Button>
        </div>
      </div>
    );
  }

  // ---- Form Mode ----
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#00809D]">📝 Build Your Resume</h1>

      {/* Contact Info */}
      <Card>
        <CardHeader>Contact Info</CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Input placeholder="Name" {...register("contactInfo.name")} />
          <Input placeholder="Email" {...register("contactInfo.email")} />
          <Input placeholder="Phone" {...register("contactInfo.phone")} />
          <Input placeholder="LinkedIn" {...register("contactInfo.linkedin")} />
          <Input placeholder="GitHub" {...register("contactInfo.github")} />
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader className="flex justify-between">
          <span>Summary</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleImprove("summary", "summary")}
            disabled={loadingField === "summary"}
          >
            {loadingField === "summary" ? "Improving..." : "Make it better with AI"}
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea rows={4} {...register("summary")} />
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>Skills</CardHeader>
        <CardContent>
          <Textarea rows={3} {...register("skills")} placeholder="Comma separated skills" />
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>Experience</CardHeader>
        <CardContent className="space-y-4">
          {experienceFields.fields.map((item, idx) => (
            <div key={item.id} className="space-y-2">
              <Input {...register(`experience.${idx}.title`)} placeholder="Role & Company" />
              <Textarea {...register(`experience.${idx}.description`)} />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => experienceFields.append({ title: "", description: "" })}
            variant="secondary"
          >
            Add Experience
          </Button>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>Education</CardHeader>
        <CardContent className="space-y-4">
          {educationFields.fields.map((item, idx) => (
            <div key={item.id} className="space-y-2">
              <Input {...register(`education.${idx}.title`)} placeholder="Degree & Institution" />
              <Textarea {...register(`education.${idx}.description`)} />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => educationFields.append({ title: "", description: "" })}
            variant="secondary"
          >
            Add Education
          </Button>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader className="flex justify-between">
          <span>Projects</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleImprove("project", "projects.0.description")}
            disabled={loadingField === "projects.0.description"}
          >
            {loadingField === "projects.0.description" ? "Improving..." : "Make it better with AI"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectFields.fields.map((item, idx) => (
            <div key={item.id} className="space-y-2">
              <Input {...register(`projects.${idx}.title`)} placeholder="Project Title" />
              <Textarea {...register(`projects.${idx}.description`)} />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => projectFields.append({ title: "", description: "" })}
            variant="secondary"
          >
            Add Project
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-6">
        <Button type="submit" disabled={loading} className="bg-[#FF7601] text-white px-6">
          {loading ? "Saving..." : "Save Resume"}
        </Button>
        <Button type="button" variant="outline" onClick={() => setMode("preview")}>
          Preview Resume
        </Button>
      </div>
    </form>
  );
}
