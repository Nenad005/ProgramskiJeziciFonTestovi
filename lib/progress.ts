"use client";

import { useEffect, useState } from "react";
import type { Answer } from "./grading";
import { scheduleReview, type ReviewState } from "./review-schedule";

const STORAGE_KEY = "pj-testovi-progress-v1";
const CHANGE_EVENT = "pj-progress-change";

export type TestAttempt = {
  id: string;
  testId: string;
  completedAt: string;
  score: number;
  total: number;
};

export type TestDraft = {
  answers: Record<string, Answer>;
  updatedAt: string;
};

export type ProgressState = {
  version: 1;
  questions: Record<string, ReviewState>;
  attempts: TestAttempt[];
  drafts: Record<string, TestDraft>;
};

export const emptyProgress: ProgressState = {
  version: 1,
  questions: {},
  attempts: [],
  drafts: {}
};

function readProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      version: 1,
      questions: parsed.questions ?? {},
      attempts: parsed.attempts ?? [],
      drafts: parsed.drafts ?? {}
    };
  } catch {
    return emptyProgress;
  }
}

function writeProgress(progress: ProgressState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Kviz ostaje upotrebljiv i kada pregledač blokira lokalno skladište.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function saveDraft(testId: string, answers: Record<string, Answer>) {
  const progress = readProgress();
  writeProgress({
    ...progress,
    drafts: {
      ...progress.drafts,
      [testId]: { answers, updatedAt: new Date().toISOString() }
    }
  });
}

type Result = { questionId: string; correct: boolean };

export function completeTest(testId: string, results: Result[]) {
  const progress = readProgress();
  const now = new Date();
  const questions = { ...progress.questions };
  results.forEach(({ questionId, correct }) => {
    questions[questionId] = scheduleReview(questions[questionId], correct, now);
  });

  const drafts = { ...progress.drafts };
  delete drafts[testId];
  const score = results.filter((result) => result.correct).length;
  const attempt: TestAttempt = {
    id: `${testId}-${now.getTime()}`,
    testId,
    completedAt: now.toISOString(),
    score,
    total: results.length
  };

  writeProgress({
    version: 1,
    questions,
    drafts,
    attempts: [attempt, ...progress.attempts].slice(0, 100)
  });
}

export function recordReview(questionId: string, correct: boolean) {
  const progress = readProgress();
  writeProgress({
    ...progress,
    questions: {
      ...progress.questions,
      [questionId]: scheduleReview(progress.questions[questionId], correct)
    }
  });
}

export function resetProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nema podataka za brisanje kada je lokalno skladište nedostupno.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sync = () => {
      setProgress(readProgress());
      setLoaded(true);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { progress, loaded };
}
