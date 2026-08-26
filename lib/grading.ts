import type { Question } from "@/content/schema";

export type Answer = number[] | string;

export function normalizeAnswer(value: string) {
  return value.toLocaleLowerCase("sr").replace(/\s+/g, "");
}

export function isQuestionAnswered(answer: Answer | undefined) {
  if (Array.isArray(answer)) return answer.length > 0;
  return Boolean(answer?.trim());
}

export function gradeQuestion(question: Question, answer: Answer | undefined) {
  if (!isQuestionAnswered(answer)) return false;
  if (question.type === "choice") {
    if (!Array.isArray(answer)) return false;
    const selected = [...answer].sort((a, b) => a - b);
    const correct = [...question.correct].sort((a, b) => a - b);
    return selected.length === correct.length && selected.every((value, index) => value === correct[index]);
  }
  if (typeof answer !== "string") return false;
  const normalized = normalizeAnswer(answer);
  return question.answers.some((valid) => normalizeAnswer(valid) === normalized);
}

export function correctAnswerLabel(question: Question) {
  if (question.type === "short") return question.displayAnswer;
  return question.correct.map((index) => String.fromCharCode(97 + index)).join(", ");
}
