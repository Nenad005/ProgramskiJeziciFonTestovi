"use client";

import Link from "next/link";
import { questionById } from "@/content";
import { tests } from "@/content/catalog";
import { isDueForReview } from "@/lib/review-schedule";
import { useProgress } from "@/lib/progress";

export function DashboardSummary() {
  const { progress, loaded } = useProgress();
  const dueCount = Object.values(progress.questions).filter((item) => isDueForReview(item)).length;
  const latestAttempt = progress.attempts[0];
  const latestTest = tests.find((test) => test.id === latestAttempt?.testId);
  const draft = Object.entries(progress.drafts)
    .filter(([, value]) => Object.values(value.answers).some((answer) => Array.isArray(answer) ? answer.length : answer.trim()))
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))[0];
  const draftTest = tests.find((test) => test.id === draft?.[0]);
  const answeredQuestions = Object.keys(progress.questions).filter((id) => questionById.has(id)).length;

  return (
    <section className="dashboard-strip" aria-label="Tvoj napredak">
      <div className="metric">
        <span>Pitanja sa istorijom</span>
        <strong>{loaded ? answeredQuestions : "—"}</strong>
      </div>
      <div className="metric metric-accent">
        <span>Za ponavljanje</span>
        <strong>{loaded ? dueCount : "—"}</strong>
        <Link href="/ponavljanje">Otvori red</Link>
      </div>
      <div className="metric metric-wide">
        <span>{draftTest ? "Nedovršen test" : "Poslednji rezultat"}</span>
        {draftTest ? (
          <Link className="metric-link" href={`/testovi/${draftTest.slug}/radi`}>Nastavi: {draftTest.title}</Link>
        ) : latestAttempt && latestTest ? (
          <strong>{latestTest.title} · {latestAttempt.score}/{latestAttempt.total}</strong>
        ) : (
          <strong>Još nema pokušaja</strong>
        )}
      </div>
    </section>
  );
}
