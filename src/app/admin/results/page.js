import ResultReport from "@/components/ResultReport";

export default function ResultsPage({ params }) {
  const { testId } = params;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Results</h1>
      <ResultReport testId={testId} />
    </div>
  );
}