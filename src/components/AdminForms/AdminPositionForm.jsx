// src/components/AdminForms/AdminPositionForm.js
"use client";

import { useState } from "react";
import { createPosition } from "@/actions/createPosition";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AdminPositionForm() {
  const [positionName, setPositionName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPosition(positionName);
    if (result.success) {
      setMessage(`Position ${positionName} created successfully!`);
      setPositionName("");
    } else {
      setMessage(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold mb-2">Create Position</h2>
      <input
        type="text"
        value={positionName}
        onChange={(e) => setPositionName(e.target.value)}
        placeholder="Enter position (e.g., Frontend Intern)"
        className="border p-2 mb-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create
      </button>
      <Link href={"/"}>
        <Button className={"ml-10 p-2 rounded bg-blue-200 text-black hover:text-white"}>
          Go to home
        </Button>
      </Link>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
