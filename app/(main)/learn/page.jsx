import { getCourses } from "@/actions/learning";
import LearnClient from "./LearnClient";

export default async function LearnPage() {
  const courses = await getCourses();
  return <LearnClient courses={courses} />;
}
