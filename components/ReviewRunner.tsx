"use client";

import { useState } from "react";
import { questionById } from "@/content";
import type { Question } from "@/content/schema";
import { gradeQuestion, isQuestionAnswered, type Answer } from "@/lib/grading";
import { recordReview, useProgress } from "@/lib/progress";
import { isDueForReview } from "@/lib/review-schedule";
import { QuestionCard } from "./QuestionCard";

export function ReviewRunner() {
  const { progress, loaded } = useProgress();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [answer, setAnswer] = useState<Answer | undefined>();
  const [result, setResult] = useState<boolean | undefined>();
  const [reviewedQuestion, setReviewedQuestion] = useState<Question>();
  const dueQuestions = Object.entries(progress.questions)
    .filter(([id, item]) => !completedIds.includes(id) && isDueForReview(item))
    .sort((a, b) => a[1].nextReviewAt.localeCompare(b[1].nextReviewAt))
    .map(([id]) => questionById.get(id))
    .filter(Boolean) as Question[];
  const question = reviewedQuestion ?? dueQuestions[0];

  function checkAnswer() {
    if (!question || answer === undefined || !isQuestionAnswered(answer)) return;
    const correct = gradeQuestion(question, answer);
    setReviewedQuestion(question);
    setResult(correct);
    recordReview(question.id, correct, answer);
  }

  function nextQuestion() {
    if (question) setCompletedIds((current) => [...current, question.id]);
    setAnswer(undefined);
    setResult(undefined);
    setReviewedQuestion(undefined);
  }

  if (!loaded) return <div className="empty-state">Učitavam napredak…</div>;
  if (!question) {
    return (
      <div className="empty-state">
        <span className="eyebrow">Red je prazan</span>
        <h2>{completedIds.length ? "Sesija je završena" : "Nema pitanja za danas"}</h2>
        <p>Pogrešna pitanja se vraćaju odmah, a tačna posle 1, 3, 7, 14 ili 30 dana.</p>
      </div>
    );
  }

  return (
    <div className="review-runner">
      <div className="review-progress">
        <span>Ponavljanje</span>
        <strong>{completedIds.length + 1} · još {dueQuestions.length}</strong>
      </div>
      <QuestionCard
        question={question}
        number={completedIds.length + 1}
        answer={answer}
        onAnswer={setAnswer}
        locked={result !== undefined}
        result={result}
        showFeedback={result !== undefined}
      />
      <div className="quiz-actions">
        {result === undefined ? (
          <button className="button" type="button" disabled={!isQuestionAnswered(answer)} onClick={checkAnswer}>Proveri odgovor</button>
        ) : (
          <button className="button" type="button" onClick={nextQuestion}>Sledeće pitanje</button>
        )}
      </div>
    </div>
  );
}
