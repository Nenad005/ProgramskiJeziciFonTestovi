import type { Metadata } from "next";
import { QuestionHistory } from "@/components/QuestionHistory";

export const metadata: Metadata = { title: "Istorija pitanja" };

export default function QuestionHistoryPage() {
  return (
    <main className="shell page-main">
      <div className="page-heading compact-heading">
        <span className="eyebrow">Lična statistika</span>
        <h1>Istorija pitanja</h1>
        <p>Pronađi pitanja koja ti zadaju najviše problema i odmah ih pokušaj ponovo.</p>
      </div>
      <QuestionHistory />
    </main>
  );
}
