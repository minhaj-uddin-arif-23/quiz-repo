import AdminCustomTestForm from "@/components/AdminForms/AdminCustomTestForm";
import { getQuizQuestions } from "@/actions/createCustomTest";

export default async function CustomTestsPage() {
  const { success, quizzes, questions, error } = await getQuizQuestions();
  if (!success) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Custom Test</h1>
      <AdminCustomTestForm initialQuizzes={quizzes} initialQuestions={questions} />
    </div>
  );
}