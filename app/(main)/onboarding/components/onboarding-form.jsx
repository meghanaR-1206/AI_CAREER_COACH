"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "../../../lib/schema";

import { updateUser } from "@/actions/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { industries } from "@/data/Industries";

const OnboardingForm = ({ industries }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const router = useRouter();

  const selectedIndustry = watch("industry");

  const onSubmit = (data) => {
    setError(null);
    startTransition(async () => {
      try {
        await updateUser(data);
        router.push("/dashboard");
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
      }
    });
  };

  const selected = industries.find((ind) => ind.id === selectedIndustry);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-gradient-to-r from-[#00809D] to-[#F3A26D] text-white p-8 rounded-lg space-y-6 shadow-xl mt-10"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Complete Your Onboarding
      </h2>

      {/* Industry */}
      <div>
        <Label>Industry</Label>
        <select
          {...register("industry")}
          className="w-full mt-1 p-2 text-black rounded"
        >
          <option value="">Select Industry</option>
          {industries.map((ind) => (
            <option key={ind.id} value={ind.id}>
              {ind.name}
            </option>
          ))}
        </select>
        {errors.industry && (
          <p className="text-sm text-yellow-200">{errors.industry.message}</p>
        )}
      </div>

      {/* SubIndustry */}
      <div>
        <Label>Specialization</Label>
        <select
          {...register("subIndustry")}
          className="w-full mt-1 p-2 text-black rounded"
        >
          <option value="">Select Specialization</option>
          {selected?.subIndustries.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
        {errors.subIndustry && (
          <p className="text-sm text-yellow-200">
            {errors.subIndustry.message}
          </p>
        )}
      </div>

      {/* Experience */}
      <div>
        <Label>Experience (in years)</Label>
        <Input
          type="number"
          min={0}
          {...register("experience")}
          placeholder="0"
          className="text-black"
        />
        {errors.experience && (
          <p className="text-sm text-yellow-200">
            {errors.experience.message}
          </p>
        )}
      </div>

      {/* Bio */}
      <div>
        <Label>Bio</Label>
        <Textarea
          rows={3}
          {...register("bio")}
          className="text-black"
          placeholder="Tell us about yourself (max 500 chars)"
        />
        {errors.bio && (
          <p className="text-sm text-yellow-200">{errors.bio.message}</p>
        )}
      </div>

      {/* Skills */}
      <div>
        <Label>Skills (comma-separated)</Label>
        <Input
          {...register("skills")}
          placeholder="e.g. React, Node.js, Python"
          className="text-black"
        />
        {errors.skills && (
          <p className="text-sm text-yellow-200">{errors.skills.message}</p>
        )}
      </div>

      {error && (
        <p className="text-red-200 text-center text-sm">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-[#FF7601] hover:bg-orange-600 text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Complete Onboarding"}
      </Button>
    </form>
  );
};

export default OnboardingForm;
