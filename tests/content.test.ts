import { describe, expect, it } from "vitest";
import { questionById, questions, tests } from "@/content";

describe("content bank", () => {
  it("contains 120 unique, tagged questions", () => {
    expect(questions).toHaveLength(120);
    expect(new Set(questions.map((question) => question.id)).size).toBe(120);
    expect(questions.every((question) => question.tags.length > 0)).toBe(true);
  });

  it("has valid question references in every test", () => {
    tests.forEach((test) => {
      expect(test.questionIds).toHaveLength(40);
      test.questionIds.forEach((id) => expect(questionById.has(id)).toBe(true));
    });
  });

  it("keeps the 30 choice and 10 short-answer test format", () => {
    tests.forEach((test) => {
      const testQuestions = test.questionIds.map((id) => questionById.get(id)!);
      expect(testQuestions.slice(0, 30).every((question) => question.type === "choice")).toBe(true);
      expect(testQuestions.slice(30).every((question) => question.type === "short")).toBe(true);

      testQuestions.forEach((question) => {
        if (question.type === "choice") {
          expect(question.correct.every((index) => index < question.options.length)).toBe(true);
        }
      });
    });
  });
});
