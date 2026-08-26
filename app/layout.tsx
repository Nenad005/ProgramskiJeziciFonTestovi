import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "PJ Testovi", template: "%s · PJ Testovi" },
  description: "Testovi i pametno ponavljanje za predmet Programski jezici."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr">
      <body>
        <header className="site-header">
          <Link className="brand" href="/"><span>PJ</span> testovi</Link>
          <nav aria-label="Glavna navigacija">
            <Link href="/testovi">Testovi</Link>
            <Link href="/ponavljanje">Ponavljanje</Link>
            <Link href="/napredak">Napredak</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>PJ Testovi</span>
          <p>Napredak se čuva samo u ovom pregledaču.</p>
        </footer>
      </body>
    </html>
  );
}
