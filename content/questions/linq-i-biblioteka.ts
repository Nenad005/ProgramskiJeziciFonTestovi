import type { Question } from "../schema";

const lessonId = "linq-i-biblioteka";
const sourceTestId = "linq-i-biblioteka-1";

function choice(
  originalNumber: number,
  prompt: string,
  options: string[],
  correct: number[],
  explanation: string,
  tags: string[]
): Question {
  return {
    id: `linq-i-biblioteka-q${String(originalNumber).padStart(2, "0")}`,
    type: "choice",
    originalNumber,
    lessonId,
    sourceTestId,
    tags,
    prompt,
    options,
    correct,
    explanation
  };
}

function short(
  originalNumber: number,
  prompt: string,
  displayAnswer: string,
  answers: string[],
  explanation: string,
  tags: string[]
): Question {
  return {
    id: `linq-i-biblioteka-q${String(originalNumber).padStart(2, "0")}`,
    type: "short",
    originalNumber,
    lessonId,
    sourceTestId,
    tags,
    prompt,
    answers,
    displayAnswer,
    explanation
  };
}

export const linqQuestions: Question[] = [
  choice(
    1,
    "<p>Koja tvrđenja o <code>IEnumerable&lt;T&gt;</code> i <code>List&lt;T&gt;</code> su tačna?</p>",
    [
      "<code>List&lt;T&gt;</code> implementira <code>IEnumerable&lt;T&gt;</code>.",
      "Svaki <code>IEnumerable&lt;T&gt;</code> podržava pristup elementu pomoću indeksa.",
      "<code>IEnumerable&lt;T&gt;</code> opisuje sekvencu koja može da se enumerira.",
      "<code>List&lt;T&gt;</code> ima instance članove kao što su <code>Add</code> i property <code>Count</code>.",
      "Broj elemenata svakog <code>IEnumerable&lt;T&gt;</code> mora biti poznat bez enumeracije."
    ],
    [0, 2, 3],
    "List<T> je konkretna kolekcija koja implementira IEnumerable<T>. Sam IEnumerable<T> garantuje enumeraciju, ali ne i indeksiranje, menjanje ili unapred poznat broj elemenata.",
    ["linq", "ienumerable", "list"]
  ),
  choice(
    2,
    `<p>Šta važi za promenljivu <code>rezultat</code>?</p><pre><code>List&lt;int&gt; lista = new() { 1, 2, 3 };
var rezultat = lista.Where(x =&gt; x &gt; 1);</code></pre>`,
    [
      "Njen statički tip je <code>List&lt;int&gt;</code>.",
      "Može se pozvati <code>rezultat.Add(4)</code>.",
      "Može se enumerirati pomoću <code>foreach</code>.",
      "Poziv <code>rezultat.ToList()</code> pravi materijalizovanu listu.",
      "<code>Where</code> menja tip elemenata iz <code>int</code> u <code>bool</code>."
    ],
    [2, 3],
    "Enumerable.Where vraća sekvencu statičkog tipa IEnumerable<int>. Elementi ostaju int, ali rezultat nema List<T>.Add dok se ne materijalizuje u listu.",
    ["linq", "where", "static-type", "materialization"]
  ),
  choice(
    3,
    `<p>Šta ispisuje kod?</p><pre><code>List&lt;int&gt; brojevi = new() { 1, 2 };
IEnumerable&lt;int&gt; upit = brojevi.Where(x =&gt; x &gt; 1);
brojevi.Add(3);
Console.Write(string.Join(",", upit));</code></pre>`,
    ["<code>2</code>", "<code>2,3</code>", "<code>3</code>", "Prazan string", "Kod se ne kompajlira"],
    [1],
    "Where je deferred: izvor se čita tek tokom string.Join enumeracije, nakon što je broj 3 dodat u listu.",
    ["linq", "deferred-execution", "where", "program-output"]
  ),
  choice(
    4,
    "<p>Koje operacije odmah materijalizuju celu rezultujuću sekvencu?</p>",
    ["<code>Where</code>", "<code>Select</code>", "<code>Distinct</code>", "<code>ToList</code>", "<code>ToArray</code>"],
    [3, 4],
    "Where, Select i Distinct tipično grade deferred upit. ToList i ToArray odmah prolaze kroz izvor i čuvaju rezultat.",
    ["linq", "deferred-execution", "materialization"]
  ),
  choice(
    5,
    `<p>Koje vrednosti imaju <code>a</code> i <code>b</code>?</p><pre><code>int[] niz = { 1, 2, 3, 4 };
int a = niz.Where(x =&gt; x % 2 == 0).Count();
int b = niz.Select(x =&gt; x % 2 == 0).Count();</code></pre>`,
    ["<code>a = 2, b = 2</code>", "<code>a = 2, b = 4</code>", "<code>a = 4, b = 2</code>", "<code>a = 4, b = 4</code>"],
    [1],
    "Where zadržava dva parna broja. Select pravi četiri bool vrednosti, po jednu za svaki ulaz, a Count zatim broji sve četiri.",
    ["linq", "where", "select", "count"]
  ),
  choice(
    6,
    `<p>Koju sekvencu daje izraz?</p><pre><code>int[] niz = { 10, 20, 30, 40 };
var r = niz.Where((x, i) =&gt; i % 2 == 0);</code></pre>`,
    ["<code>10, 20</code>", "<code>10, 30</code>", "<code>20, 40</code>", "<code>0, 2</code>"],
    [1],
    "Indeksirani Where prosleđuje indekse 0, 1, 2 i 3 i zadržava elemente na parnim pozicijama: 10 i 30.",
    ["linq", "where", "indexed-overload"]
  ),
  choice(
    7,
    `<p>Koju sekvencu daje izraz?</p><pre><code>int[] niz = { 10, 11, 12, 13 };
var r = niz.Where(x =&gt; x % 2 == 1)
           .Select((x, i) =&gt; x + i);</code></pre>`,
    ["<code>12, 16</code>", "<code>11, 14</code>", "<code>11, 16</code>", "<code>1, 3</code>"],
    [1],
    "Select dobija filtriranu sekvencu 11, 13 i dodeljuje joj nove indekse 0 i 1, pa nastaju 11 i 14.",
    ["linq", "where", "select", "indexed-overload"]
  ),
  choice(
    8,
    `<p>Koja tvrđenja o brojanju su tačna?</p><pre><code>List&lt;int&gt; lista = new() { 1, 2, 3, 4 };</code></pre>`,
    [
      "<code>lista.Count</code> je property klase <code>List&lt;T&gt;</code>.",
      "<code>lista.Count()</code> je LINQ poziv koji vraća 4.",
      "<code>lista.Count(x =&gt; x &gt; 2)</code> vraća 2.",
      "<code>lista.LongCount()</code> vraća <code>long</code>.",
      "<code>Count(predicate)</code> vraća sekvencu filtriranih elemenata."
    ],
    [0, 1, 2, 3],
    "Property Count i terminalne LINQ metode Count/LongCount vraćaju broj, a ne sekvencu. Predicate overload broji samo poklapanja.",
    ["linq", "count", "long-count", "list"]
  ),
  choice(
    9,
    `<p>Koji izrazi vraćaju broj parnih elemenata liste?</p><pre><code>List&lt;int&gt; lista = new() { 1, 2, 3, 4 };</code></pre>`,
    [
      "<code>lista.Count(x =&gt; x % 2 == 0)</code>",
      "<code>lista.Select(x =&gt; x % 2 == 0).Count()</code>",
      "<code>lista.Where(x =&gt; x % 2 == 0).Count()</code>",
      "<code>lista.FindAll(x =&gt; x % 2 == 0).Count()</code>",
      "<code>lista.Any(x =&gt; x % 2 == 0)</code>"
    ],
    [0, 2, 3],
    "Count(predicate), Where(...).Count() i FindAll(...).Count() daju 2. Select proizvodi četiri bool elementa, a Any vraća bool. Ovo je obrazac pitanja 29 iz jula 2022.",
    ["linq", "count", "where", "find-all", "old-exam"]
  ),
  choice(
    10,
    "<p>Koja tvrđenja o <code>Any</code> i <code>All</code> su tačna?</p>",
    [
      "<code>Any()</code> proverava da li sekvenca ima bar jedan element.",
      "<code>Any(predicate)</code> može stati na prvom poklapanju.",
      "<code>All(predicate)</code> može stati na prvom elementu koji ne zadovoljava uslov.",
      "Obe metode vraćaju <code>IEnumerable&lt;bool&gt;</code>.",
      "Za proveru postojanja je namera jasnija sa <code>Any()</code> nego sa <code>Count() &gt; 0</code>."
    ],
    [0, 1, 2, 4],
    "Any i All su terminalne metode koje vraćaju jedan bool i koriste kratko spajanje kada rezultat postane poznat.",
    ["linq", "any", "all", "short-circuit"]
  ),
  choice(
    11,
    `<p>Šta važi za prazan niz?</p><pre><code>int[] prazan = Array.Empty&lt;int&gt;();</code></pre>`,
    [
      "<code>prazan.Any()</code> je <code>false</code>.",
      "<code>prazan.Any(x =&gt; x &gt; 0)</code> je <code>false</code>.",
      "<code>prazan.All(x =&gt; x &gt; 0)</code> je <code>true</code>.",
      "<code>prazan.Count()</code> baca izuzetak.",
      "Predikat prosleđen metodi <code>All</code> poziva se jednom."
    ],
    [0, 1, 2],
    "Any je false kada nema elementa, dok je All true jer ne postoji kontraprimer. Count prazne sekvence vraća 0, a predikati se ne pozivaju.",
    ["linq", "any", "all", "empty-sequence"]
  ),
  choice(
    12,
    "<p>Koja tvrđenja o <code>FindAll</code> i <code>Where</code> su tačna?</p>",
    [
      "<code>FindAll</code> je instance metoda klase <code>List&lt;T&gt;</code>.",
      "<code>Where</code> je LINQ extension metoda za <code>IEnumerable&lt;T&gt;</code>.",
      "<code>FindAll</code> vraća novu <code>List&lt;T&gt;</code> i izvršava se odmah.",
      "<code>Where</code> tipično vraća deferred sekvencu.",
      "Promenljiva statičkog tipa <code>IEnumerable&lt;T&gt;</code> uvek ima metodu <code>FindAll</code>."
    ],
    [0, 1, 2, 3],
    "FindAll pripada konkretnoj listi, prima Predicate<T> i odmah pravi novu listu. Where radi nad IEnumerable<T> i tipično je deferred.",
    ["linq", "find-all", "where", "deferred-execution"]
  ),
  choice(
    13,
    `<p>Koje naredbe se kompajliraju?</p><pre><code>static bool Paran(int x) =&gt; x % 2 == 0;
Predicate&lt;int&gt; p = Paran;</code></pre>`,
    [
      "<code>List&lt;int&gt; a = new() { 1, 2 }.FindAll(p);</code>",
      "<code>var b = new[] { 1, 2 }.Where(p);</code>",
      "<code>var c = new[] { 1, 2 }.Where(x =&gt; p(x));</code>",
      "<code>Func&lt;int, bool&gt; f = p;</code>",
      "<code>Func&lt;int, bool&gt; g = p.Invoke;</code>"
    ],
    [0, 2, 4],
    "Predicate<int> odgovara FindAll, ali nije implicitno isti delegate tip kao Func<int,bool>. Lambda x => p(x) i method group p.Invoke mogu napraviti odgovarajući Func.",
    ["linq", "find-all", "where", "predicate", "func"]
  ),
  choice(
    14,
    `<p>Koji su rezultati izraza?</p><pre><code>int[] niz = { 1, 2, 3 };
var a = niz.Select(x =&gt; x % 2).Distinct();
var b = niz.Distinct().Select(x =&gt; x % 2);</code></pre>`,
    ["Oba daju <code>1,0</code>.", "<code>a</code> daje <code>1,0</code>, a <code>b</code> daje <code>1,0,1</code>.", "<code>a</code> daje <code>1,0,1</code>, a <code>b</code> daje <code>1,0</code>.", "Oba daju <code>1,0,1</code>."],
    [1],
    "Distinct posle projekcije uklanja duplikat projektovane vrednosti 1. Distinct pre projekcije ne nalazi duplikate u originalnom nizu.",
    ["linq", "distinct", "select", "operator-order"]
  ),
  choice(
    15,
    "<p>Koja tvrđenja o jednakosti i <code>Distinct</code> su tačna?</p>",
    [
      "Za <code>int</code> se jednake brojčane vrednosti smatraju duplikatima.",
      "Dva različita objekta obične klase sa istim poljima su uvek jednaka.",
      "Anonimni tipovi sa istim properties i vrednostima imaju vrednosnu jednakost.",
      "Može se proslediti <code>IEqualityComparer&lt;T&gt;</code>.",
      "<code>Distinct</code> menja originalnu kolekciju."
    ],
    [0, 2, 3],
    "Distinct koristi podrazumevanu jednakost ili prosleđeni comparer i ne menja izvor. Obična klasa bez redefinisane jednakosti tipično koristi jednakost referenci.",
    ["linq", "distinct", "equality", "anonymous-types"]
  ),
  choice(
    16,
    `<p>Koja tvrđenja o agregatnim metodama su tačna?</p><pre><code>int[] niz = { 2, 4, 6 };</code></pre>`,
    [
      "<code>niz.Average()</code> vraća <code>double</code> vrednosti 4.",
      "<code>niz.Max()</code> vraća <code>int</code> vrednosti 6.",
      "<code>niz.Last()</code> vraća 6.",
      "Sve tri metode vraćaju novu sekvencu.",
      "Sve tri pokreću enumeraciju izvora."
    ],
    [0, 1, 2, 4],
    "Average, Max i Last su terminalne operacije. Average nad int sekvencom vraća double, dok Max i Last ovde vraćaju int.",
    ["linq", "average", "max", "last"]
  ),
  choice(
    17,
    `<p>Koje naredbe bacaju <code>InvalidOperationException</code>?</p><pre><code>int[] prazan = Array.Empty&lt;int&gt;();</code></pre>`,
    ["<code>prazan.Average()</code>", "<code>prazan.Max()</code>", "<code>prazan.Last()</code>", "<code>prazan.LastOrDefault()</code>", "<code>prazan.Count()</code>"],
    [0, 1, 2],
    "Average, Max i Last nemaju rezultat za praznu nenullable int sekvencu. LastOrDefault vraća 0, a Count vraća 0.",
    ["linq", "empty-sequence", "exceptions", "average", "max", "last"]
  ),
  choice(
    18,
    `<p>Koje vrednosti imaju <code>a</code> i <code>b</code>?</p><pre><code>int[] niz = { 2, 7, 4, 9 };
int a = niz.Last(x =&gt; x % 2 == 0);
int b = niz.Where(x =&gt; x &gt; 10).LastOrDefault();</code></pre>`,
    ["<code>a = 2, b = 0</code>", "<code>a = 4, b = 0</code>", "<code>a = 4, b = 9</code>", "Oba poziva bacaju izuzetak"],
    [1],
    "Last(predicate) vraća poslednje poklapanje u celoj sekvenci, odnosno 4. LastOrDefault praznog int rezultata vraća 0.",
    ["linq", "last", "last-or-default", "empty-sequence"]
  ),
  choice(
    19,
    `<p>Koje vrednosti nastaju?</p><pre><code>int[] niz = { 1, 2, 3, 4 };
var a = niz.Select(x =&gt; x / 3);
var b = niz.Select(x =&gt; x / 3.0);</code></pre>`,
    ["<code>a</code>: <code>0,0,1,1</code>", "<code>a</code>: <code>0.33,0.67,1,1.33</code>", "<code>b</code> koristi realno deljenje", "Oba izraza koriste celobrojno deljenje", "<code>a</code> sadrži elemente tipa <code>int</code>"],
    [0, 2, 4],
    "U izrazu x / 3 oba operanda su int, pa se razlomak odseca. Literal 3.0 primorava realno deljenje i daje double elemente.",
    ["linq", "select", "integer-division", "numeric-types"]
  ),
  choice(
    20,
    `<p>Šta važi za nullable agregacije?</p><pre><code>int?[] a = { null, 2, null, 4 };
int?[] b = { null };</code></pre>`,
    [
      "<code>a.Average()</code> je 3.",
      "<code>a.Max()</code> je 4.",
      "<code>b.Average()</code> je <code>null</code>.",
      "<code>b.Max()</code> je <code>null</code>.",
      "Svaki <code>null</code> se pri računanju tretira kao nula."
    ],
    [0, 1, 2, 3],
    "Nullable numerički overload-i ignorišu null vrednosti i vraćaju null kada nema nijedne stvarne brojčane vrednosti.",
    ["linq", "nullable", "average", "max"]
  ),
  choice(
    21,
    "<p>Koja tvrđenja o anonimnim tipovima su tačna?</p>",
    [
      "Ispravna sintaksa je <code>new { P = 2, O = 5 }</code>.",
      "Sintaksa <code>new (P = 2, O = 5)</code> pravi anonimni tip.",
      "Properties anonimnog tipa su samo za čitanje.",
      "Promenljiva anonimnog tipa se prirodno deklariše pomoću <code>var</code>.",
      "Anonimni tip i imenovani tuple su isto."
    ],
    [0, 2, 3],
    "Anonimni tip koristi vitičaste zagrade i read-only properties. Oblik sa običnim zagradama pripada tuple sintaksi, ne anonimnom tipu.",
    ["anonymous-types", "syntax", "compile-time"]
  ),
  choice(
    22,
    `<p>Koju vrednost ima <code>a</code>?</p><pre><code>int[] niz = { 5, 8, 11, 14 };
var a = niz.Where(x =&gt; x &gt; 5)
           .Select((x, i) =&gt; new { P = i / 2, O = x / 3 })
           .Last(x =&gt; x.P == 0);</code></pre>`,
    ["<code>P = 0, O = 2</code>", "<code>P = 0, O = 3</code>", "<code>P = 1, O = 3</code>", "Kod baca izuzetak"],
    [1],
    "Posle Where ostaju 8, 11, 14 sa novim indeksima 0, 1, 2. P je 0, 0, 1, pa Last bira element 11 i O je 11 / 3 = 3.",
    ["linq", "anonymous-types", "indexed-overload", "integer-division", "last"]
  ),
  choice(
    23,
    `<p>Šta važi za indexer?</p><pre><code>class Skup
{
    private readonly int[] niz = { 10, 20, 30 };
    public int this[int p] =&gt; niz[niz.Length - 1 - p];
}</code></pre>`,
    ["<code>new Skup()[0]</code> vraća 10.", "<code>new Skup()[0]</code> vraća 30.", "<code>new Skup()[2]</code> vraća 10.", "Indexer mora direktno koristiti prosleđeni argument kao indeks.", "Indexer je property sa parametrima."],
    [1, 2, 4],
    "Telo indexer-a mapira p na 2 - p, pa p=0 čita 30, a p=2 čita 10. Indexer je parametrizovani property i ne mora biti prosto indeksiranje.",
    ["indexers", "arrays"]
  ),
  choice(
    24,
    `<p>Koja tvrđenja važe za niz dužine 4?</p><pre><code>int[] niz = { 10, 20, 30, 40 };</code></pre>`,
    [
      "<code>niz[^1]</code> je 40.",
      "<code>niz[^2]</code> je 30.",
      "<code>niz[^4]</code> je 10.",
      "<code>niz[^0]</code> je 10.",
      "Pristup <code>niz[^0]</code> baca <code>IndexOutOfRangeException</code>."
    ],
    [0, 1, 2, 4],
    "^k odgovara poziciji Length-k. Zato ^1 bira poslednji, ^4 prvi element, dok ^0 označava poziciju neposredno iza kraja.",
    ["index-from-end", "arrays", "exceptions"]
  ),
  choice(
    25,
    `<p>Koji su rezultati opsega?</p><pre><code>int[] niz = { 10, 20, 30, 40 };
var a = niz[1..^1];
var b = niz[0..^0];</code></pre>`,
    ["<code>a</code> je <code>20,30</code>.", "<code>a</code> je <code>20,30,40</code>.", "<code>b</code> sadrži ceo niz.", "Krajnja granica opsega je uključiva.", "<code>^0</code> je dozvoljena krajnja granica opsega."],
    [0, 2, 4],
    "Krajnja granica Range-a je isključiva. ^1 označava poziciju poslednjeg elementa, pa se on ne uključuje; ^0 označava poziciju iza kraja.",
    ["ranges", "index-from-end", "arrays"]
  ),
  choice(
    26,
    "<p>Koja tvrđenja opisuju ispravno deklarisanu extension metodu?</p>",
    [
      "Metoda mora biti statička.",
      "Mora biti deklarisana u neugnježdenoj statičkoj klasi.",
      "Prvi parametar ima modifier <code>this</code>.",
      "Poziv <code>x.M()</code> je pogodnija sintaksa za statički poziv extension metode.",
      "Extension metoda postaje virtualni instance član tipa."
    ],
    [0, 1, 2, 3],
    "Extension metoda je statička metoda posebnog oblika. Instance sintaksa ne menja tip niti uvodi virtualni dispatch.",
    ["extension-methods", "static-members", "syntax"]
  ),
  choice(
    27,
    `<p>Šta ispisuje kod?</p><pre><code>class K { public string M() =&gt; "I"; }
static class E
{
    public static string M(this K x) =&gt; "E";
}

K k = new();
Console.Write(k.M() + E.M(k));</code></pre>`,
    ["<code>II</code>", "<code>IE</code>", "<code>EI</code>", "<code>EE</code>", "Poziv je dvosmislen"],
    [1],
    "Primenljiv instance član ima prednost u pozivu k.M(), dok eksplicitni statički poziv E.M(k) bira extension metodu.",
    ["extension-methods", "overload-resolution", "program-output"]
  ),
  choice(
    28,
    `<p>Koji pozivi se kompajliraju?</p><pre><code>static void Povecaj(ref int x) =&gt; x++;
int[] niz = { 1 };
List&lt;int&gt; lista = new() { 1 };</code></pre>`,
    ["<code>Povecaj(ref niz[0]);</code>", "<code>Povecaj(ref lista[0]);</code>", "<code>int x = lista[0]; Povecaj(ref x);</code>", "<code>Povecaj(niz[0]);</code>", "<code>Povecaj(ref niz[^1]);</code>"],
    [0, 2, 4],
    "Element niza, uključujući pristup pomoću Index-a, jeste promenljiva pogodna za ref. Običan List<T> indexer ne vraća ref, a modifier mora postojati i pri pozivu.",
    ["ref", "arrays", "indexers", "compile-time"]
  ),
  choice(
    29,
    `<p>Koju vrednost ima <code>x</code> na kraju?</p><pre><code>delegate void Operacija(ref int x);
static void Plus(ref int x) =&gt; x += 4;
static void Puta(ref int x) =&gt; x *= 2;

Operacija op = Plus;
op += Puta;
int x = 3;
op(ref x);</code></pre>`,
    ["<code>7</code>", "<code>10</code>", "<code>14</code>", "<code>6</code>", "Kod se ne kompajlira"],
    [2],
    "Multicast stavke rade redom nad istom ref promenljivom: Plus menja 3 u 7, a Puta zatim 7 u 14.",
    ["delegates", "multicast", "ref"]
  ),
  choice(
    30,
    `<p>Koja tvrđenja važe?</p><pre><code>int[] niz = { 2, 0, 5 };
IEnumerable&lt;int&gt; upit = niz.Select(x =&gt; 10 / x);</code></pre>`,
    [
      "Sama dodela promenljivoj <code>upit</code> odmah baca <code>DivideByZeroException</code>.",
      "Izuzetak nastaje kada enumeracija stigne do elementa 0.",
      "Da bi <code>catch</code> uhvatio grešku, enumeracija mora biti unutar odgovarajućeg <code>try</code> bloka.",
      "Prvi proizvedeni element može biti 5 pre nastanka izuzetka.",
      "Posle izuzetka standardna enumeracija automatski preskače nulu i nastavlja sa 5."
    ],
    [1, 2, 3],
    "Select je deferred. Pri enumeraciji se za 2 najpre dobija 5, zatim deljenje nulom prekida tok; ostatak se ne nastavlja automatski.",
    ["linq", "deferred-execution", "exceptions", "integer-division"]
  ),
  short(
    31,
    `<p>Šta se ispisuje?</p><pre><code>int[] niz = { 1, 2, 3, 4, 5, 2, 3 };
var v = niz.Select(x =&gt; x + x).Distinct().Average();
Console.Write(v);</code></pre>`,
    "6",
    ["6", "6.0"],
    "Select daje 2,4,6,8,10,4,6; Distinct ostavlja 2,4,6,8,10, a njihov prosek je 6. Ovo je pitanje 32 iz jula 2022.",
    ["linq", "select", "distinct", "average", "old-exam", "program-output"]
  ),
  short(
    32,
    `<p>Šta se ispisuje?</p><pre><code>int[] niz = { 1, 2, 3, 4, 5, 2, 3 };
var v = niz.Distinct()
           .Select((x, i) =&gt; i % 2 == 0 ? 1 : x * 2)
           .Average();
Console.Write(v);</code></pre>`,
    "3",
    ["3", "3.0"],
    "Distinct ostavlja 1,2,3,4,5. Indeksirani Select daje 1,4,1,8,1, čiji je prosek 3. Ovo je pitanje 32 iz juna 2023.",
    ["linq", "distinct", "select", "indexed-overload", "average", "old-exam", "program-output"]
  ),
  short(
    33,
    `<p>Šta se ispisuje?</p><pre><code>int[] niz = { 92, 48, 101, 37, 210, 58 };
var a = niz.Select((x, i) =&gt; new { P = i / 3, O = x / 5 })
           .Last(x =&gt; x.P &lt; 0.5);
Console.Write($"{a.O}:{a.P}");</code></pre>`,
    "20:0",
    ["20:0"],
    "P koristi celobrojno deljenje: za indekse 0,1,2 je 0, a zatim je 1. Poslednji element sa P < 0.5 je x=101, pa je O=101/5=20. Ovo je sintaksno ispravljena varijanta pitanja 32 iz aprila 2023.",
    ["linq", "anonymous-types", "integer-division", "last", "old-exam", "program-output"]
  ),
  short(
    34,
    `<p>Šta se ispisuje?</p><pre><code>delegate void Operacija(ref int x);
class Skup
{
    public int[] niz = { 2, 4, 6, 8, 10 };
    public int this[int pozicija] =&gt; niz[^(pozicija - 1)];
}
static class Prosirenja
{
    public static void Mapiraj(this Skup s, Operacija op)
    {
        for (int i = 1; i &lt; 4; i++) op(ref s.niz[i]);
    }
}
static void Povecaj(ref int x) =&gt; x *= 4;
static void Smanji(ref int x) =&gt; x -= 3;

Skup x = new();
Operacija o = Smanji;
o = Povecaj;
x.Mapiraj(o);
try
{
    for (int i = -5; i &lt;= 2; i += 2) Console.Write(x[-i]);
}
catch (Exception) { Console.Write("X"); }</code></pre>`,
    "1632X",
    ["1632x"],
    "Mapiraj množi elemente 1,2,3 sa 4, pa niz postaje 2,16,24,32,10. Indexer za pozicije 5 i 3 vraća 16 i 32; pozicija 1 koristi ^0 i baca, pa catch dodaje X. Ovo je pitanje 38 iz aprila 2023.",
    ["indexers", "index-from-end", "extension-methods", "ref", "exceptions", "old-exam", "program-output"]
  ),
  short(
    35,
    `<p>Šta se ispisuje?</p><pre><code>delegate void Operacija(ref int x);
class Skup
{
    public int[] niz = { 2, 4, 6, 8, 10 };
    public int this[int pozicija] =&gt; niz[^(pozicija - 2)];
}
static class Prosirenja
{
    public static void Mapiraj(this Skup s, Operacija op)
    {
        for (int i = 1; i &lt; 4; i++) op(ref s.niz[i]);
    }
}
static void Povecaj(ref int x) =&gt; x += 4;
static void Smanji(ref int x) =&gt; x -= 3;

Skup x = new();
Operacija o = Smanji;
o = Povecaj;
x.Mapiraj(o);
try
{
    for (int i = -5; i &lt;= -2; i += 2) Console.Write(x[-i]);
}
catch (Exception) { Console.Write("X"); }</code></pre>`,
    "1010",
    ["1010"],
    "Posle Mapiraj niz je 2,8,10,12,10. Pozicije 5 i 3 koriste ^3 i ^1, pa obe daju 10. Ovo je pitanje 38 iz juna 2023.",
    ["indexers", "index-from-end", "extension-methods", "ref", "old-exam", "program-output"]
  ),
  short(
    36,
    `<p>Šta se ispisuje?</p><pre><code>List&lt;int&gt; brojevi = new() { 1, 2 };
var upit = brojevi.Where(x =&gt; x &gt; 1);
brojevi.Add(3);
Console.Write(string.Join("", upit));</code></pre>`,
    "23",
    ["23"],
    "Where je deferred, pa enumeracija vidi listu tek nakon dodavanja broja 3 i daje elemente 2 i 3.",
    ["linq", "where", "deferred-execution", "program-output"]
  ),
  short(
    37,
    `<p>Šta se ispisuje?</p><pre><code>List&lt;int&gt; brojevi = new() { 1, 2 };
List&lt;int&gt; snimak = brojevi.Where(x =&gt; x &gt; 1).ToList();
brojevi.Add(3);
Console.Write(string.Join("", snimak));</code></pre>`,
    "2",
    ["2"],
    "ToList odmah materijalizuje rezultat. Kasnija promena izvora ne menja već napravljeni snimak.",
    ["linq", "where", "materialization", "program-output"]
  ),
  short(
    38,
    `<p>Šta se ispisuje?</p><pre><code>int[] niz = { 2, 0, 5 };
var upit = niz.Select(x =&gt; 10 / x);
try
{
    foreach (int x in upit) Console.Write(x);
}
catch (DivideByZeroException) { Console.Write("X"); }
finally { Console.Write("F"); }</code></pre>`,
    "5XF",
    ["5xf"],
    "Prvi element daje 10/2=5. Sledeći baca DivideByZeroException, catch ispisuje X, a finally se zatim obavezno izvršava i ispisuje F.",
    ["linq", "select", "deferred-execution", "exceptions", "finally", "program-output"]
  ),
  short(
    39,
    `<p>Šta se ispisuje?</p><pre><code>int[] niz = { 1, 2 };
double a = niz.Select(x =&gt; x / 2).Average();
double b = niz.Select(x =&gt; x / 2.0).Average();
Console.Write($"{a}:{b}");</code></pre>`,
    "0.5:0.75",
    ["0.5:0.75", "0,5:0,75"],
    "Prva projekcija daje int vrednosti 0 i 1, čiji je prosek 0.5. Druga daje double vrednosti 0.5 i 1, čiji je prosek 0.75.",
    ["linq", "select", "integer-division", "average", "program-output"]
  ),
  short(
    40,
    `<p>Šta se ispisuje?</p><pre><code>delegate void Operacija(ref int x);
class Skup
{
    public int[] niz = { 1, 2, 3, 4 };
    public int this[int p] =&gt; niz[^(p - 1)];
}
static class Prosirenja
{
    public static void Mapiraj(this Skup s, Operacija op)
    {
        for (int i = 1; i &lt; 3; i++) op(ref s.niz[i]);
    }
}
static void Plus(ref int x) =&gt; x += 3;
static void Puta(ref int x) =&gt; x *= 2;

Skup s = new();
Operacija op = Plus;
op += Puta;
s.Mapiraj(op);
try
{
    for (int p = 4; p &gt;= 0; p -= 2) Console.Write(s[p]);
}
catch (Exception) { Console.Write("X"); }</code></pre>`,
    "104X",
    ["104x"],
    "Multicast operacija menja srednje elemente u 10 i 12. Indexer za p=4 koristi ^3 i vraća 10, za p=2 koristi ^1 i vraća 4, a za p=0 pokušava da napravi ^-1 i baca izuzetak, pa sledi X.",
    ["indexers", "index-from-end", "extension-methods", "multicast", "ref", "exceptions", "program-output"]
  )
];
