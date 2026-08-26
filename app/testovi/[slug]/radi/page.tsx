import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { getTest, getTestQuestions, tests } from "@/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tests.map((test) => ({ slug: test.slug }));
}

export default async function QuizPage({ params }: PageProps) {
  const test = getTest((await params).slug);
  if (!test) notFound();
  return (
    <main className="quiz-shell">
      <QuizRunner testId={test.id} title={test.title} questions={getTestQuestions(test.slug)} />
    </main>
  );
}
