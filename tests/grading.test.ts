import { describe, expect, it } from "vitest";
import type { Question } from "@/content/schema";
import { gradeQuestion, normalizeAnswer } from "@/lib/grading";

const base = {
  id: "q1",
  originalNumber: 1,
  lessonId: "lesson",
  sourceTestId: "test",
  tags: ["tag"],
  prompt: "Pitanje",
  explanation: "Objašnjenje"
};

describe("gradeQuestion", () => {
  it("requires the exact set for a choice question", () => {
    const question: Question = { ...base, type: "choice", options: ["a", "b", "c"], correct: [0, 2] };
    expect(gradeQuestion(question, [2, 0])).toBe(true);
    expect(gradeQuestion(question, [0])).toBe(false);
    expect(gradeQuestion(question, [0, 1, 2])).toBe(false);
  });

  it("normalizes whitespace and Serbian casing in short answers", () => {
    const question: Question = { ...base, type: "short", answers: ["Tačno|5"], displayAnswer: "Tačno|5" };
    expect(gradeQuestion(question, "  TAČNO | 5 ")).toBe(true);
    expect(normalizeAnswer(" A B ")).toBe("ab");
  });
});
