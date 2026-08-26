import type { Metadata } from "next";
import Link from "next/link";
import { lessons, tests } from "@/content";

export const metadata: Metadata = { title: "Testovi" };

export default function TestsPage() {
  return (
    <main className="shell page-main">
      <div className="page-heading">
        <span className="eyebrow">Biblioteka znanja</span>
        <h1>Izaberi oblast</h1>
        <p>Svaki test ima 40 pitanja i čuva nedovršene odgovore na ovom uređaju.</p>
      </div>
      <div className="catalog-list">
        {tests.map((test, index) => {
          const lesson = lessons.find((item) => item.id === test.lessonIds[0]);
          return (
            <article className="catalog-item" key={test.id}>
              <span className="catalog-number">{String(index + 1).padStart(2, "0")}</span>
              <div><span className="eyebrow">Lekcija {index + 1}</span><h2>{test.title}</h2><p>{lesson?.description}</p></div>
              <div className="catalog-meta"><strong>{test.questionIds.length}</strong><span>pitanja</span></div>
              <Link className="button" href={`/testovi/${test.slug}`}>Otvori test</Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
