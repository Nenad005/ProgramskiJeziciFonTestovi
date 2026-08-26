import type { Question } from "@/content/schema";
import { correctAnswerLabel, type Answer } from "@/lib/grading";
import { RichText } from "./RichText";

type QuestionCardProps = {
  question: Question;
  number: number;
  answer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
  locked?: boolean;
  result?: boolean;
  showFeedback?: boolean;
};

const letters = "abcdef";

export function QuestionCard({
  question,
  number,
  answer,
  onAnswer,
  locked = false,
  result,
  showFeedback = false
}: QuestionCardProps) {
  const selected = Array.isArray(answer) ? answer : [];

  function toggleOption(index: number) {
    const next = selected.includes(index)
      ? selected.filter((value) => value !== index)
      : [...selected, index].sort((a, b) => a - b);
    onAnswer(next);
  }

  return (
    <article className={`question-card ${showFeedback ? (result ? "is-correct" : "is-wrong") : ""}`}>
      <div className="question-meta">
        <span className="question-number">{String(number).padStart(2, "0")}</span>
        <div className="tag-list" aria-label="Oblasti pitanja">
          {question.tags.slice(0, 4).map((tag) => (
            <span className="tag" key={tag}>{tag.replaceAll("-", " ")}</span>
          ))}
        </div>
      </div>

      <RichText html={question.prompt} className="question-prompt rich-text" />

      {question.type === "choice" ? (
        <div className="options">
          {question.options.map((option, index) => (
            <label className="option" key={index}>
              <input
                type="checkbox"
                checked={selected.includes(index)}
                disabled={locked}
                onChange={() => toggleOption(index)}
              />
              <span className="option-letter">{letters[index]}</span>
              <RichText html={option} className="option-text rich-text" />
            </label>
          ))}
        </div>
      ) : (
        <input
          className="short-answer"
          type="text"
          value={typeof answer === "string" ? answer : ""}
          disabled={locked}
          onChange={(event) => onAnswer(event.target.value)}
          placeholder="Upiši rezultat"
          autoComplete="off"
          spellCheck={false}
          aria-label={`Odgovor na pitanje ${number}`}
        />
      )}

      {showFeedback && (
        <div className="feedback" role="status">
          <strong>{result ? "Tačno" : `Netačno · Tačan odgovor: ${correctAnswerLabel(question)}`}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </article>
  );
}
