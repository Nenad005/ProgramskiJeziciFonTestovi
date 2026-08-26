import fs from "node:fs";
import vm from "node:vm";

const sources = [
  {
    file: "../testovi/1-csharp-osnove.html",
    lessonId: "csharp-osnove",
    testId: "csharp-osnove-1"
  },
  {
    file: "../testovi/2-objektni-model.html",
    lessonId: "objektni-model",
    testId: "objektni-model-1"
  }
];

const tagRules = [
  ["accessibility", /access|dostup|privatn|\bprotected\b|\binternal\b|assembly|namespace/i],
  ["inheritance", /nasle|izveden|bazn|\bbase\b|upcast|downcast/i],
  ["virtual-dispatch", /virtual|override|stvarni tip|dispatch/i],
  ["method-hiding", /skriven|\bnew\s+(?:string|void|int|virtual)|statički tip/i],
  ["constructors", /konstruktor|constructor|\bbase\s*\(|\bthis\s*\(|initializer/i],
  ["static-initialization", /statičk.*konstruktor|static constructor|statičko polje|initializer/i],
  ["interfaces", /interfejs|interface/i],
  ["abstract-classes", /apstrakt|abstract/i],
  ["partial-classes", /partial/i],
  ["generics", /generič|<T>|where T|List&lt;|IEnumerable&lt;/i],
  ["casting", /cast|konverzij|\sas\s|\bis\s|boxing|unboxing/i],
  ["numeric-types", /byte|short|long|double|float|decimal|overflow|checked|unchecked/i],
  ["collections", /niz|array|List&lt;|Dictionary&lt;|HashSet&lt;|Stack&lt;|Queue&lt;/i],
  ["linq", /LINQ|\.Where|\.Select|\.Count|\.Any|\.First|\.OrderBy/i],
  ["delegates", /delegat|delegate|Action&lt;|Func&lt;/i],
  ["lambdas", /lambda|anonimn/i],
  ["exceptions", /Exception|izuzetak|\bthrow\b|try|catch|finally/i],
  ["strings", /string operacij|string objekt|StringBuilder|ReferenceEquals|nepromenljiv.*string/i],
  ["nullable", /nullable|(?:int|long|byte|double|bool|object|string)\?|\bnull\b|GetValueOrDefault/i],
  ["value-vs-reference", /struct|vrednos|referent|kopij|ReferenceEquals/i],
  ["overload-resolution", /overload|preoptere|potpis metode|podrazumevan.*paramet/i],
  ["properties-indexers", /propert|svojstv|indekser|this\[/i],
  ["program-output", /ispis|Console\.Write/i],
  ["compile-time", /kompajl|compile|grešk.*prevođen/i],
  ["runtime", /izvršav|runtime/i]
];

function extractArray(source) {
  const marker = "const questions = [";
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error("Questions array not found");

  const start = source.indexOf("[", markerIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index++) {
    const char = source[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote && char === "\\") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "[") depth++;
    if (char === "]") {
      depth--;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error("Questions array is not closed");
}

function tagsFor(question) {
  const searchable = [
    question.prompt,
    ...(question.options ?? []),
    question.explanation
  ].join(" ");
  const tags = tagRules
    .filter(([, pattern]) => pattern.test(searchable))
    .map(([tag]) => tag);
  return [...new Set(tags.length ? tags : ["language-fundamentals"])];
}

const questions = sources.flatMap((source) => {
  const html = fs.readFileSync(source.file, "utf8");
  const sourceQuestions = vm.runInNewContext(`(${extractArray(html)})`);
  return sourceQuestions.map((question) => ({
    ...question,
    id: `${source.lessonId}-q${String(question.id).padStart(2, "0")}`,
    originalNumber: question.id,
    lessonId: source.lessonId,
    sourceTestId: source.testId,
    tags: tagsFor(question)
  }));
});

fs.writeFileSync(
  "content/questions.generated.json",
  `${JSON.stringify(questions, null, 2)}\n`,
  "utf8"
);

console.log(`Extracted ${questions.length} questions.`);
