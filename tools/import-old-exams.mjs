import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const transcriptRoot = join(root, "..", "transcripts");
const lessonId = "stari-rokovi";

const exams = [
  {
    date: "2022-07",
    file: "2022-07.md",
    correct: {
      1: [4], 3: [1, 2, 3, 4], 4: [0, 2, 3], 6: [3], 7: [5], 9: [3], 10: [1],
      11: [0], 12: [1, 2, 3], 13: [0, 1], 15: [0, 2, 3, 4, 5], 16: [1, 2, 4, 5],
      17: [0, 2, 3, 4], 19: [0, 1, 3, 4, 5], 20: [3], 21: [0, 2, 3, 4, 5],
      23: [2, 5], 25: [5], 26: [0, 1, 5], 27: [2], 29: [0, 2, 3], 30: [3]
    },
    short: {
      2: "Neodredivo iz izvora", 5: "Neodredivo iz izvora", 8: "Neodredivo iz izvora",
      14: "Neodredivo iz izvora", 18: "Neodredivo iz izvora", 22: "Nijedna ponuđena klasa",
      24: "Nijedna ponuđena naredba", 28: "Greška pri kompilaciji", 31: "Greška pri kompilaciji", 32: "6",
      33: "Greška pri kompilaciji", 34: "Neodredivo iz izvora", 35: "Greška pri kompilaciji",
      36: "Greška pri kompilaciji", 37: "Greška pri kompilaciji", 38: "Greška pri kompilaciji",
      39: "Sintaksna greška", 40: "Greška pri kompilaciji"
    }
  },
  {
    date: "2023-04",
    file: "2023-04.md",
    correct: {
      1: [3], 2: [0, 4], 3: [0, 2, 3], 4: [0, 2], 5: [1, 2, 3], 6: [2, 5],
      7: [2, 5], 8: [0, 2], 9: [2], 10: [1, 2], 11: [1], 12: [0, 1, 2, 3, 4],
      13: [1, 2, 4], 14: [0, 1, 2, 3, 4, 5], 15: [0, 1, 2, 3, 4, 5], 16: [1, 3],
      17: [1, 3], 18: [0, 1, 3], 19: [1, 5], 20: [0, 2, 3, 4, 5], 21: [1, 2, 4],
      22: [0, 5], 23: [2, 3], 24: [3], 25: [0, 1, 2, 3, 5], 26: [0, 1, 2, 3, 4, 5],
      28: [2, 3, 5], 29: [1, 2, 3]
    },
    short: {
      27: "Neodredivo iz izvora", 30: "Nijedna ponuđena naredba", 31: "9",
      32: "Greška pri kompilaciji", 33: "60-1360", 34: "63", 35: "4202710", 36: "25",
      37: "-1", 38: "1632X", 39: "c", 40: "26"
    },
    specialOptions: {
      18: ["A", "B", "C", "D", "E", "F"],
      29: [
        "<code>int a = niz.Max(x =&gt; x % 2 == 0);</code>",
        "<code>int b = niz.Max(x =&gt; (x % 2 == 0) ? x : 0);</code>",
        "<code>int c = niz.Where(x =&gt; x % 2 == 0).Max();</code>",
        "<code>int d = niz.Select(x =&gt; (x % 2 == 0) ? x : 0).Max();</code>",
        "<code>int e = niz.Select(x =&gt; x % 2 == 0).Max();</code>",
        "<code>int f = niz.All(x =&gt; (x % 2 == 0) ? x : 0).Max();</code>"
      ]
    }
  },
  {
    date: "2023-06",
    file: "2023-06.md",
    correct: {
      1: [1, 3], 2: [3], 3: [2], 4: [1, 3], 5: [2], 6: [1, 3, 5], 7: [2],
      9: [1], 10: [0, 1], 11: [0, 2], 12: [0, 1, 3, 4], 13: [0, 2, 4],
      15: [0, 1, 2, 3, 4], 16: [1, 4, 5], 20: [1, 2, 3, 4, 5], 21: [0, 4],
      22: [0, 5], 23: [2, 3], 24: [5], 25: [0, 1, 2, 5], 27: [0, 5], 28: [3], 30: [1, 3]
    },
    short: {
      8: "Neodredivo iz izvora", 14: "Neodredivo iz izvora", 17: "Greška pri kompilaciji",
      18: "Neodredivo iz izvora", 26: "Neodredivo iz izvora", 29: "Nijedan ponuđeni izraz",
      31: "13", 32: "3", 33: "277", 34: "60", 35: "Greška pri kompilaciji", 36: "550",
      37: "-1", 38: "1010", 39: "7, 7.5", 40: "Greška pri kompilaciji"
    }
  }
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value.trim())
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/  $/, "");
}

function plainMarkdown(value) {
  return value.replaceAll("**", "").replaceAll("`", "").trim();
}

