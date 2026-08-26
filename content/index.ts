import rawQuestions from "./questions.generated.json";
import { lessons, tests } from "./catalog";
import { customQuestions } from "./questions/custom";
import { questionBankSchema, type Question } from "./schema";

export const questions = questionBankSchema.parse([...rawQuestions, ...customQuestions]);

export const questionById = new Map<string, Question>(
  questions.map((question) => [question.id, question])
);

export function getTest(slug: string) {
  return tests.find((test) => test.slug === slug);
}

export function getTestQuestions(slug: string) {
  const test = getTest(slug);
  if (!test) return [];
  return test.questionIds.map((id) => questionById.get(id)).filter(Boolean) as Question[];
}

export { lessons, tests };
