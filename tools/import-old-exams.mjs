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
    exclusions: [3, 7, 9, 14, 18, 20, 34],
    correct: {
      1: [4], 2: [0, 4], 4: [0, 2, 3], 5: [1, 2, 3], 6: [3], 8: [1, 3], 10: [1],
      11: [0], 12: [1, 2, 3], 13: [0, 1], 15: [0, 2, 3, 4, 5], 16: [1, 2, 4, 5],
      17: [2, 3, 4], 19: [0, 1, 3, 4, 5], 21: [0, 2, 3, 4, 5], 22: [1, 3, 4],
      23: [2, 5], 24: [0, 1], 25: [4, 5], 26: [0, 1, 5], 27: [2], 28: [3],
      29: [0, 2, 3], 30: [3]
    },
    short: {
      31: "0:58", 32: "6", 33: "200", 35: "303211", 36: "725", 37: "21:10",
      38: "2567", 39: "6", 40: "17"
    },
    overrides: {
      2: {
        promptMarkdown: "Najvažnije karakteristike apstraktnog tipa podataka su:",
        explanation: "Skrivanje informacija i enkapsulacija odvajaju specifikaciju tipa od njegove reprezentacije i implementacije."
      },
      5: {
        promptMarkdown: "Koji od navedenih predstavljaju izraze u C#?",
        options: ["<code>(x &gt; 0) ? x</code>", "<code>100</code>", "<code>x ?? y</code>", "<code>(x &gt; 0) ? x : 0</code>", "Nijedan"],
        explanation: "Literal, operator ?? i potpuni uslovni operator jesu izrazi; uslovnom operatoru su potrebne obe grane."
      },
      8: {
        promptMarkdown: "Koje koncepte podržava programski jezik ML?",
        options: ["Dodeljivanje", "Primena funkcije", "Unifikacija", "Promenljive"],
        explanation: "ML neposredno podržava primenu funkcija i promenljive."
      },
      13: {
        promptMarkdown: "Koje su od navedenih karakteristike LR parsera?",
        options: ["Ulazni niz tokena procesira se sleva na desno", "Koristi postupak redukcije koji je inverzan postupku desne derivacije", "Podrazumeva samo S-atributske gramatike", "Gradi parsno stablo od korena prema listovima"],
        explanation: "LR parser čita ulaz sleva nadesno i konstruiše obrnutu desnu derivaciju redukcijama."
      },
      16: {
        promptMarkdown: "Koji tip bi se mogao navesti prilikom instanciranja klase `Skup`?\n\n```csharp\nclass Skup<NekiTip> where NekiTip : struct\n{\n    List<NekiTip> elementi = new List<NekiTip>();\n}\n```",
        explanation: "Ograničenje struct prihvata enum Tip, strukturu Paket i ugrađene vrednosne tipove bool i char."
      },
      17: {
        promptMarkdown: "Koje naredbe NIJE ispravno napisati u nastavku metode `Main`?\n\n```csharp\n// Prvi assembly, namespace N1\npublic class X\n{\n    protected internal int a;\n    private protected int b;\n    void Metoda() { }\n}\n\n// Drugi assembly, referencira prvi\nusing N1;\nnamespace N2 { public class Y : X { int c; } }\n\n// Treci assembly, referencira prvi i drugi\nusing N1;\nusing N2;\nclass Z : Y\n{\n    static void Main()\n    {\n        Z z = new Z();\n    }\n}\n```",
        options: ["<code>Y y = new Y();</code>", "<code>X x = new Z();</code>", "<code>z.Metoda();</code>", "<code>Console.Write(z.b);</code>", "<code>Console.Write(z.c);</code>"],
        explanation: "Privatna metoda, private protected clan iz drugog assembly-ja i privatno polje c klase Y nisu dostupni u klasi Z."
      },
      22: {
        promptMarkdown: "Koje su od navedenih klasa ispravno definisane?\n\n```csharp\nclass X { int x; public X(int i) { x = i; } }\nclass B { int b; public B() { b = 5; } }\n```",
        options: ["<code>class A : X { int a; }</code>", "<code>class B1 { int b; public B1() : base() { b = 5; } }</code>", "<code>class C : B { int c; public C() { b = 5; } }</code>", "<code>class D : B { int d; public D(int y) { d = y; } }</code>", "<code>class E : D { int e; public E(int z) : base(z) { e = z; } }</code>"],
        explanation: "B1 koristi implicitni object konstruktor, D poziva dostupni B(), a E prosleđuje argument konstruktoru klase D."
      },
      24: {
        promptMarkdown: "Koje su od navedenih naredbi ispravne?\n\n```csharp\ninterface A { void M(); }\nabstract class B : A { public abstract void M(); }\nclass C : B { public override void M() { } }\nclass D : C { }\n```",
        explanation: "C je konkretna implementacija interfejsa, D je izvedena iz C, pa su prve dve konverzije dozvoljene."
      },
      25: {
        options: ["<code>partial class K { public K() : base() }</code>", "<code>partial class K { string broj; }</code>", "<code>partial class K { static int M() =&gt; 0; }</code>", "<code>partial class K { byte M() { return 1; } }</code>", "<code>public partial class K { public int M(int x = 0) { broj = x; return 0; } }</code>", "<code>partial class K { void M1(int broj) { broj += broj; } }</code>"],
        explanation: "Preopterećenje M sa parametrom i nova metoda M1 ne sukobljavaju se sa postojećim članovima parcijalne klase."
      },
      26: {
        promptMarkdown: "Koje metode se NE mogu pridružiti delegatu u metodi `Main`?\n\n```csharp\npublic delegate int Delegat(int a, short b);\npublic class Klasa\n{\n    public int A(ref int a, short b) => a + b;\n    private int B(int a, short b) => a + b;\n    public static int C(int a, short b) => a + b;\n}\npublic class Program : Klasa\n{\n    public int D(int a, short b) => a + b;\n    public static int E(int a, short b) => a + b;\n    public int F(short b, int a) => a + b;\n    public static void Main()\n    {\n        Program p = new Program();\n        Delegat dg;\n    }\n}\n```",
        options: ["<code>p.A</code>", "<code>p.B</code>", "<code>Klasa.C</code>", "<code>p.D</code>", "<code>E</code>", "<code>p.F</code>"],
        explanation: "A ima ref parametar, B nije dostupna, a F ima obrnut redosled tipova parametara."
      },
      28: {
        promptMarkdown: "Šta se ispisuje na ekranu?\n\n```csharp\nclass A { public virtual void M1() => Console.Write(1); }\nclass B : A { public override void M1() => Console.Write(2); }\nclass C : B { }\n\nList<A> lista = new List<A> { new A(), new C(), new B() };\nforeach (A x in lista) x.M1();\n```",
        explanation: "Virtuelni poziv koristi implementaciju runtime tipa: A ispisuje 1, a C i B nasleđuju B.M1 i ispisuju 2."
      },
      29: {
        options: ["<code>int a = lista.Count(x =&gt; x % 2 == 0);</code>", "<code>int b = lista.Select(x =&gt; x % 2 == 0).Count();</code>", "<code>int c = lista.Where(x =&gt; x % 2 == 0).Count();</code>", "<code>int d = lista.FindAll(x =&gt; x % 2 == 0).Count;</code>", "<code>int e = lista.All(x =&gt; x % 2 == 0).Count();</code>", "<code>int f = lista.Any(x =&gt; x % 2 == 0).Count();</code>"],
        explanation: "Count sa predikatom, Where pa Count i svojstvo Count rezultata metode FindAll daju broj parnih elemenata."
      },
      30: {
        promptMarkdown: "Koju od navedenih metoda je moguće pridružiti promenljivoj tipa `Func<bool, int>`?",
        explanation: "Func<bool, int> prima jedan bool argument i vraća int, čemu odgovara samo metoda D."
      },
      31: {
        promptMarkdown: "Sta se ispisuje na ekranu?\n\n```csharp\nint[] niz = { 92, 48, 101, 37, 58 };\nvar a = niz\n    .Select(x => new { P = x, O = x / 101 })\n    .Last(x => x.P < 60);\nConsole.Write($\"{a.O}:{a.P}\");\n```",
        explanation: "Poslednji element manji od 60 je 58, a celobrojno deljenje 58 / 101 daje 0."
      },
      33: {
        promptMarkdown: "Koja je vrednost promenljive `b`?\n\n```csharp\nclass Osoba { }\nclass Student : Osoba { }\n\nstatic int M(int x, int y) => x * y;\nstatic int Primeni(int y, Func<int, int> f) => f(y);\nstatic Func<int, int> F1(int z) => x => M(x, z);\nstatic Func<int, int> F2() => x => x * x;\nstatic Func<int, int> Odredi(Osoba o) => o is Student ? F1(20) : F2();\n\nOsoba a = new Student();\nvar b = Primeni(10, Odredi(a));\n```",
        explanation: "Za Student se bira F1(20), pa se racuna 10 * 20."
      },
      35: {
        promptMarkdown: "Sta se ispisuje na ekranu?\n\n```csharp\npublic class A\n{\n    public int[] niz = new int[6];\n    public A() : this(7) { niz[5] = 1; }\n    public A(int i) { niz[4] = 1; }\n}\npublic class B : A { }\npublic class C : B\n{\n    public C() : this(8) { niz[3] = 2; }\n    public C(int i) { niz[2] = i; }\n}\npublic class D : C\n{\n    public D(int i) : this() { niz[2] = i; }\n    public D() { niz[0] = 3; }\n}\nD d = new D(3);\nforeach (int broj in d.niz) Console.Write(broj);\n```",
        explanation: "Redosled konstruktora i naknadno prepisivanje elementa niz[2] daju niz 3,0,3,2,1,1."
      },
      36: {
        promptMarkdown: "Koja je vrednost promenljive `bilans`?\n\n```csharp\npublic delegate void Obrada(double suma);\npublic class Racun\n{\n    double stanje;\n    public Racun(double stanje) { this.stanje = stanje; }\n    public event Obrada Dogadjaj;\n    public void Promeni(double iznos)\n    {\n        if (stanje + iznos < 0) return;\n        stanje += iznos;\n        Dogadjaj?.Invoke(iznos);\n    }\n}\nstatic double bilans = 725;\nstatic void Azuriraj(double i) => bilans += i;\nRacun r1 = new Racun(0);\nRacun r2 = new Racun(0);\nr1.Promeni(100);\nr1.Dogadjaj += Azuriraj;\nr2.Promeni(200);\nr1.Promeni(-175);\nr1.Promeni(-350);\n```",
        explanation: "Uplate nastaju pre pretplate ili na drugom racunu, a obe isplate sa r1 se odbijaju zbog nedovoljnog stanja."
      },
      37: {
        promptMarkdown: "Sta se ispisuje na ekranu?\n\n```csharp\npublic delegate void Del(int a, ref int b);\npublic class K\n{\n    int k = 10;\n    public void A(int e, ref int f) { e += 2; f += 3; k += e; k += f; }\n    public void B(int e, ref int f) { e -= 2; f -= 3; }\n    public void C(int e, ref int f) { e *= 2; f *= 3; }\n    public static void Main()\n    {\n        K x = new K(); K y = new K();\n        Del dg = x.A;\n        for (int i = 7; i >= 1; i--)\n        {\n            if (i % 6 == 0) dg += x.B;\n            if (i % 5 == 0) dg = y.B;\n            if (i % 4 == 0) dg += y.C;\n            if (i % 3 == 0) dg -= x.C;\n            if (i % 2 == 0) dg += x.A;\n        }\n        int a = 2, b = 2;\n        dg(a, ref b);\n        Console.Write($\"{x.k}:{y.k}\");\n    }\n}\n```",
        explanation: "Konacna multicast lista menja x.k na 21, dok nijedna metoda ne menja y.k."
      },
      38: {
        promptMarkdown: "Sta se ispisuje na ekranu?\n\n```csharp\npublic delegate void Operacija(ref int x);\nclass Skup\n{\n    public int[] niz = { 16, 5, 4, 3, 2 };\n    public int this[int pozicija] => niz[1 - pozicija];\n}\nstatic class Prosirenja\n{\n    public static void Mapiraj(this Skup s, Operacija op)\n    {\n        for (int i = 1; i < 4; i++) op(ref s.niz[i]);\n    }\n}\nSkup x = new Skup();\nOperacija o = Smanji; o += Povecaj;\nx.Mapiraj(o);\nfor (int i = -3; i <= 0; i++) Console.Write(x[i]);\n\nstatic void Povecaj(ref int x) { x += 5; }\nstatic void Smanji(ref int x) { x -= 3; }\n```",
        explanation: "Mapiranje neto uvecava srednja tri elementa za 2, a indekser ih cita obrnutim redom."
      },
      39: {
        promptMarkdown: "Sa kojom vrednoscu se unificira `Q` tokom upita `?- put(m, P, Q).`?\n\n```prolog\nautom(m, a, 1.5). autom(m, b, 2). autom(b, c, 4.5).\nvozom(m, d, 5). vozom(b, c, 0.5). vozom(a, d, 6).\navionom(b, f, 4). avionom(c, e, 3.5). avionom(m, e, 5).\n\nput(X, Y, Z) :-\n    autom(X, A, Z1),\n    vozom(A, B, Z2),\n    avionom(B, Y, Z3),\n    Z is Z1 + Z2 + Z3.\n```",
        explanation: "Jedina odgovarajuca putanja ima tezine 2, 0.5 i 3.5, ciji je zbir 6."
      },
      40: {
        promptMarkdown: "Sta je rezultat izvrsavanja sledeceg Haskell koda?\n\n```haskell\nfunkcija [element] = 2\nfunkcija (prvi:drugi:rep)\n    | prvi > drugi  = funkcija (drugi:rep)\n    | prvi <= drugi = prvi + drugi + funkcija rep\n\nfunkcija [4,1,2,5,7,6]\n```",
        explanation: "Primenom guard grana i rekurzije izraz se izracunava na 17."
      }
    }
  },
  {
    date: "2023-04",
    file: "2023-04.md",
    exclusions: [4, 9, 18, 27],
    correct: {
      1: [3], 2: [0, 4], 3: [0, 2, 3], 5: [1, 2, 3], 6: [2, 5], 7: [2, 5],
      8: [0, 2], 10: [1, 2], 11: [1], 12: [0, 1, 2, 3, 4], 13: [1, 2, 4],
      14: [0, 1, 2, 3, 4, 5], 15: [0, 1, 4, 5], 16: [1, 2, 3], 17: [1, 3],
      19: [1, 5], 20: [0, 2, 3, 4, 5], 21: [1, 2, 4], 22: [0, 5], 23: [2, 3],
      24: [3], 25: [0, 1, 2, 3, 5], 26: [0, 1, 3, 4, 5], 28: [2, 3, 5],
      29: [1, 2, 3], 30: [0, 4]
    },
    short: {
      31: "9", 32: "20:0", 33: "60-1360", 34: "63", 35: "4202710", 36: "25",
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
    },
    overrides: {
      13: {
        promptMarkdown: "Koje od navedenih NISU karakteristike LL parsera?",
        options: ["Ulazni niz tokena procesira se sleva na desno", "Koristi postupak redukcije koji je inverzan postupku desne derivacije", "Podržavaju samo S-atributske gramatike", "Grade parsno stablo od korena prema listovima", "Generišu se pomoću alata Bison"],
        explanation: "LL parser čita ulaz sleva nadesno i gradi stablo od korena. Redukcije, ograničenje na S-atributske gramatike i Bison nisu njegove karakteristike."
      },
      15: {
        promptMarkdown: "Koji od navedenih stringova NISU definisani pomocu date gramatike?\n\n```text\nA -> BxCyB\nB -> BD | D\nC -> B | ByB\nD -> a | b | c | d\n```",
        explanation: "Prema produkcijama, stringovi A, B, E i F ne mogu se izvesti iz pocetnog simbola."
      },
      16: {
        options: ["<code>Odgovor?</code>", "<code>Poeni</code>", "<code>bool</code>", "<code>Tip</code>", "<code>string</code>", "<code>Pitanje</code>"],
        explanation: "Poeni, bool i enum Tip su vrednosni tipovi i zadovoljavaju ogranicenje struct."
      },
      26: {
        explanation: "Samo metoda C ima kompatibilne ref parametre, tipove parametara, povratni tip i dostupnu staticku referencu."
      },
      28: {
        promptMarkdown: "Koje koncepte ilustruje definicija `f1`?\n\n```haskell\nf a b c d e f = a - b * c * d * e - f\nf1 = f 1 2\n```",
        explanation: "Parcijalna primena je primena funkcije koja vraća novu funkciju, pa time ilustruje i funkciju višeg reda i funkciju kao rezultat."
      },
      30: {
        promptMarkdown: "Koje od navedenih su ispravne naredbe?\n\n```csharp\nstatic bool M1(int x) => x % 2 == 0;\n```",
        options: ["<code>Predicate&lt;int&gt; A = M1;</code>", "<code>Predicate&lt;int, bool&gt; B = M1;</code>", "<code>Action&lt;bool, int&gt; C = M1;</code>", "<code>Func&lt;bool, int&gt; E = M1;</code>", "<code>Func&lt;int, bool&gt; F = M1;</code>"],
        explanation: "Predicate<int> i Func<int, bool> imaju isti potpis kao M1."
      },
      32: {
        promptMarkdown: "Sta se ispisuje na ekranu?\n\n```csharp\nint[] niz = { 92, 48, 101, 37, 210, 58 };\nvar a = niz\n    .Select((x, i) => new { P = i / 3, O = x / 5 })\n    .Last(x => x.P < 0.5);\nConsole.Write($\"{a.O}:{a.P}\");\n```",
        explanation: "Zbog celobrojnog deljenja P je 0 za prva tri elementa; poslednji takav element daje O = 101 / 5 = 20."
      }
    }
  },
  {
    date: "2023-06",
    file: "2023-06.md",
    exclusions: [8, 14, 15],
    correct: {
      1: [1, 3], 2: [3], 3: [2], 4: [1, 3], 5: [2], 6: [3, 5], 7: [2], 9: [1],
      10: [0, 1], 11: [0], 12: [0, 1, 3, 4], 13: [0, 2, 4], 16: [1, 4, 5],
      17: [1, 2, 4], 18: [0, 1, 2, 4, 5], 20: [1, 2, 3, 4, 5], 21: [0, 2, 3, 4],
      22: [0, 5], 23: [2, 3], 24: [2], 25: [0, 1, 2, 5], 26: [0, 1, 3, 4, 5],
      27: [0, 3, 5], 28: [3], 29: [0, 2, 3], 30: [1, 3]
    },
    short: {
      31: "13", 32: "3", 33: "277", 34: "60", 35: "91366", 36: "550",
      37: "-1", 38: "1010", 39: "7, 7.5", 40: "12"
    },
    overrides: {
      6: {
        promptMarkdown: "Koje koncepte podržava pi-calculus?",
        explanation: "Pi-calculus modeluje razmenu poruka preko kanala i promenljiva imena kanala."
      },
      11: {
        options: ["Ulazni niz tokena procesira se sdesna na levo", "Koriste se nasledjeni atributi", "Grade parsno stablo od korena prema listovima"],
        explanation: "LL parser cita tokene sleva nadesno i gradi stablo od korena, pa je samo prvo tvrdjenje netacno."
      },
      17: {
        promptMarkdown: "Koje naredbe NE bi bilo ispravno napisati u nastavku metode `Main`?\n\n```csharp\n// Prvi assembly\nnamespace N1\n{\n    public class X\n    {\n        int a;\n        private protected int b;\n        public void Metoda() { }\n    }\n}\n\n// Drugi assembly, referencira prvi\nusing N1;\nnamespace N2\n{\n    public class Y : X\n    {\n        protected int c;\n        internal int d => c;\n    }\n}\n\n// Treci assembly, referencira prvi i drugi\nusing N1;\nusing N2;\nclass Z : Y\n{\n    static void Main()\n    {\n        Z z = new Z();\n    }\n}\n```",
        explanation: "Privatno a, private protected b i internal d nisu dostupni iz treceg assembly-ja; javna metoda i protected c jesu dostupni u izvedenoj klasi."
      },
      18: {
        promptMarkdown: "Iz kojih klasa bi se moglo pristupiti polju `broj`?\n\n```csharp\n// Prvi assembly\nnamespace N1\n{\n    public class F { protected internal int broj; }\n    public class E : F { }\n}\n\n// Drugi assembly, referencira prvi\nusing N1;\nnamespace N2\n{\n    public class D { }\n    public class C : E { }\n}\n\n// Treci assembly, referencira prva dva\nusing N1;\nusing N2;\nnamespace N3\n{\n    class B : E { }\n    class A : C { }\n}\n```",
        options: ["A", "B", "C", "D", "E", "F"],
        explanation: "Protected internal je dostupan u assembly-ju deklaracije i svim izvedenim klasama; samo D nije izvedena iz F."
      },
      16: {
        options: ["<code>Odgovor?</code>", "<code>object</code>", "<code>bool</code>", "<code>Tip</code>", "<code>string</code>", "<code>Pitanje</code>"],
        explanation: "Ograničenje class prihvata referentne tipove object, string i Pitanje."
      },
      21: {
        explanation: "A nema poziv dostupnog konstruktora X(int), a C, D i E posredno nasledjuju istu gresku ili koriste nedostupan clan."
      },
      22: {
        explanation: "A navodi interfejs I ali ne obezbedjuje implementaciju Metoda, dok F ne moze naslediti sealed klasu E."
      },
      24: {
        promptMarkdown: "Sta se ispisuje na ekranu?\n\n```csharp\npublic static int M(int x)\n{\n    int y;\n    F();\n    return ++y;\n    void F()\n    {\n        var a = new { P = 2, O = x + 2 };\n        y = a.O - a.P;\n    }\n}\nConsole.WriteLine(M(2));\n```",
        explanation: "Anonimni objekat ima O=4 i P=2, lokalna funkcija postavlja y na 2, a prefiksni inkrement vraca 3."
      },
      26: {
        promptMarkdown: "Koje metode se NE mogu pridružiti delegatu u metodi `Main`?\n\n```csharp\npublic delegate int Delegat(ref int a, int b);\npublic class Klasa\n{\n    public int A(out int a, int b) => a = b;\n    protected int B(ref int a, int b) => a + b;\n    public static int C(ref int a, int b) => a + b;\n}\npublic class Program : Klasa\n{\n    public int D(ref int a, short b) => a + b;\n    public static int E(in int a, int b) => a + b;\n    public int F(short b, ref int a) => a + b;\n    public static void Main()\n    {\n        Program p = new Program();\n        Delegat dg;\n    }\n}\n```",
        options: ["<code>A</code>", "<code>B</code>", "<code>C</code>", "<code>p.D</code>", "<code>Klasa.E</code>", "<code>p.F</code>"],
        explanation: "Samo C ima odgovarajuci potpis i dostupnu metodu; ostale reference imaju ref/out/in, tipove, dostupnost ili redosled parametara koji ne odgovaraju delegatu."
      },
      27: {
        options: ["a", "b", "c", "m", "e", "f"],
        explanation: "Rezultati upita koji se nalaze medju ponudjenim odgovorima jesu a, m i f."
      },
      29: {
        promptMarkdown: "Koji od navedenih izraza vraca broj parnih brojeva u listi brojeva?",
        options: ["<code>lista.Count(x =&gt; x % 2 == 0)</code>", "<code>lista.Select(x =&gt; x % 2 == 0).Count()</code>", "<code>lista.Where(x =&gt; x % 2 == 0).Count()</code>", "<code>lista.FindAll(x =&gt; x % 2 == 0).Count</code>", "<code>lista.All(x =&gt; x % 2 == 0).Count()</code>", "<code>lista.Any(x =&gt; x % 2 == 0).Count()</code>"],
        explanation: "Count sa predikatom, Where pa Count i Count svojstvo rezultata FindAll daju broj parnih elemenata."
      },
      35: {
        promptMarkdown: "Sta se ispisuje na ekranu?\n\n```csharp\npublic class A\n{\n    public List<int> lista = new List<int>();\n    public A() : this(7) { lista.Add(1); }\n    public A(int i) { lista.Add(i + 2); }\n}\npublic class B : A { }\npublic class C : B\n{\n    public C() { lista.Add(3); }\n    public C(int i) : this() { lista.Add(i + 4); }\n}\npublic class D : C\n{\n    public D(int i) : base() { lista.Add(i + 5); }\n    public D() : this(1) { lista.Add(6); }\n}\nD d = new D();\nforeach (int broj in d.lista) Console.Write(broj);\n```",
        explanation: "Konstruktori redom dodaju 9, 1, 3, 6 i 6."
      },
      40: {
        promptMarkdown: "Sta je rezultat izvrsavanja sledeceg Haskell koda?\n\n```haskell\nraspon n = n : raspon (n - 2)\nf a b c = a + b * c\nf1 = f 2 3\n\nfunkcija [element] = 1\nfunkcija (prvi:drugi:rep)\n    | drugi >= 0 = funkcija (drugi:rep) + f1 prvi\n    | drugi < 0  = 1\n\nfunkcija (raspon 3)\n```",
        explanation: "Lista pocinje sa 3, 1, -1; unutrasnji poziv vraca 1, a f1 3 daje 11, ukupno 12."
      }
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
      if (!/^\s*\.{3,}\s*$/.test(line)) code.push(line);
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
  const exclusions = new Set(exam.exclusions ?? []);

  return chunks.flatMap((match) => {
    const originalNumber = Number(match[1]);
    if (exclusions.has(originalNumber)) return [];

    const section = match[2];
    const override = exam.overrides?.[originalNumber] ?? {};
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

    const offeredOptions = override.options ?? exam.specialOptions?.[originalNumber] ?? options;
    const correct = override.correct ?? exam.correct[originalNumber];
    const displayAnswer = override.displayAnswer ?? exam.short[originalNumber];
    const idPrefix = `stari-rok-${exam.date}`;
    let prompt = override.promptHtml
      ?? (override.promptMarkdown ? markdownToHtml(override.promptMarkdown) : markdownToHtml(promptLines.join("\n")));

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
      explanation: override.explanation ?? plainMarkdown(annotation)
    };

    if (correct) {
      if (offeredOptions.length < 2) throw new Error(`${exam.date} Q${originalNumber}: nedostaju opcije`);
      return [{ ...base, type: "choice", options: offeredOptions, correct }];
    }

    if (offeredOptions.length >= 2) {
      throw new Error(`${exam.date} Q${originalNumber}: pitanje sa ponudjenim odgovorima ne sme biti short`);
    }
    if (!displayAnswer) throw new Error(`${exam.date} Q${originalNumber}: nema pouzdanog tipa/rešenja`);
    return [{ ...base, type: "short", answers: answerVariants(displayAnswer), displayAnswer }];
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
