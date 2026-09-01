import { describe, expect, it } from "vitest";
import { questionById, questions, tests } from "@/content";

describe("content bank", () => {
  it("contains unique, tagged questions", () => {
    expect(questions).toHaveLength(399);
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    expect(questions.every((question) => question.tags.length > 0)).toBe(true);
  });

  it("has valid question references in every test", () => {
    tests.forEach((test) => {
      test.questionIds.forEach((id) => expect(questionById.has(id)).toBe(true));
    });
    questions.forEach((question) => {
      if (question.type === "choice") {
        expect(question.correct.every((index) => index < question.options.length)).toBe(true);
      }
    });
  });

  it("keeps the 30 choice and 10 short-answer test format", () => {
    const thematicTests = tests.filter((test) => test.lessonIds[0] !== "stari-rokovi");
    thematicTests.forEach((test) => {
      expect(test.questionIds).toHaveLength(40);
      const testQuestions = test.questionIds.map((id) => questionById.get(id)!);
      expect(testQuestions.slice(0, 30).every((question) => question.type === "choice")).toBe(true);
      expect(testQuestions.slice(30).every((question) => question.type === "short")).toBe(true);
    });
  });

  it("contains all three old exams in their source format", () => {
    const expectedCounts = new Map([
      ["stari-rok-2022-07", 40],
      ["stari-rok-2023-04", 40],
      ["stari-rok-2023-06", 39]
    ]);

    expectedCounts.forEach((count, id) => {
      const test = tests.find((candidate) => candidate.id === id);
      expect(test).toBeDefined();
      expect(test?.questionIds).toHaveLength(count);
      expect(new Set(test?.questionIds).size).toBe(count);
      test?.questionIds.forEach((questionId) => expect(questionById.has(questionId)).toBe(true));
    });

    expect(questionById.has("stari-rok-2023-06-q19")).toBe(false);
  });
});
