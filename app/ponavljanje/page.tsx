import type { Metadata } from "next";
import { ReviewRunner } from "@/components/ReviewRunner";

export const metadata: Metadata = { title: "Ponavljanje" };

export default function ReviewPage() {
  return (
    <main className="quiz-shell page-main">
      <div className="page-heading compact-heading">
        <span className="eyebrow">Pametni red</span>
        <h1>Za ponavljanje</h1>
        <p>Pitanja koja grešiš vraćaju se češće. Stabilno znanje dobija sve duži razmak.</p>
      </div>
      <ReviewRunner />
    </main>
  );
}
