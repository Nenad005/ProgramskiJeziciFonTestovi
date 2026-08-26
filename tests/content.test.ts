import { describe, expect, it } from "vitest";
import { questionById, questions, tests } from "@/content";

describe("content bank", () => {
  it("contains 80 unique, tagged questions", () => {
    expect(questions).toHaveLength(80);
    expect(new Set(questions.map((question) => question.id)).size).toBe(80);
    expect(questions.every((question) => question.tags.length > 0)).toBe(true);
  });

  it("has valid question references in every test", () => {
    tests.forEach((test) => {
      expect(test.questionIds).toHaveLength(40);
      test.questionIds.forEach((id) => expect(questionById.has(id)).toBe(true));
    });
  });
});
