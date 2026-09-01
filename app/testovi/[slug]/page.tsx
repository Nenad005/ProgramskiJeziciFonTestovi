import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTest, getTestQuestions, lessons, tests } from "@/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tests.map((test) => ({ slug: test.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const test = getTest((await params).slug);
  return { title: test?.title ?? "Test" };
}

export default async function TestOverviewPage({ params }: PageProps) {
  const test = getTest((await params).slug);
  if (!test) notFound();
  const questions = getTestQuestions(test.slug);
  const lesson = lessons.find((item) => item.id === test.lessonIds[0]);
  const tagCount = new Set(questions.flatMap((question) => question.tags)).size;

  return (
    <main className="shell page-main">
      <div className="test-intro">
        <div>
          <Link className="back-link" href="/testovi">← Svi testovi</Link>
          <span className="eyebrow">Pripremni test</span>
          <h1>{test.title}</h1>
          <p>{lesson?.description}</p>
          <Link className="button button-large" href={`/testovi/${test.slug}/radi`}>Započni ili nastavi</Link>
        </div>
        <div className="test-facts">
          <div><strong>{questions.length}</strong><span>pitanja</span></div>
          <div><strong>{tagCount}</strong><span>oblasti</span></div>
          <div><strong>1</strong><span>poen po pitanju</span></div>
        </div>
      </div>
      <section className="instruction-panel">
        <h2>Kako test radi</h2>
        <p>Pitanja mogu imati jedan ili više ponuđenih odgovora ili zahtevati tačan ispis, ishod ili kratak pojam. Stari rokovi prate sadržaj i redosled dostupnog izvora.</p>
        <p>Test se ocenjuje tek kada ga predaš. Posle predaje videćeš objašnjenje uz svako pitanje, a pogrešni odgovori ulaze u pametno ponavljanje.</p>
      </section>
    </main>
  );
}
