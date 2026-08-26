export const lessons = [
  {
    id: "csharp-osnove",
    title: "C# osnove",
    description: "Tipovi, konverzije, kolekcije, izuzeci, LINQ i ponašanje programa."
  },
  {
    id: "objektni-model",
    title: "Objektni model",
    description: "Dostupnost, nasleđivanje, konstruktori, polimorfizam i generici."
  }
] as const;

export const tests = [
  {
    id: "csharp-osnove-1",
    slug: "csharp-osnove",
    title: "C# osnove",
    description: "Kompletan pripremni test iz prve lekcije.",
    lessonIds: ["csharp-osnove"],
    questionIds: Array.from({ length: 40 }, (_, index) =>
      `csharp-osnove-q${String(index + 1).padStart(2, "0")}`
    )
  },
  {
    id: "objektni-model-1",
    slug: "objektni-model",
    title: "Objektni model",
    description: "Kompletan pripremni test iz druge lekcije.",
    lessonIds: ["objektni-model"],
    questionIds: Array.from({ length: 40 }, (_, index) =>
      `objektni-model-q${String(index + 1).padStart(2, "0")}`
    )
  }
] as const;
