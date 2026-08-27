import Link from "next/link";
import { DashboardSummary } from "@/components/DashboardSummary";
import { lessons, questions, tests } from "@/content";

export default function HomePage() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <span className="eyebrow">Programski jezici · priprema ispita</span>
          <h1>Ne pamti odgovore.<br /><em>Prepoznaj obrazac.</em></h1>
          <p>Radi testove po lekcijama, prati slabe oblasti i vrati se pitanjima baš kada treba da ih ponoviš.</p>
          <div className="hero-actions">
            <Link className="button" href="/testovi">Izaberi test</Link>
            <Link className="text-link" href="/ponavljanje">Otvori ponavljanje →</Link>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span>{questions.length}</span>
          <small>pitanja u banci</small>
        </div>
      </section>

      <div className="shell"><DashboardSummary /></div>

      <section className="shell section">
        <div className="section-heading">
          <div><span className="eyebrow">Biblioteka</span><h2>Testovi po lekcijama</h2></div>
          <Link href="/testovi">Svi testovi →</Link>
        </div>
        <div className="test-grid">
          {tests.map((test, index) => {
            const lesson = lessons.find((item) => item.id === test.lessonIds[0]);
            return (
              <Link className="test-card" href={`/testovi/${test.slug}`} key={test.id}>
                <span className="card-index">0{index + 1}</span>
                <div>
                  <span className="eyebrow">{test.questionIds.length} pitanja</span>
                  <h3>{test.title}</h3>
                  <p>{lesson?.description}</p>
                </div>
                <span className="card-arrow">↗</span>
              </Link>
            );
          })}
          <div className="test-card future-card">
            <span className="card-index">+</span>
            <div><span className="eyebrow">Spremno za proširenje</span><h3>Sledeća lekcija</h3><p>Novi test se dodaje kao sadržaj, bez nove kviz logike.</p></div>
          </div>
        </div>
      </section>

      <section className="method-band">
        <div className="shell method-grid">
          <div><span>01</span><h3>Uradi test</h3><p>Odgovori se automatski čuvaju dok radiš.</p></div>
          <div><span>02</span><h3>Otkrij slabosti</h3><p>Rezultat se razlaže po konkretnim tagovima.</p></div>
          <div><span>03</span><h3>Ponovi pametno</h3><p>Interval raste sa svakim tačnim odgovorom.</p></div>
        </div>
      </section>
    </main>
  );
}
