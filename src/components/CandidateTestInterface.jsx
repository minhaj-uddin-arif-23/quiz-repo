"use client";

import { useState, useEffect } from "react";
import { prisma } from "@/lib/prisma";

export default function CandidateTestInterface({ testId }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchTest() {
      const test = await prisma.test.findUnique({
        where: { id: testId },
        include: { testQuestions: { include: { question: { include: { choices: true } } } } },
      });
      setTimeLeft(test.durationMin * 60);
      setQuestions(test.testQuestions.map((tq) => tq.question));
    }
    fetchTest();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!submitted) {
      await prisma.userTestSession.create({
        data: {
          userId: "currentUserId", // Replace with auth logic
          testId,
          startedAt: new Date(),
          endedAt: new Date(),
          submitted: true,
          userAnswers: { create: Object.entries(answers).map(([qId, resp]) => ({ questionId: qId, response: resp })) },
        },
      });
      setSubmitted(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Test Interface</h2>
      <div>Time Left: {formatTime(timeLeft)}</div>
      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p>{q.text}</p>
          {q.type === "MCQ" ? q.choices.map((c) => (
            <div key={c.id}>
              <input type="checkbox" onChange={() => handleAnswerChange(q.id, c.index)} disabled={submitted} />
              {c.text}
            </div>
          )) : <input type="text" onChange={(e) => handleAnswerChange(q.id, e.target.value)} disabled={submitted} />}
        </div>
      ))}
      {!submitted && <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Submit</button>}
      {submitted && <p>Test submitted!</p>}
    </div>
  );
}