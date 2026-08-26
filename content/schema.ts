import { z } from "zod";

const baseQuestionSchema = z.object({
  id: z.string().min(1),
  originalNumber: z.number().int().positive(),
  lessonId: z.string().min(1),
  sourceTestId: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  prompt: z.string().min(1),
  explanation: z.string().min(1)
});

const choiceQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("choice"),
  options: z.array(z.string()).min(2),
  correct: z.array(z.number().int().nonnegative()).min(1)
});

const shortQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("short"),
  answers: z.array(z.string()).min(1),
  displayAnswer: z.string().min(1)
});

export const questionSchema = z.discriminatedUnion("type", [
  choiceQuestionSchema,
  shortQuestionSchema
]);

export const questionBankSchema = z.array(questionSchema);

export type Question = z.infer<typeof questionSchema>;
export type ChoiceQuestion = z.infer<typeof choiceQuestionSchema>;
export type ShortQuestion = z.infer<typeof shortQuestionSchema>;
