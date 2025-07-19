// src/components/AdminForms/AdminCustomTestForm.js
"use client";

import { useState, useEffect } from "react";
import { createCustomTest } from "@/actions/createCustomTest";

export default function AdminCustomTestForm({ initialQuizzes = [], initialQuestions = [] }) {
  const [testName, setTestName] = useState("");
  const [quizId, setQuizId] = useState("");
  const [testDate, setTestDate] = useState("");
  const [durationMin, setDurationMin] = useState(30);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [questions, setQuestions] = useState(initialQuestions);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Filter questions based on selected quiz
    setQuestions(initialQuestions.filter((q) => !quizId || q.quizId === quizId));
    setSelectedQuestionIds([]); // Reset selected questions when quiz changes
  }, [quizId, initialQuestions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createCustomTest(testName, quizId, testDate, durationMin, selectedQuestionIds);
    if (result.success) {
      setMessage(`Custom test ${testName} created successfully!`);
      setTestName("");
      setQuizId("");
      setTestDate("");
      setDurationMin(30);
      setSelectedQuestionIds([]);
    } else {
      setMessage(result.error);
    }
  };

  const handleQuestionToggle = (questionId) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold mb-2">Create Custom Test</h2>
      <input
        type="text"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        placeholder="Enter test name"
        className="border p-2 mb-2 w-full"
        required
      />
      <select
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      >
        <option value="">Select a quiz</option>
        {initialQuizzes.map((quiz) => (
          <option key={quiz.id} value={quiz.id}>
            {quiz.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={testDate}
        onChange={(e) => setTestDate(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="number"
        value={durationMin}
        onChange={(e) => setDurationMin(e.target.value)}
        placeholder="Duration (minutes)"
        className="border p-2 mb-2 w-full"
        min="1"
        required
      />
      <div className="mb-2">
        <h3 className="font-bold">Select Questions:</h3>
        {questions.map((q) => (
          <div key={q.id} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedQuestionIds.includes(q.id)}
              onChange={() => handleQuestionToggle(q.id)}
            />
            <span className="ml-2">{q.text} (Group: {q.groupName})</span>
          </div>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Test
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}