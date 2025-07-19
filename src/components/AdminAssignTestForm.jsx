"use client";

import { useState } from "react";
import { assignTest } from "@/actions/assignTest";

export default function AdminAssignTestForm() {
  const [testId, setTestId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customUsername, setCustomUsername] = useState("");
  const [customPassword, setCustomPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await assignTest(testId, name, email, customUsername || undefined, customPassword || undefined);
    if (result.success) {
      setMessage(`Test assigned to ${name}. Credentials: ${JSON.stringify(result.credentials)}`);
      setTestId("");
      setName("");
      setEmail("");
      setCustomUsername("");
      setCustomPassword("");
    } else {
      setMessage(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold mb-2">Assign Test to Interviewee</h2>
      <input
        type="text"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
        placeholder="Test ID"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        value={customUsername}
        onChange={(e) => setCustomUsername(e.target.value)}
        placeholder="Custom Username (optional)"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        value={customPassword}
        onChange={(e) => setCustomPassword(e.target.value)}
        placeholder="Custom Password (optional)"
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Assign Test
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}