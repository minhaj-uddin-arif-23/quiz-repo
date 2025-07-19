"use server";

import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function assignTest(testId, name, email, customUsername, customPassword) {
  try {
    const username = customUsername || `user_${uuidv4().slice(0, 8)}`;
    const password = customPassword || `pass_${uuidv4().slice(0, 8)}`;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        assignedTests: { create: { testId, assignedAt: new Date(), loginToken: uuidv4() } },
      },
    });
    return {
      success: true,
      userId: user.id,
      credentials: { username, password, loginToken: user.assignedTests[0].loginToken },
    };
  } catch (error) {
    console.error("Error assigning test:", error);
    return { success: false, error: "Failed to assign test" };
  }
}