import { describe, expect, it } from "vitest";
import { isDueForReview, scheduleReview } from "@/lib/review-schedule";

describe("review schedule", () => {
  it("uses increasing intervals for correct streaks", () => {
    const now = new Date("2026-08-26T10:00:00.000Z");
    const first = scheduleReview(undefined, true, now);
    const second = scheduleReview(first, true, now);
    expect(first.nextReviewAt).toBe("2026-08-27T10:00:00.000Z");
    expect(second.nextReviewAt).toBe("2026-08-29T10:00:00.000Z");
    expect(second.streak).toBe(2);
  });

  it("returns a wrong answer to the queue immediately", () => {
    const now = new Date("2026-08-26T10:00:00.000Z");
    const progress = scheduleReview(undefined, false, now);
    expect(progress.streak).toBe(0);
    expect(isDueForReview(progress, now)).toBe(true);
  });

  it("stores the latest submitted answer", () => {
    const now = new Date("2026-08-26T10:00:00.000Z");
    const progress = scheduleReview(undefined, false, now, [1, 3]);
    expect(progress.lastAnswer).toEqual([1, 3]);
    expect(progress.attempts - progress.correctAttempts).toBe(1);
  });
});
