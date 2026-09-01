import rawQuestions from "./questions.generated.json";
import oldExamQuestions from "./old-exams.generated.json";
import { lessons, tests } from "./catalog";
import { apstraktniTipoviIEnkapsulacijaQuestions } from "./questions/apstraktni-tipovi-i-enkapsulacija";
import { customQuestions } from "./questions/custom";
import { otherLanguagesQuestions } from "./questions/drugi-jezici";
import { linqQuestions } from "./questions/linq-i-biblioteka";
import { teorijaKompajleraQuestions } from "./questions/teorija-kompajlera";
import { questionBankSchema, type Question } from "./schema";

export const questions = questionBankSchema.parse([
  ...rawQuestions,
  ...customQuestions,
  ...linqQuestions,
  ...teorijaKompajleraQuestions,
  ...apstraktniTipoviIEnkapsulacijaQuestions,
  ...otherLanguagesQuestions,
  ...oldExamQuestions
]);

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
