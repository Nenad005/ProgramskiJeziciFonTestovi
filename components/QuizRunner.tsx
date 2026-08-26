"use client";

import { useEffect, useRef, useState } from "react";
import type { Question } from "@/content/schema";
import { gradeQuestion, isQuestionAnswered, type Answer } from "@/lib/grading";
import { completeTest, saveDraft, useProgress } from "@/lib/progress";
import { QuestionCard } from "./QuestionCard";

type QuizRunnerProps = {
  testId: string;
  title: string;
  questions: Question[];
};

export function QuizRunner({ testId, title, questions }: QuizRunnerProps) {
  const { progress, loaded } = useProgress();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [results, setResults] = useState<Record<string, boolean> | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!loaded || initialized.current) return;
    setAnswers(progress.drafts[testId]?.answers ?? {});
    initialized.current = true;
  }, [loaded, progress.drafts, testId]);

  const answeredCount = questions.filter((question) => isQuestionAnswered(answers[question.id])).length;

  function updateAnswer(questionId: string, answer: Answer) {
    const nextAnswers = { ...answers, [questionId]: answer };
    setAnswers(nextAnswers);
    saveDraft(testId, nextAnswers);
  }

  function submitQuiz(event: React.FormEvent) {
    event.preventDefault();
    const nextResults = Object.fromEntries(
      questions.map((question) => [question.id, gradeQuestion(question, answers[question.id])])
    );
    setResults(nextResults);
    completeTest(
      testId,
      questions.map((question) => ({ questionId: question.id, correct: nextResults[question.id] }))
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retry() {
    initialized.current = true;
    setAnswers({});
    setResults(null);
    saveDraft(testId, {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const score = results ? Object.values(results).filter(Boolean).length : 0;
  const percent = results ? Math.round((score / questions.length) * 100) : 0;

  return (
    <form onSubmit={submitQuiz}>
      <div className="quiz-toolbar">
        <div>
          <span className="eyebrow">Aktivni test</span>
          <h1>{title}</h1>
        </div>
        <div className="answer-counter">
          <strong>{results ? `${score}/${questions.length}` : `${answeredCount}/${questions.length}`}</strong>
          <span>{results ? `${percent}% tačno` : "odgovoreno"}</span>
        </div>
      </div>

      {results && (
        <div className="result-banner">
          <div className="result-score">{percent}%</div>
          <div>
            <strong>{score} od {questions.length} tačnih odgovora</strong>
            <p>Pogrešna pitanja su odmah dodata u red za ponavljanje.</p>
          </div>
        </div>
      )}

      <div className="question-stack">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            number={index + 1}
            answer={answers[question.id]}
            onAnswer={(answer) => updateAnswer(question.id, answer)}
            locked={Boolean(results)}
            result={results?.[question.id]}
            showFeedback={Boolean(results)}
          />
        ))}
      </div>

      <div className="quiz-actions">
        {results ? (
          <button className="button button-secondary" type="button" onClick={retry}>Uradi ponovo</button>
        ) : (
          <button className="button" type="submit">Predaj test</button>
        )}
      </div>
    </form>
  );
}
