function oldExamQuestionIds(date: string, numbers: number[]) {
  return numbers.map((number) => `stari-rok-${date}-q${String(number).padStart(2, "0")}`);
}

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
  },
  {
    id: "stari-rokovi",
    title: "Stari rokovi",
    description: "Kurirana pitanja sa starih rokova, sa ispravljenim tekstom i proverenim rešenjima."
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
  },
  {
    id: "stari-rok-2022-07",
    slug: "stari-rok-2022-07",
    title: "Julski rok 2022",
    description: "Kurirani izbor pouzdanih pitanja sa roka iz jula 2022.",
    lessonIds: ["stari-rokovi"],
    questionIds: oldExamQuestionIds("2022-07", [
      1, 2, 4, 5, 6, 8, 10, 11, 12, 13, 15, 16, 17, 19, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40
    ])
  },
  {
    id: "stari-rok-2023-04",
    slug: "stari-rok-2023-04",
    title: "Aprilski rok 2023",
    description: "Kurirani izbor pouzdanih pitanja sa roka iz aprila 2023.",
    lessonIds: ["stari-rokovi"],
    questionIds: oldExamQuestionIds("2023-04", [
      1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23,
      24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
    ])
  },
  {
    id: "stari-rok-2023-06",
    slug: "stari-rok-2023-06",
    title: "Junski rok 2023",
    description: "Kurirani izbor pouzdanih pitanja sa roka iz juna 2023.",
    lessonIds: ["stari-rokovi"],
    questionIds: oldExamQuestionIds("2023-06", [
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 16, 17, 18, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
    ])
  }
] as const;
