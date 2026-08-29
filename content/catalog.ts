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
  },
  {
    id: "delegati-i-funkcije",
    title: "Delegati i funkcije",
    description: "Delegati, event-i, lambda izrazi, closure-i i lokalne funkcije."
  },
  {
    id: "linq-i-biblioteka",
    title: "LINQ i biblioteka",
    description: "LINQ operatori, indexer-i, extension metode, ref parametri i izuzeci."
  },
  {
    id: "teorija-kompajlera",
    title: "Teorija kompajlera",
    description: "Faze kompajliranja, formalni jezici, međukod, optimizacija i izvršavanje programa."
  },
  {
    id: "apstraktni-tipovi-i-enkapsulacija",
    title: "Apstraktni tipovi i enkapsulacija",
    description: "ADT, ugovori, skrivanje informacija i enkapsulacija u različitim jezicima."
  },
  {
    id: "drugi-jezici",
    title: "Drugi jezici",
    description: "C++, Java, Ada, Lisp, ML, Prolog, Haskell i pi-calculus."
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
  },
  {
    id: "delegati-i-funkcije-1",
    slug: "delegati-i-funkcije",
    title: "Delegati i funkcije",
    description: "Kompletan pripremni test iz treće lekcije.",
    lessonIds: ["delegati-i-funkcije"],
    questionIds: Array.from({ length: 40 }, (_, index) =>
      `delegati-i-funkcije-q${String(index + 1).padStart(2, "0")}`
    )
  },
  {
    id: "linq-i-biblioteka-1",
    slug: "linq-i-biblioteka",
    title: "LINQ i biblioteka",
    description: "Kompletan pripremni test iz četvrte lekcije.",
    lessonIds: ["linq-i-biblioteka"],
    questionIds: Array.from({ length: 40 }, (_, index) =>
      `linq-i-biblioteka-q${String(index + 1).padStart(2, "0")}`
    )
  },
  {
    id: "teorija-kompajlera-1",
    slug: "teorija-kompajlera",
    title: "Teorija kompajlera",
    description: "Kompletan pripremni test iz pete lekcije.",
    lessonIds: ["teorija-kompajlera"],
    questionIds: Array.from({ length: 40 }, (_, index) =>
      `teorija-kompajlera-q${String(index + 1).padStart(2, "0")}`
    )
  },
  {
    id: "apstraktni-tipovi-i-enkapsulacija-1",
    slug: "apstraktni-tipovi-i-enkapsulacija",
    title: "Apstraktni tipovi i enkapsulacija",
    description: "Kompletan pripremni test iz šeste lekcije.",
    lessonIds: ["apstraktni-tipovi-i-enkapsulacija"],
    questionIds: Array.from({ length: 40 }, (_, index) =>
      `apstraktni-tipovi-i-enkapsulacija-q${String(index + 1).padStart(2, "0")}`
    )
  },
  {
    id: "drugi-jezici-1",
    slug: "drugi-jezici",
    title: "Drugi jezici",
    description: "Kompletan pripremni test iz sedme lekcije.",
    lessonIds: ["drugi-jezici"],
    questionIds: Array.from({ length: 40 }, (_, index) =>
      `drugi-jezici-q${String(index + 1).padStart(2, "0")}`
    )
  }
] as const;
