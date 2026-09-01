"use client";

import { useState } from "react";
import { lessons, questionById, tests } from "@/content";
import type { Question } from "@/content/schema";
import { gradeQuestion, isQuestionAnswered, type Answer } from "@/lib/grading";
import { recordReview, useProgress } from "@/lib/progress";
import { QuestionCard } from "./QuestionCard";
import { RichText } from "./RichText";

type SortOrder = "wrong" | "attempts" | "accuracy" | "latest";
type ResultFilter = "all" | "wrong" | "correct";

function answerLabel(answer: Answer | undefined) {
  if (answer === undefined) return "Nije sačuvan u ranijoj verziji";
  if (Array.isArray(answer)) {
    if (!answer.length) return "Bez odgovora";
    return answer.map((index) => String.fromCharCode(97 + index)).join(", ");
  }
  return answer || "Bez odgovora";
}

export function QuestionHistory() {
  const { progress, loaded } = useProgress();
  const [sortOrder, setSortOrder] = useState<SortOrder>("wrong");
  const [testFilter, setTestFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState<ResultFilter>("all");
  const [retryId, setRetryId] = useState<string>();
  const [retryAnswer, setRetryAnswer] = useState<Answer>();
  const [retryResult, setRetryResult] = useState<boolean>();

  if (!loaded) return <div className="empty-state">Učitavam istoriju…</div>;

  const seen = Object.entries(progress.questions)
    .map(([id, stats]) => ({ question: questionById.get(id), stats }))
    .filter((item): item is { question: Question; stats: typeof item.stats } => Boolean(item.question));
  const availableTestIds = new Set(seen.map(({ question }) => question.sourceTestId));
  const filtered = seen
    .filter(({ question }) => testFilter === "all" || question.sourceTestId === testFilter)
    .filter(({ stats }) => resultFilter === "all" || stats.lastResult === resultFilter)
    .sort((a, b) => {
      const wrongA = a.stats.attempts - a.stats.correctAttempts;
      const wrongB = b.stats.attempts - b.stats.correctAttempts;
      if (sortOrder === "attempts") return b.stats.attempts - a.stats.attempts || wrongB - wrongA;
      if (sortOrder === "accuracy") {
        return a.stats.correctAttempts / a.stats.attempts - b.stats.correctAttempts / b.stats.attempts;
      }
      if (sortOrder === "latest") return b.stats.lastAnsweredAt.localeCompare(a.stats.lastAnsweredAt);
      return wrongB - wrongA || b.stats.attempts - a.stats.attempts || b.stats.lastAnsweredAt.localeCompare(a.stats.lastAnsweredAt);
    });

  function openRetry(questionId: string) {
    setRetryId((current) => current === questionId ? undefined : questionId);
    setRetryAnswer(undefined);
    setRetryResult(undefined);
  }

  function checkRetry(question: Question) {
    if (retryAnswer === undefined || !isQuestionAnswered(retryAnswer)) return;
    const correct = gradeQuestion(question, retryAnswer);
    setRetryResult(correct);
    recordReview(question.id, correct, retryAnswer);
  }

  if (!seen.length) {
    return (
      <div className="empty-state">
        <span className="eyebrow">Još nema podataka</span>
        <h2>Uradi prvi test</h2>
        <p>Ovde će se pojaviti pitanja nakon što predaš test ili završiš ponavljanje.</p>
      </div>
    );
  }

  return (
    <div className="history-layout">
      <section className="history-controls" aria-label="Filteri istorije">
        <label>
          <span>Sortiranje</span>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}>
            <option value="wrong">Najviše grešaka</option>
            <option value="attempts">Najviše pokušaja</option>
            <option value="accuracy">Najniži uspeh</option>
            <option value="latest">Poslednje rađena</option>
          </select>
        </label>
        <label>
          <span>Test</span>
          <select value={testFilter} onChange={(event) => setTestFilter(event.target.value)}>
            <option value="all">Svi testovi</option>
            {tests.filter((test) => availableTestIds.has(test.id)).map((test) => (
              <option key={test.id} value={test.id}>{test.title}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Poslednji rezultat</span>
          <select value={resultFilter} onChange={(event) => setResultFilter(event.target.value as ResultFilter)}>
            <option value="all">Svi rezultati</option>
            <option value="wrong">Netačno</option>
            <option value="correct">Tačno</option>
          </select>
        </label>
        <div className="history-count"><strong>{filtered.length}</strong><span>prikazano</span></div>
      </section>

      {filtered.length ? (
        <div className="history-list">
          {filtered.map(({ question, stats }) => {
            const wrong = stats.attempts - stats.correctAttempts;
            const accuracy = Math.round((stats.correctAttempts / stats.attempts) * 100);
            const test = tests.find((item) => item.id === question.sourceTestId);
            const lesson = lessons.find((item) => item.id === question.lessonId);
            const isRetrying = retryId === question.id;

            return (
              <article className="history-item" key={question.id}>
                <div className="history-rank"><strong>{wrong}</strong><span>grešaka</span></div>
                <div className="history-content">
                  <div className="history-source">
                    <span>{test?.title ?? question.sourceTestId}</span>
                    <span>{lesson?.title ?? question.lessonId}</span>
                    <span>Pitanje {question.originalNumber}</span>
                  </div>
                  <RichText html={question.prompt} className="history-prompt rich-text" />
                  <dl className="history-stats">
                    <div><dt>Pokušaji</dt><dd>{stats.attempts}</dd></div>
                    <div><dt>Uspeh</dt><dd>{accuracy}%</dd></div>
                    <div><dt>Poslednji rezultat</dt><dd className={stats.lastResult === "correct" ? "result-correct" : "result-wrong"}>{stats.lastResult === "correct" ? "Tačno" : "Netačno"}</dd></div>
                    <div><dt>Poslednji odgovor</dt><dd>{answerLabel(stats.lastAnswer)}</dd></div>
                    <div><dt>Poslednji pokušaj</dt><dd>{new Date(stats.lastAnsweredAt).toLocaleDateString("sr-RS")}</dd></div>
                  </dl>
                  <button className="button button-secondary history-retry" type="button" onClick={() => openRetry(question.id)}>
                    {isRetrying ? "Zatvori pitanje" : "Pokušaj ponovo"}
                  </button>
                </div>
                {isRetrying && (
                  <div className="history-retry-panel">
                    <QuestionCard
                      question={question}
                      number={question.originalNumber}
                      answer={retryAnswer}
                      onAnswer={setRetryAnswer}
                      locked={retryResult !== undefined}
                      result={retryResult}
                      showFeedback={retryResult !== undefined}
                    />
                    <div className="history-retry-actions">
                      {retryResult === undefined ? (
                        <button className="button" type="button" disabled={!isQuestionAnswered(retryAnswer)} onClick={() => checkRetry(question)}>Proveri odgovor</button>
                      ) : (
                        <button className="button button-secondary" type="button" onClick={() => { setRetryAnswer(undefined); setRetryResult(undefined); }}>Pokušaj opet</button>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : <div className="empty-state"><h2>Nema rezultata</h2><p>Promeni filtere da bi video druga pitanja.</p></div>}
    </div>
  );
}
