import CandidateTestInterface from "@/components/CandidateTestInterface";

export default function CandidateTestPage({ params }) {
  const { testId } = params;
  return <CandidateTestInterface testId={testId} />;
}