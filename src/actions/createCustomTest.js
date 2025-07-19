// src/actions/createCustomTest.js
"use server";

import { prisma } from "@/lib/prisma";

export async function getQuizQuestions() {
  try {
    const quizzes = await prisma.test.findMany({
      include: { groups: { include: { questions: true } } },
    });
    const allQuestions = quizzes.flatMap((quiz) =>
      quiz.groups.flatMap((group) =>
        group.questions.map((q) => ({ ...q, quizName: quiz.name, groupName: group.name, quizId: quiz.id }))
      )
    );
    return { success: true, quizzes, questions: allQuestions };
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return { success: false, error: "Failed to fetch quiz questions" };
  }
}

export async function createCustomTest(testName, quizId, testDate, durationMin, selectedQuestionIds) {
  try {
    if (!testName || !quizId || !testDate || !durationMin || !selectedQuestionIds?.length) {
      return { success: false, error: "All fields are required, including at least one question" };
    }
    const duration = parseInt(durationMin, 10);
    if (isNaN(duration) || duration <= 0) {
      return { success: false, error: "Duration must be a positive number" };
    }
    const test = await prisma.test.create({
      data: {
        name: testName,
        position: (await prisma.test.findUnique({ where: { id: quizId } })).position,
        date: new Date(testDate),
        durationMin: duration,
      },
    });
    await prisma.testQuestion.createMany({
      data: selectedQuestionIds.map((questionId, index) => ({
        testId: test.id,
        questionId,
        order: index + 1,
      })),
    });
    return { success: true, testId: test.id };
  } catch (error) {
    console.error("Error creating custom test:", error);
    return { success: false, error: "Failed to create custom test" };
  }
}