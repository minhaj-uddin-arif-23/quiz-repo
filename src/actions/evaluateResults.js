"use server";

import { prisma } from "@/lib/prisma";

export async function evaluateResults(testId) {
  try {
    const testSession = await prisma.userTestSession.findFirst({
      where: { testId },
      include: { userAnswers: { include: { question: true } } },
    });
    let totalScore = 0;
    const answers = testSession.userAnswers.map((ua) => {
      const isCorrect = ua.question.type === "MCQ" && parseInt(ua.response) === ua.question.correct;
      const score = isCorrect ? ua.question.score : 0;
      totalScore += score;
      return { question: ua.question.text, response: ua.response, score, isCorrect };
    });
    await prisma.userTestSession.update({
      where: { id: testSession.id },
      data: { totalScore },
    });
    return { success: true, answers, totalScore };
  } catch (error) {
    console.error("Error evaluating results:", error);
    return { success: false, error: "Failed to evaluate results" };
  }
}