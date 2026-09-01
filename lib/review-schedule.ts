import type { Answer } from "./grading";

export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

export type ReviewState = {
  attempts: number;
  correctAttempts: number;
  streak: number;
  lastResult: "correct" | "wrong";
  lastAnswer?: Answer;
  lastAnsweredAt: string;
  nextReviewAt: string;
};

export function scheduleReview(
  previous: ReviewState | undefined,
  correct: boolean,
  now = new Date(),
  answer?: Answer
): ReviewState {
  const streak = correct ? (previous?.streak ?? 0) + 1 : 0;
  const nextReview = new Date(now);

  if (correct) {
    const intervalIndex = Math.min(streak - 1, REVIEW_INTERVAL_DAYS.length - 1);
    nextReview.setDate(nextReview.getDate() + REVIEW_INTERVAL_DAYS[intervalIndex]);
  }

  return {
    attempts: (previous?.attempts ?? 0) + 1,
    correctAttempts: (previous?.correctAttempts ?? 0) + (correct ? 1 : 0),
    streak,
    lastResult: correct ? "correct" : "wrong",
    ...(answer !== undefined ? { lastAnswer: answer } : {}),
    lastAnsweredAt: now.toISOString(),
    nextReviewAt: nextReview.toISOString()
  };
}

export function isDueForReview(progress: ReviewState, now = new Date()) {
  return new Date(progress.nextReviewAt).getTime() <= now.getTime();
}
