import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/ProgressDashboard";

export const metadata: Metadata = { title: "Napredak" };

export default function ProgressPage() {
  return (
    <main className="shell page-main">
      <div className="page-heading compact-heading">
        <span className="eyebrow">Lokalna statistika</span>
        <h1>Tvoj napredak</h1>
        <p>Pregled svih pokušaja i oblasti kojima treba posvetiti više pažnje.</p>
      </div>
      <ProgressDashboard />
    </main>
  );
}
