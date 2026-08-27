import type { Question } from "../schema";

const lessonId = "delegati-i-funkcije";
const sourceTestId = "delegati-i-funkcije-1";

function choice(
  originalNumber: number,
  prompt: string,
  options: string[],
  correct: number[],
  explanation: string,
  tags: string[]
): Question {
  return {
    id: `delegati-i-funkcije-q${String(originalNumber).padStart(2, "0")}`,
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
    id: `delegati-i-funkcije-q${String(originalNumber).padStart(2, "0")}`,
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

export const customQuestions: Question[] = [
  choice(
    1,
    "<p>Koja tvrđenja o delegatima su tačna?</p>",
    [
      "Delegat je reference tip.",
      "Deklaracija delegata određuje parametre i povratni tip kompatibilnih metoda.",
      "Delegat može predstavljati samo statičku metodu.",
      "Delegat instance metode čuva i ciljni objekat.",
      "Telo metode se izvršava već pri dodeli method group-e delegatu."
    ],
    [0, 1, 3],
    "Delegat je reference tip koji opisuje oblik poziva. Za instance metodu čuva metodu i target, a telo se izvršava tek kada se delegat pozove.",
    ["delegates", "delegate-target"]
  ),
  choice(
    2,
    "<p>Koje metode se mogu pridružiti delegatu <code>Obrada</code>?</p><pre><code>delegate int Obrada(ref int a, int b);\n\nstatic int A(ref int x, int y) =&gt; x + y;\nstatic int B(out int x, int y) { x = y; return x; }\nstatic long C(ref int x, int y) =&gt; x + y;\nstatic int D(ref int x, short y) =&gt; x + y;\nstatic int E(int y, ref int x) =&gt; x + y;</code></pre>",
    ["<code>A</code>", "<code>B</code>", "<code>C</code>", "<code>D</code>", "<code>E</code>"],
    [0],
    "Samo A ima isti broj, redosled i vrste parametara, isti ref modifier i odgovarajući povratni tip. Ovo je varijacija pitanja 26 sa starih rokova.",
    ["delegates", "method-group", "ref-out-in", "compile-time"]
  ),
  choice(
    3,
    "<p>Koje dodele su ispravne?</p><pre><code>static bool Paran(int x) =&gt; x % 2 == 0;</code></pre>",
    [
      "<code>Func&lt;int, bool&gt; a = Paran;</code>",
      "<code>Predicate&lt;int&gt; b = Paran;</code>",
      "<code>Action&lt;int&gt; c = Paran;</code>",
      "<code>Func&lt;bool, int&gt; d = Paran;</code>",
      "<code>Func&lt;int&gt; e = Paran;</code>"
    ],
    [0, 1],
    "Paran prima int i vraća bool, pa odgovara tipovima Func<int, bool> i Predicate<int>. Ovo prati pitanje 30 sa rokova iz 2023.",
    ["delegates", "func-action-predicate", "method-group"]
  ),
  choice(
    4,
    "<p>Koje dodele koriste dozvoljenu varijansu delegata?</p><pre><code>static void Prikazi(object x) { }\nstatic string Napravi() =&gt; \"x\";\nstatic long Prosiri(int x) =&gt; x;</code></pre>",
    [
      "<code>Action&lt;string&gt; a = Prikazi;</code>",
      "<code>Func&lt;object&gt; b = Napravi;</code>",
      "<code>Action&lt;object&gt; c = (string x) =&gt; { };</code>",
      "<code>Func&lt;string&gt; d = () =&gt; new object();</code>",
      "<code>Func&lt;short, long&gt; e = Prosiri;</code>"
    ],
    [0, 1],
    "Kontravarijansa parametra dozvoljava da metoda prima object umesto string, a kovarijansa rezultata da string postane object. Varijansa ne koristi numeričke konverzije.",
    ["delegates", "variance", "compile-time"]
  ),
  choice(
    5,
    "<p>Šta važi za sledeće method-group konverzije?</p><pre><code>static int M(int x) =&gt; x + 1;\nstatic string M(string x) =&gt; x + \"!\";\n\nFunc&lt;int, int&gt; a = M;\nFunc&lt;string, string&gt; b = M;</code></pre>",
    [
      "Obe dodele su dvosmislene.",
      "Ciljni tip promenljive <code>a</code> bira overload <code>M(int)</code>.",
      "Ciljni tip promenljive <code>b</code> bira overload <code>M(string)</code>.",
      "Overload se ponovo bira pri svakom pozivu delegata.",
      "Izbor kompatibilne metode obavlja se pri kompilaciji."
    ],
    [1, 2, 4],
    "Ciljni delegate potpis razrešava method group tokom kompilacije; nema ponovne overload pretrage u runtime-u.",
    ["delegates", "method-group", "overload-resolution", "compile-time"]
  ),
  choice(
    6,
    "<p>Koje dodele se kompajliraju?</p><pre><code>class K\n{\n    public int Dodaj(int x) =&gt; x + 1;\n    public static int Dupliraj(int x) =&gt; x * 2;\n}\nK k = new();</code></pre>",
    [
      "<code>Func&lt;int, int&gt; a = k.Dodaj;</code>",
      "<code>Func&lt;int, int&gt; b = K.Dupliraj;</code>",
      "<code>Func&lt;int, int&gt; c = K.Dodaj;</code>",
      "<code>Func&lt;int, int&gt; d = k.Dupliraj;</code>"
    ],
    [0, 1],
    "Obična instance metoda zahteva objekat, dok se statičkom članu pristupa preko imena tipa.",
    ["delegates", "method-group", "delegate-target", "static-members"]
  ),
  choice(
    7,
    "<p>Šta ispisuje kod?</p><pre><code>class A { public virtual string M() =&gt; \"A\"; }\nclass B : A { public override string M() =&gt; \"B\"; }\n\nA x = new B();\nFunc&lt;string&gt; f = x.M;\nConsole.Write(f());</code></pre>",
    ["<code>A</code>", "<code>B</code>", "Kod se ne kompajlira", "Zavisi od tipa promenljive <code>f</code>"],
    [1],
    "Delegat čuva objekat x, a virtualni poziv koristi najizvedeniju implementaciju B.M.",
    ["delegates", "delegate-target", "virtual-dispatch", "program-output"]
  ),
  choice(
    8,
    "<p>Koja tvrđenja o delegate objektima su tačna?</p>",
    [
      "Delegati su nepromenljivi; kombinovanje pravi novu vrednost.",
      "Dve delegate stavke instance metoda jednake su ako imaju istu metodu, bez obzira na target.",
      "Dve delegate stavke instance metoda jednake su kada predstavljaju istu metodu na istom targetu.",
      "Dodela <code>b = a</code> znači da će kasnije <code>b += M</code> izmeniti i <code>a</code>.",
      "Invocation lista može sadržati istu stavku više puta."
    ],
    [0, 2, 4],
    "Jednakost instance stavke uključuje metodu i target. Operatori kombinovanja prave novu delegate vrednost, a duplikati su dozvoljeni.",
    ["delegates", "multicast", "delegate-equality"]
  ),
  choice(
    9,
    "<p>Koja je invocation lista promenljive <code>d</code> na kraju?</p><pre><code>Action d = A;\nd += B;\nd = C;\nd += A;</code></pre>",
    ["<code>[A, B, C, A]</code>", "<code>[C, A]</code>", "<code>[A, B, A]</code>", "<code>[C]</code>"],
    [1],
    "Operator = zamenjuje celu prethodnu listu, dok += dodaje stavku na kraj.",
    ["delegates", "multicast", "invocation-list"]
  ),
  choice(
    10,
    "<p>Koja lista ostaje nakon poslednje naredbe?</p><pre><code>Action par = A;\npar += B;\n\nAction d = A;\nd += B;\nd += A;\nd += B;\nd -= par;</code></pre>",
    ["<code>[]</code>", "<code>[A, B]</code>", "<code>[A, B, B]</code>", "<code>[A, B, A]</code>"],
    [1],
    "Oduzimanje multicast delegata uklanja poslednje pojavljivanje cele uzastopne liste [A, B].",
    ["delegates", "multicast", "invocation-list", "delegate-removal"]
  ),
  choice(
    11,
    "<p>Šta važi kada se direktno pozove multicast delegat koji vraća vrednost?</p>",
    [
      "Poziva se samo poslednja stavka.",
      "Poziv automatski vraća niz svih rezultata.",
      "Sve stavke se pozivaju redom ako nijedna ne baci izuzetak.",
      "Direktan rezultat je vrednost poslednje pozvane stavke.",
      "Za sve rezultate treba ručno proći kroz <code>GetInvocationList()</code>."
    ],
    [2, 3, 4],
    "Standardni multicast poziv izvršava celu listu, ali izlaže samo poslednju povratnu vrednost.",
    ["delegates", "multicast", "return-values"]
  ),
  choice(
    12,
    "<p>Šta se dešava kada drugi handler multicast delegata baci neobrađen izuzetak?</p>",
    [
      "Izuzetak se automatski ignoriše.",
      "Kasniji handleri se ne pozivaju.",
      "Izuzetak se prosleđuje pozivaocu.",
      "Invocation lista se automatski prazni.",
      "Za izolovanu obradu treba ručno pozivati stavke i obraditi izuzetak svake."
    ],
    [1, 2, 4],
    "Neobrađen izuzetak prekida standardni multicast poziv; lista ostaje nepromenjena.",
    ["delegates", "multicast", "exceptions"]
  ),
  choice(
    13,
    "<p>Koja tvrđenja o <code>ref</code>, <code>out</code> i <code>in</code> parametrima delegata su tačna?</p>",
    [
      "Modifier je deo kompatibilnog potpisa.",
      "Metoda sa <code>out int</code> može zameniti očekivani <code>ref int</code>.",
      "Promenljiva prosleđena kroz <code>ref</code> mora biti dodeljena pre poziva.",
      "Kod multicast <code>ref</code> poziva kasniji handler vidi promenu ranijeg.",
      "Standardni <code>Func</code> i <code>Action</code> tipovi mogu deklarisati <code>ref</code> parametre."
    ],
    [0, 2, 3],
    "ref, out i in nisu međusobno zamenljivi. Za by-reference ugovor potreban je custom delegate, a svi multicast handleri rade nad istim storage-om.",
    ["delegates", "ref-out-in", "multicast", "definite-assignment"]
  ),
  choice(
    14,
    "<p>Šta spoljašnji kod sme da uradi sa field-like event-om <code>r.Promena</code>?</p>",
    [
      "<code>r.Promena += Handler;</code>",
      "<code>r.Promena -= Handler;</code>",
      "<code>r.Promena = null;</code>",
      "<code>r.Promena();</code>",
      "<code>Action a = r.Promena;</code>"
    ],
    [0, 1],
    "Izvan tipa koji deklariše event dozvoljena je kontrolisana pretplata i odjava, ali ne čitanje, dodela ni emitovanje.",
    ["events", "accessibility"]
  ),
  choice(
    15,
    "<p>Kako izvedena klasa uobičajeno emituje field-like event deklarisan u baznoj klasi?</p>",
    [
      "Direktnim pozivom event-a iz izvedene klase.",
      "Preko <code>protected</code> metode baze, često nazvane <code>OnPromena</code>.",
      "Cast-ovanjem event-a u <code>Delegate</code>.",
      "Izvedena klasa nikada ne može posredno izazvati emitovanje."
    ],
    [1],
    "Samo tip koji deklariše field-like event može direktno da ga emituje, pa baza izlaže protected metodu za izvedene klase.",
    ["events", "inheritance", "accessibility"]
  ),
  choice(
    16,
    "<p>Koja tvrđenja o instance i statičkim event-ima su tačna?</p>",
    [
      "Svaka instanca ima zasebnu listu za instance event.",
      "Statički event ima jednu listu koju dele sve instance tipa.",
      "Pretplata na instance event objekta <code>a</code> važi i za objekat <code>b</code> istog tipa.",
      "Statičkom event-u se pristupa preko imena tipa.",
      "Statički event ne može zadržati referencu na target instance handlera."
    ],
    [0, 1, 3],
    "Instance event pripada objektu, a static event tipu. Statička lista može zadržati target objekat pretplaćene instance metode.",
    ["events", "static-members", "delegate-target"]
  ),
  choice(
    17,
    "<p>Koja tvrđenja o pretplati i odjavi su tačna?</p>",
    [
      "Višestruko <code>+= Handler</code> može dodati isti handler više puta.",
      "Jedno <code>-= Handler</code> uklanja poslednje odgovarajuće pojavljivanje.",
      "Za instance metodu odjava mora predstavljati istu metodu na istom objektu.",
      "Nova tekstualno jednaka lambda pouzdano uklanja ranije dodatu lambdu.",
      "Handler lambdu koju ćemo ukloniti treba sačuvati u promenljivoj."
    ],
    [0, 1, 2, 4],
    "Odjava koristi delegate jednakost. Nova lambda je drugi delegate, pa stabilan handler treba sačuvati.",
    ["events", "delegate-removal", "delegate-equality", "lambdas"]
  ),
  choice(
    18,
    "<p>Koje lambda dodele su ispravne?</p>",
    [
      "<code>Func&lt;int, int&gt; a = x =&gt; x * x;</code>",
      "<code>Action&lt;string&gt; b = x =&gt; Console.Write(x);</code>",
      "<code>Func&lt;int, int, int&gt; c = (int x, y) =&gt; x + y;</code>",
      "<code>Func&lt;int, int&gt; d = x =&gt; { return x + 1; };</code>",
      "<code>Func&lt;int, int&gt; e = x =&gt; { x + 1; };</code>"
    ],
    [0, 1, 3],
    "Parametri se mogu zaključiti ili svi eksplicitno tipizirati. Statement lambda koja vraća vrednost mora imati return.",
    ["lambdas", "func-action-predicate", "compile-time"]
  ),
  choice(
    19,
    "<p>Šta <code>static</code> lambda sme da koristi?</p>",
    [
      "Svoje parametre.",
      "Lokalne promenljive iz sopstvenog tela.",
      "Lokalnu promenljivu spoljne metode.",
      "<code>this</code> spoljnog objekta.",
      "Dostupne statičke članove i konstante."
    ],
    [0, 1, 4],
    "Static lambda ne sme da capture-uje lokalno ili instance stanje okolnog konteksta.",
    ["lambdas", "closures", "static-members"]
  ),
  choice(
    20,
    "<p>Šta ispisuje kod?</p><pre><code>int x = 1;\nFunc&lt;int&gt; f = () =&gt; x;\nx = 5;\nConsole.Write(f());</code></pre>",
    ["<code>1</code>", "<code>5</code>", "<code>0</code>", "Kod se ne kompajlira"],
    [1],
    "Closure capture-uje promenljivu, ne zamrznutu vrednost iz trenutka deklaracije.",
    ["lambdas", "closures", "program-output"]
  ),
  choice(
    21,
    "<p>Koja tvrđenja o capture-u iteracionih promenljivih u modernom C# su tačna?</p>",
    [
      "Lambde dodate u običnoj <code>for</code> petlji tipično dele istu promenljivu brojača.",
      "Tri lambde koje čitaju <code>i</code> iz petlje <code>for (int i = 0; i &lt; 3; i++)</code> po pozivu posle petlje tipično daju 0, 1 i 2.",
      "Nova lokalna kopija unutar tela <code>for</code> petlje daje zasebnu captured promenljivu po iteraciji.",
      "Moderna <code>foreach</code> iteraciona promenljiva je nova za svaku iteraciju.",
      "Closure uvek kopira samo trenutnu vrednost."
    ],
    [0, 2, 3],
    "for brojač se deli i nakon petlje ima završnu vrednost, dok lokalna kopija i moderna foreach promenljiva daju zasebne capture-e.",
    ["lambdas", "closures", "loops"]
  ),
  choice(
    22,
    "<p>Koja tvrđenja o lokalnim funkcijama su tačna?</p>",
    [
      "Mogu se pozvati pre tekstualne deklaracije.",
      "Mogu prirodno biti rekurzivne.",
      "Ne mogu imati <code>ref</code>, <code>out</code> ili <code>in</code> parametre.",
      "Mogu se konvertovati u kompatibilan delegat preko method group-e.",
      "<code>static</code> lokalna funkcija može capture-ovati parametar spoljne metode."
    ],
    [0, 1, 3],
    "Lokalne funkcije imaju ime, podržavaju rekurziju i pune potpise. Static lokalna funkcija ne capture-uje okolno stanje.",
    ["local-functions", "method-group", "ref-out-in"]
  ),
  choice(
    23,
    "<p>Koji fragment se kompajlira i vraća <code>x + 2</code>?</p>",
    [
      "<code>int y; Action a = () =&gt; y = x + 2; return y;</code>",
      "<code>int y; Postavi(); return y; void Postavi() =&gt; y = x + 2;</code>",
      "<code>int y; Func&lt;int&gt; f = () =&gt; y; return f();</code>",
      "<code>int y; if (x &gt; 0) y = x + 2; return y;</code>"
    ],
    [1],
    "Analiza lokalne funkcije vidi da poziv Postavi sigurno dodeljuje y. Samo kreiranje lambde nije dokaz poziva, a ostali fragmenti mogu čitati nedodeljenu promenljivu.",
    ["local-functions", "closures", "definite-assignment"]
  ),
  choice(
    24,
    "<p>Koje funkcije su funkcije višeg reda?</p>",
    [
      "Funkcija koja prima delegat kao parametar.",
      "Funkcija koja vraća delegat.",
      "Funkcija koja samo vraća <code>int</code> i ne prima funkciju.",
      "Funkcija koja i prima i vraća funkciju.",
      "Svaka metoda koja ima više od jednog parametra."
    ],
    [0, 1, 3],
    "Funkcija višeg reda prima funkciju, vraća funkciju ili radi oba; broj običnih parametara nije bitan.",
    ["higher-order-functions", "delegates"]
  ),
  choice(
    25,
    "<p>Šta važi za funkciju <code>PomeriZa</code>?</p><pre><code>static Func&lt;int, int&gt; PomeriZa(int pomeraj)\n    =&gt; x =&gt; x + pomeraj;</code></pre>",
    [
      "Vraća izračunati <code>int</code>.",
      "Vraća funkciju koja kasnije prima <code>int</code>.",
      "Parametar <code>pomeraj</code> ostaje dostupan vraćenoj funkciji kroz closure.",
      "Poziv <code>PomeriZa(5)(3)</code> daje 8.",
      "Kod se ne kompajlira jer je metoda završena pre poziva vraćene funkcije."
    ],
    [1, 2, 3],
    "Rezultat prvog poziva je Func<int, int>; closure čuva pomeraj, pa drugi poziv računa 3 + 5.",
    ["higher-order-functions", "closures", "lambdas"]
  ),
  choice(
    26,
    "<p>Šta vraća <code>GetInvocationList()</code>?</p>",
    [
      "Niz pojedinačnih delegate stavki redom kojim bi bile pozvane.",
      "Niz imena metoda tipa <code>string[]</code>.",
      "Samo poslednju stavku multicast delegata.",
      "Kopiju koju možemo obići radi zasebne obrade svakog handlera."
    ],
    [0, 3],
    "GetInvocationList vraća Delegate[] sa pojedinačnim stavkama u redosledu pozivanja.",
    ["delegates", "multicast", "invocation-list"]
  ),
  choice(
    27,
    "<p>Zašto dugovečan statički event može biti izvor curenja memorije?</p>",
    [
      "Zato što automatski pravi beskonačan broj thread-ova.",
      "Njegova invocation lista može zadržati target objekat instance handlera.",
      "Garbage collector ne može prikupiti target dok je dostupan preko statičke liste.",
      "Odjava handlera može prekinuti tu referencu.",
      "Svaki statički event nužno curi memoriju čak i bez pretplatnika."
    ],
    [1, 2, 3],
    "Statička lista može živeti koliko i proces i tako održavati target pretplatnika dostupnim. Pravovremena odjava prekida vezu.",
    ["events", "delegate-target", "memory-management"]
  ),
  choice(
    28,
    "<p>Šta važi za event sa eksplicitnim <code>add</code> i <code>remove</code> pristupnicima?</p>",
    [
      "Može kontrolisati ili proslediti pretplatu drugom objektu.",
      "Mora imati automatsko backing polje istog imena.",
      "Spoljašnji kod i dalje koristi <code>+=</code> i <code>-=</code>.",
      "Pristupnici se izvršavaju pri pretplati i odjavi.",
      "Takav član više nije event."
    ],
    [0, 2, 3],
    "Custom event ostaje event, ali add/remove određuju gde i kako se handler čuva; automatsko backing polje nije obavezno.",
    ["events", "accessors"]
  ),
  choice(
    29,
    "<p>Šta važi za podrazumevani parametar metode vezane za delegat?</p><pre><code>static int M(int x = 10) =&gt; x;\nFunc&lt;int, int&gt; f = M;</code></pre>",
    [
      "Poziv <code>f()</code> koristi podrazumevanu vrednost 10.",
      "Poziv <code>f()</code> je compile-time greška.",
      "Poziv <code>f(3)</code> vraća 3.",
      "Podrazumevana vrednost menja potpis tipa <code>Func&lt;int, int&gt;</code> u <code>Func&lt;int&gt;</code>.",
      "Delegat određuje oblik poziva."
    ],
    [1, 2, 4],
    "Optional vrednost metode nije deo delegate ugovora. Func<int, int> zahteva jedan argument pri svakom pozivu.",
    ["delegates", "optional-parameters", "compile-time"]
  ),
  choice(
    30,
    "<p>Koje dodele se kompajliraju?</p><pre><code>static bool Paran(int x) =&gt; x % 2 == 0;\nPredicate&lt;int&gt; p = Paran;</code></pre>",
    [
      "<code>Func&lt;int, bool&gt; a = p;</code>",
      "<code>Func&lt;int, bool&gt; b = p.Invoke;</code>",
      "<code>Func&lt;int, bool&gt; c = Paran;</code>",
      "<code>Predicate&lt;int&gt; d = x =&gt; x &gt; 0;</code>",
      "<code>Action&lt;int&gt; e = p.Invoke;</code>"
    ],
    [1, 2, 3],
    "Predicate<int> i Func<int, bool> su različiti delegate tipovi. p.Invoke je nova kompatibilna method group, dok Action ne prihvata bool rezultat kao void metodu.",
    ["delegates", "func-action-predicate", "method-group", "compile-time"]
  ),
  short(
    31,
    "<p>Šta se ispisuje?</p><pre><code>static int M(int x)\n{\n    int y = 1;\n    Func&lt;int&gt; f = () =&gt; { int z = 1; y++; return x + y + z; };\n    y = 3;\n    return f();\n}\n\nConsole.Write(M(1) + M(2));</code></pre>",
    "13",
    ["13"],
    "Svaki poziv M ima svoj y. Pre lambde y postaje 3, lambda ga poveća na 4, pa pozivi vraćaju 6 i 7. Ovo je obrazac pitanja 31 iz juna 2023.",
    ["lambdas", "closures", "program-output"]
  ),
  short(
    32,
    "<p>Šta se ispisuje?</p><pre><code>class A { }\nclass B : A { }\nclass C : B { }\n\nstatic Func&lt;int, int&gt; Odredi(A o)\n    =&gt; o is B ? x =&gt; x + 5 : x =&gt; x;\n\nA[] niz = { new A(), new B(), new C() };\nforeach (A x in niz)\n    Console.Write(Odredi(x)(2));</code></pre>",
    "277",
    ["277"],
    "A nije B pa daje 2; i B i C zadovoljavaju is B pa daju po 7. Pitanje prati funkciju Odredi sa starih rokova.",
    ["higher-order-functions", "lambdas", "runtime", "program-output"]
  ),
  short(
    33,
    "<p>Koja je vrednost promenljive <code>bilans</code> na kraju?</p><pre><code>class Racun\n{\n    public double Stanje { get; private set; }\n    public event Action&lt;double&gt;? Promena;\n\n    public void Promeni(double iznos)\n    {\n        if (Stanje + iznos &lt; 0) return;\n        Stanje += iznos;\n        Promena?.Invoke(iznos);\n    }\n}\n\ndouble bilans = 500;\nvoid Azuriraj(double x) =&gt; bilans += x;\nRacun r1 = new();\nRacun r2 = new();\nr1.Promeni(100);\nr1.Promena += Azuriraj;\nr2.Promeni(200);\nr1.Promeni(50);\nr2.Promeni(-350);\nr1.Promeni(-550);</code></pre>",
    "550",
    ["550"],
    "Samo uspešna promena +50 na r1 nastaje posle pretplate. r2 ima zaseban event, a nedozvoljena povlačenja ne emituju događaj. Ovo je popravljena varijanta pitanja 36 iz juna 2023.",
    ["events", "closures", "program-output"]
  ),
  short(
    34,
    "<p>Šta se ispisuje?</p><pre><code>delegate void Del(int a, ref int b, int c);\n\nstatic void Plus(int a, ref int b, int c) =&gt; b += c;\nstatic void Minus(int a, ref int b, int c) =&gt; b -= c;\nstatic void Puta(int a, ref int b, int c) =&gt; b *= c;\n\nDel d = Minus;\nd += Puta;\nd = Plus;\nd += Plus;\nd += Minus;\nd += Plus;\nd -= Plus;\n\nint x = 8, y = 4, z = 5;\nd(x, ref y, z);\nConsole.Write(x - y);</code></pre>",
    "-1",
    ["-1"],
    "Dodela briše Minus i Puta. Poslednje -= uklanja poslednji Plus, pa [Plus, Plus, Minus] menja y: 4→9→14→9. x ostaje 8, zato je rezultat -1. Ovo je pitanje 37 sa rokova iz 2023.",
    ["delegates", "multicast", "ref-out-in", "program-output"]
  ),
  short(
    35,
    "<p>Šta se ispisuje?</p><pre><code>class A { public virtual string M() =&gt; \"A\"; }\nclass B : A { public override string M() =&gt; \"B\"; }\n\nA x = new B();\nFunc&lt;string&gt; f = x.M;\nx = new A();\nConsole.Write(f() + x.M());</code></pre>",
    "BA",
    ["ba"],
    "Delegat je pri kreiranju sačuvao prvobitni B objekat; kasnija promena promenljive x ne menja njegov target. Direktan x.M poziva novi A objekat.",
    ["delegates", "delegate-target", "virtual-dispatch", "program-output"]
  ),
  short(
    36,
    "<p>Šta se ispisuje?</p><pre><code>List&lt;Action&gt; akcije = new();\nfor (int i = 0; i &lt; 3; i++)\n{\n    int kopija = i;\n    akcije.Add(() =&gt; Console.Write(kopija));\n}\nforeach (Action a in akcije) a();</code></pre>",
    "012",
    ["012"],
    "Svaka iteracija pravi novu promenljivu kopija, pa lambde ne dele for brojač.",
    ["lambdas", "closures", "loops", "program-output"]
  ),
  short(
    37,
    "<p>Šta se ispisuje?</p><pre><code>class K\n{\n    public event Action? Promena;\n    public void Pokreni() =&gt; Promena?.Invoke();\n}\n\nK k = new();\nint x = 0;\nAction handler = () =&gt; x++;\nk.Promena += handler;\nk.Promena += handler;\nk.Promena -= handler;\nk.Pokreni();\nConsole.Write(x);</code></pre>",
    "1",
    ["1"],
    "Handler je dodat dva puta, a jedno -= uklanja poslednje odgovarajuće pojavljivanje. Preostala stavka povećava x jednom.",
    ["events", "delegate-removal", "closures", "program-output"]
  ),
  short(
    38,
    "<p>Šta se ispisuje?</p><pre><code>static void A() =&gt; Console.Write(\"A\");\nstatic void B() =&gt; Console.Write(\"B\");\n\nAction par = A;\npar += B;\nAction d = A;\nd += B;\nd += A;\nd += B;\nd -= par;\nd();</code></pre>",
    "AB",
    ["ab"],
    "Lista [A,B,A,B] ostaje bez poslednjeg podniza [A,B], pa se pozivaju samo prve dve stavke.",
    ["delegates", "multicast", "delegate-removal", "program-output"]
  ),
  short(
    39,
    "<p>Šta se ispisuje?</p><pre><code>Action d = () =&gt; Console.Write(\"A\");\nd += () =&gt; throw new InvalidOperationException();\nd += () =&gt; Console.Write(\"C\");\n\ntry { d(); }\ncatch (InvalidOperationException) { Console.Write(\"X\"); }</code></pre>",
    "AX",
    ["ax"],
    "Prva stavka ispisuje A. Druga baca izuzetak, C se ne poziva, a catch zatim ispisuje X.",
    ["delegates", "multicast", "exceptions", "program-output"]
  ),
  short(
    40,
    "<p>Šta se ispisuje?</p><pre><code>static Func&lt;int&gt; Brojac()\n{\n    int x = 0;\n    return Sledeci;\n\n    int Sledeci() =&gt; ++x;\n}\n\nFunc&lt;int&gt; a = Brojac();\nFunc&lt;int&gt; b = Brojac();\nConsole.Write($\"{a()}{a()}{b()}\");</code></pre>",
    "121",
    ["121"],
    "Svaki poziv Brojac pravi zasebnu captured promenljivu x. Delegat a je poveća dva puta, a b prvi put.",
    ["local-functions", "closures", "higher-order-functions", "program-output"]
  )
];
