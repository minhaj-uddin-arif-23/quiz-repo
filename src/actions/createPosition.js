// src/actions/createPosition.js
"use server";

import { prisma } from "@/lib/prisma";

export async function createPosition(positionName) {
  try {
    const test = await prisma.test.create({
      data: {
        name: `${positionName} Quiz`,
        position: positionName,
        date: new Date(),
        durationMin: 60,
      },
    });
    return { success: true, testId: test.id };
  } catch (error) {
    console.error("Error creating position:", error);
    return { success: false, error: "Failed to create position" };
  }
}