function markdownToHtml(markdown) {
  const lines = markdown.trim().split("\n");
  const blocks = [];
  let paragraph = [];
  let code = [];
  let language = "";
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        blocks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        language = line.slice(3).trim();
        inCode = true;
      }
    } else if (inCode) {
      code.push(line);
    } else if (!line.trim()) {
      flushParagraph();
    } else {
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  if (code.length) blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
  return blocks.join("");
}

function parseTranscript(exam) {
  const markdown = readFileSync(join(transcriptRoot, exam.file), "utf8");
  const preamble = markdown.match(/## Shared preamble\n\n([\s\S]*?)(?=\n## Question)/)?.[1] ?? "";
  const chunks = [...markdown.matchAll(/^## Question (\d+)\n([\s\S]*?)(?=^## Question \d+\n|$(?![\s\S]))/gm)];

  return chunks.map((match) => {
    const originalNumber = Number(match[1]);
    const section = match[2];
    const annotation = section.match(/- Correct answer\/result: ([\s\S]*?)\s*$/)?.[1]?.trim()
      ?? "Izvor ne sadrži pouzdano rešenje.";
    const topics = section.match(/^Topics: (.+)$/m)?.[1]
      ?.split(",")
      .map((tag) => tag.trim().toLocaleLowerCase("sr-Latn").replaceAll(/\s+/g, "-"))
      .filter(Boolean) ?? ["stari-rok"];
    const beforeAnnotations = section.split(/^Annotations:/m)[0];
    const bodyLines = beforeAnnotations
      .split("\n")
      .filter((line) => !/^(Topics|Language|Source confidence):/.test(line.trim()));
    const options = [];
    const promptLines = [];
    let inCode = false;

    for (const line of bodyLines) {
      if (line.startsWith("```")) inCode = !inCode;
      const option = !inCode && line.match(/^\s*[A-Fa-f][.)]\s+(.+?)\s*$/);
      if (option) options.push(inlineMarkdown(option[1]));
      else promptLines.push(line);
    }

    const offeredOptions = exam.specialOptions?.[originalNumber] ?? options;
    const correct = exam.correct[originalNumber];
    const displayAnswer = exam.short[originalNumber];
    const idPrefix = `stari-rok-${exam.date}`;
    let prompt = markdownToHtml(promptLines.join("\n"));

    if (originalNumber === 16 && preamble) {
      prompt = `<details><summary>Zajedničke deklaracije sa roka</summary>${markdownToHtml(preamble)}</details>${prompt}`;
    }

    const base = {
      id: `${idPrefix}-q${String(originalNumber).padStart(2, "0")}`,
      originalNumber,
      lessonId,
      sourceTestId: idPrefix,
      tags: [...new Set([...topics, "stari-rok", exam.date])],
      prompt,
      explanation: plainMarkdown(annotation)
    };

    if (correct && originalNumber <= 30) {
      if (offeredOptions.length < 2) throw new Error(`${exam.date} Q${originalNumber}: nedostaju opcije`);
      return { ...base, type: "choice", options: offeredOptions, correct };
    }

    if (!displayAnswer) throw new Error(`${exam.date} Q${originalNumber}: nema pouzdanog tipa/rešenja`);
    if (offeredOptions.length) {
      base.prompt += `<p><strong>Ponuđeni odgovori iz izvora:</strong></p><ol>${offeredOptions.map((option) => `<li>${option}</li>`).join("")}</ol>`;
    }
    const indeterminate = displayAnswer === "Neodredivo iz izvora";
    if (indeterminate && !base.explanation.toLocaleLowerCase("sr-Latn").includes("indeterminate")) {
      base.explanation += " Izvor je nepotpun ili nečitljiv, pa jednoznačno rešenje nije moguće utvrditi bez izmišljanja sadržaja.";
    }
    const answers = indeterminate
      ? [displayAnswer, "neodredivo", "nije moguće odrediti"]
      : answerVariants(displayAnswer);
    return { ...base, type: "short", answers, displayAnswer };
  });
}

function answerVariants(displayAnswer) {
  if (displayAnswer === "Greška pri kompilaciji") return [displayAnswer, "compile error", "compilation error", "kod nije ispravan"];
  if (displayAnswer === "Sintaksna greška") return [displayAnswer, "syntax error", "kod nije ispravan"];
  if (displayAnswer.startsWith("Nijed")) return [displayAnswer, "nijedna", "nijedan", "none"];
  if (displayAnswer === "7, 7.5") return [displayAnswer, "7 i 7.5", "7; 7.5", "7.5, 7"];
  return [displayAnswer];
}

const questions = exams.flatMap(parseTranscript);
writeFileSync(join(root, "content", "old-exams.generated.json"), `${JSON.stringify(questions, null, 2)}\n`);
console.log(`Generated ${questions.length} old-exam questions.`);
