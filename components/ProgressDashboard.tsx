"use client";

import Link from "next/link";
import { questionById, tests } from "@/content";
import { resetProgress, useProgress } from "@/lib/progress";
import { isDueForReview } from "@/lib/review-schedule";

export function ProgressDashboard() {
  const { progress, loaded } = useProgress();
  if (!loaded) return <div className="empty-state">Učitavam napredak…</div>;

  const tagStats = new Map<string, { attempts: number; correct: number }>();
  Object.entries(progress.questions).forEach(([questionId, item]) => {
    const question = questionById.get(questionId);
    question?.tags.forEach((tag) => {
      const current = tagStats.get(tag) ?? { attempts: 0, correct: 0 };
      current.attempts += item.attempts;
      current.correct += item.correctAttempts;
      tagStats.set(tag, current);
    });
  });
  const sortedTags = [...tagStats.entries()].sort((a, b) => {
    const accuracyA = a[1].correct / a[1].attempts;
    const accuracyB = b[1].correct / b[1].attempts;
    return accuracyA - accuracyB;
  });
  const dueCount = Object.values(progress.questions).filter((item) => isDueForReview(item)).length;

  return (
    <div className="progress-layout">
      <section className="stats-grid">
        <div className="stat-card"><span>Završeni testovi</span><strong>{progress.attempts.length}</strong></div>
        <div className="stat-card"><span>Viđena pitanja</span><strong>{Object.keys(progress.questions).length}</strong></div>
        <div className="stat-card stat-card-accent"><span>Za ponavljanje</span><strong>{dueCount}</strong></div>
      </section>

      <section className="panel">
        <div className="section-heading"><div><span className="eyebrow">Analiza</span><h2>Uspeh po oblasti</h2></div></div>
        {sortedTags.length ? (
          <div className="tag-stats">
            {sortedTags.map(([tag, stat]) => {
              const percent = Math.round((stat.correct / stat.attempts) * 100);
              return (
                <div className="tag-stat" key={tag}>
                  <span>{tag.replaceAll("-", " ")}</span>
                  <div className="bar"><i style={{ width: `${percent}%` }} /></div>
                  <strong>{percent}%</strong>
                </div>
              );
            })}
          </div>
        ) : <p className="muted">Završi prvi test da bi se prikazala analiza oblasti.</p>}
      </section>

      <section className="panel">
        <div className="section-heading"><div><span className="eyebrow">Istorija</span><h2>Poslednji pokušaji</h2></div><Link href="/istorija">Sva pitanja →</Link></div>
        <div className="attempt-list">
          {progress.attempts.slice(0, 10).map((attempt) => {
            const test = tests.find((item) => item.id === attempt.testId);
            return (
              <div key={attempt.id}>
                <span>{test?.title ?? attempt.testId}</span>
                <time>{new Date(attempt.completedAt).toLocaleDateString("sr-RS")}</time>
                <strong>{attempt.score}/{attempt.total}</strong>
              </div>
            );
          })}
          {!progress.attempts.length && <p className="muted">Još nema završenih testova.</p>}
        </div>
      </section>

      <section className="danger-zone">
        <div><strong>Obriši lokalni napredak</strong><p>Rezultati postoje samo u ovom pregledaču.</p></div>
        <button className="text-button" type="button" onClick={() => confirm("Obrisati sav napredak?") && resetProgress()}>Obriši podatke</button>
      </section>
    </div>
  );
}
