import type { Question } from "../schema";

const lessonId = "drugi-jezici";
const sourceTestId = "drugi-jezici-1";

function choice(
  originalNumber: number,
  prompt: string,
  options: string[],
  correct: number[],
  explanation: string,
  tags: string[]
): Question {
  return {
    id: `drugi-jezici-q${String(originalNumber).padStart(2, "0")}`,
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
    id: `drugi-jezici-q${String(originalNumber).padStart(2, "0")}`,
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

export const otherLanguagesQuestions: Question[] = [
  choice(
    1,
    "<p>Entiteti označeni ključnom rečju <code>private</code> u C++ vidljivi su:</p>",
    [
      "Članovima iste klase.",
      "Članovima izvedene klase.",
      "Članovima prijateljske klase.",
      "Friend funkcijama.",
      "Svim funkcijama."
    ],
    [0, 2, 3],
    "Private članovima neposredno pristupaju članovi klase koja ih deklariše, kao i eksplicitno proglašene friend funkcije i članovi friend klase. Sama izvedena klasa nema tu privilegiju. Ovo je obrazac pitanja 4 iz jula 2022. i pitanja 3 iz aprila 2023.",
    ["cpp", "access-control", "friend", "old-exam"]
  ),
  choice(
    2,
    "<p>Koja tvrđenja o prijateljstvu u C++ su tačna?</p>",
    [
      "Prijateljstvo je automatski simetrično.",
      "Prijatelj prijatelja automatski je prijatelj.",
      "Izvedena klasa prijatelja nasleđuje njegovu privilegiju.",
      "Prijateljstvo se eksplicitno daje u klasi čijim se članovima pristupa.",
      "Friend funkcija ne mora biti član klase, ali može pristupiti njenim privatnim članovima."
    ],
    [3, 4],
    "Prijateljstvo je eksplicitna privilegija i nije ni simetrično, ni tranzitivno, ni nasledno. Friend funkcija ostaje nečlanska funkcija, ali dobija pristup private i protected delu klase koja ju je proglasila prijateljem.",
    ["cpp", "friend", "access-control"]
  ),
  choice(
    3,
    `<p>Koje naredbe su dozvoljene u metodi <code>Izvedena::Test</code>?</p><pre><code>class Baza {
protected:
    int x;
};

class Izvedena : public Baza {
public:
    void Test(Baza&amp; b, Izvedena&amp; d) {
        // ponuđene naredbe
    }
};</code></pre>`,
    [
      "<code>b.x = 1;</code>",
      "<code>d.x = 2;</code>",
      "<code>this-&gt;x = 3;</code>",
      "Protected članu je ovde dozvoljeno pristupiti kroz svaki objekat statičkog tipa <code>Baza</code>."
    ],
    [1, 2],
    "Izvedena klasa poznaje protected član baze, ali za nestatički član važi receiver ograničenje. Pristup kroz objekat mora ići preko izraza statičkog tipa Izvedena ili njenog podtipa; zato b.x nije dozvoljeno, dok d.x i this->x jesu.",
    ["cpp", "protected", "inheritance", "receiver-rule"]
  ),
  choice(
    4,
    "<p>Prema terminologiji pitanja iz aprila 2023, šta obezbeđuje vidljivost interfejsa apstraktnog tipa podataka u C++?</p>",
    [
      "Implementaciona datoteka.",
      "Specifikacioni package.",
      "Public modifikator pristupa.",
      "Public klauzula.",
      "Ništa od navedenog."
    ],
    [3],
    "Očekivani ključ konkretnog starog pitanja jeste public klauzula. Suština je da public deo definicije klase određuje koje operacije korisnički kod sme da pozove; header može sadržati deklaraciju klase, ali sam po sebi ne čini sve članove javnim.",
    ["cpp", "abstract-data-types", "public-interface", "old-exam"]
  ),
  choice(
    5,
    `<p>Koji fragmenti ispisuju <code>4</code> za dati C++ kod? Svaki fragment posmatraj zasebno u globalnom opsegu.</p><pre><code>namespace prvi {
    int vrednost() { return 5; }
    namespace drugi {
        int vrednost() { return 4; }
    }
}</code></pre>`,
    [
      "<code>using drugi::vrednost; std::cout &lt;&lt; vrednost();</code>",
      "<code>using namespace prvi::drugi; std::cout &lt;&lt; vrednost();</code>",
      "<code>std::cout &lt;&lt; vrednost();</code>",
      "<code>std::cout &lt;&lt; prvi::vrednost();</code>",
      "<code>std::cout &lt;&lt; drugi::vrednost();</code>",
      "<code>std::cout &lt;&lt; prvi::drugi::vrednost();</code>"
    ],
    [1, 5],
    "Using direktiva u drugoj opciji uvodi imena iz prvi::drugi među kandidate, dok puna kvalifikacija u poslednjoj opciji neposredno bira istu funkciju. Ime drugi nije globalno, a prvi::vrednost vraća 5. Ovo je pitanje 19 iz aprila 2023.",
    ["cpp", "namespaces", "name-lookup", "using-directive", "old-exam"]
  ),
  choice(
    6,
    "<p>Koja tvrđenja o C++ using deklaracijama i using direktivama su tačna?</p>",
    [
      "Using deklaracija uvodi određeno ime.",
      "Using direktiva čini imena namespace-a kandidatima pri nekvalifikovanoj pretrazi.",
      "Using direktiva fizički kopira deklaracije u trenutni namespace.",
      "Više using direktiva može napraviti dvosmislen poziv.",
      "Using direktiva može promeniti private član u public član."
    ],
    [0, 1, 3],
    "Using deklaracija cilja konkretno ime, a using direktiva utiče na skup kandidata za pretragu. One ne kopiraju deklaracije i ne menjaju dostupnost članova; jednako dobri kandidati iz više prostora imena mogu učiniti poziv dvosmislenim.",
    ["cpp", "namespaces", "name-lookup", "using-declaration", "using-directive"]
  ),
  choice(
    7,
    "<p>Gde je u Javi dostupan član klase koji nema naveden modifikator pristupa?</p>",
    [
      "U sopstvenoj klasi.",
      "U drugim klasama istog package-a.",
      "U nepovezanoj klasi drugog package-a čim se uveze tip koji sadrži član.",
      "U svakoj podklasi drugog package-a.",
      "Svuda gde je dostupna klasa koja sadrži član."
    ],
    [0, 1],
    "Član bez modifikatora ima package-private, odnosno default pristup. Dostupan je kodu svoje klase i drugim klasama istog package-a, ali import ne daje dodatne dozvole kodu izvan tog package-a. Ovo je precizirana verzija pitanja 3 iz jula 2022.",
    ["java", "packages", "package-private", "access-control", "old-exam"]
  ),
  choice(
    8,
    `<p>Koji pristupi protected polju su dozvoljeni u klasi <code>B</code> koja je u drugom package-u od klase <code>A</code>?</p><pre><code>// package p1
public class A { protected int x; }

// package p2
class B extends p1.A {
    void m(B b, p1.A a) {
        // ponuđene naredbe
    }
}</code></pre>`,
    [
      "<code>b.x = 1;</code>",
      "<code>a.x = 2;</code>",
      "Obe naredbe.",
      "Nijedna naredba."
    ],
    [0],
    "Van package-a p1, klasa B koristi protected član kroz nasleđivanje. Receiver nestatičkog člana mora biti izraz tipa B ili njenog podtipa, pa je b.x dozvoljeno, ali pristup kroz proizvoljnu referencu baznog tipa A nije.",
    ["java", "protected", "packages", "inheritance", "receiver-rule"]
  ),
  choice(
    9,
    "<p>Koja tvrđenja o Java package-ima i naredbi <code>import</code> su tačna?</p>",
    [
      "Import omogućava korišćenje kraćeg imena tipa, ali ne povećava dostupnost njegovih članova.",
      "Package pripadnost klase određuje package deklaracija.",
      "Sam folder uvek određuje package-private pristup, bez obzira na package deklaraciju.",
      "Importovani package-private član postaje public."
    ],
    [0, 1],
    "Import učestvuje u razrešavanju imena, a ne u kontroli pristupa. Package deklaracija određuje logičku pripadnost paketu; raspored direktorijuma treba da je prati zbog alata, ali sam ne menja pravila jezika.",
    ["java", "packages", "imports", "access-control", "name-lookup"]
  ),
  choice(
    10,
    "<p>Koja Ada klauzula eliminiše potrebu za eksplicitnom kvalifikacijom referenci na vidljive deklaracije paketa?</p>",
    [
      "<code>include</code>",
      "<code>import</code>",
      "<code>with</code>",
      "<code>use</code>",
      "<code>using</code>"
    ],
    [3],
    "Klauzula use čini vidljive deklaracije paketa neposredno vidljivim, pa se može izostaviti ime paketa ispred deklaracije. Klauzula with uspostavlja zavisnost, ali sama ostavlja potrebu za proširenim imenom. Ovo je pitanje 2 iz juna 2023.",
    ["ada", "packages", "use-clause", "name-visibility", "old-exam"]
  ),
  choice(
    11,
    "<p>Koja tvrđenja o Ada klauzulama <code>with</code> i <code>use</code> su tačna?</p>",
    [
      "<code>with</code> uspostavlja zavisnost i omogućava kvalifikovano imenovanje paketa.",
      "<code>use</code> čini vidljive deklaracije paketa neposredno vidljivim.",
      "<code>use</code> zaobilazi privatnost paketa.",
      "Dva korišćena paketa mogu dati dvosmisleno neposredno ime.",
      "<code>use</code> uvek potpuno zamenjuje potrebu za <code>with</code>."
    ],
    [0, 1, 3],
    "With i use rešavaju različite probleme: prvi navodi zavisnost, a drugi uklanja potrebu za eksplicitnom kvalifikacijom dostupnih deklaracija. Use ne otkriva privatni deo i može izazvati sukob neposrednih imena.",
    ["ada", "packages", "with-clause", "use-clause", "name-visibility"]
  ),
  choice(
    12,
    "<p>Lambda izraz predstavlja:</p>",
    [
      "Tip promenljive.",
      "Apstraktnu klasu.",
      "Selekciju.",
      "Funkciju.",
      "Činjenicu."
    ],
    [3],
    "Lambda izraz zapisuje funkciju navođenjem njenih parametara i tela. Ovo pitanje se pojavljuje u julu 2022. i junu 2023. sa istim očekivanim odgovorom.",
    ["functional-programming", "lambda-expressions", "functions", "old-exam"]
  ),
  choice(
    13,
    "<p>Kako se u Lispu zapisuje primena funkcije <code>c</code> na argumente <code>a</code> i <code>b</code>?</p>",
    [
      "<code>a c b</code>",
      "<code>a b c</code>",
      "<code>c (a b)</code>",
      "<code>c a b</code>",
      "<code>(a b c)</code>",
      "<code>(c a b)</code>"
    ],
    [5],
    "Lisp koristi prefiksnu sintaksu: operator ili ime funkcije nalazi se na prvom mestu liste, a zatim slede argumenti. Zato je osnovni oblik poziva (c a b). Ovo je pitanje 7 iz jula 2022.",
    ["lisp", "function-application", "prefix-syntax", "old-exam"]
  ),
  choice(
    14,
    "<p>Prema konvenciji pitanja iz aprila 2023, šta predstavlja necitirana forma <code>(a b c)</code> kada se nalazi u evaluacionom kontekstu?</p>",
    [
      "Atom.",
      "Promenljivu.",
      "Prostu listu po svojoj sintaksnoj strukturi.",
      "Ugnježdenu listu.",
      "Definiciju funkcije.",
      "Primenu funkcije, sa <code>a</code> na mestu operatora."
    ],
    [2, 5],
    "Stari rok očekuje odgovore prosta lista i primena funkcije: forma je sintaksno lista atoma, a pri evaluaciji se prvo mesto tumači kao operator. Ograda je važna: citirana forma '(a b c) predstavlja samo podatak i tada se ne izvršava kao poziv.",
    ["lisp", "lists", "function-application", "evaluation", "quote", "old-exam"]
  ),
  choice(
    15,
    "<p>Koliko elemenata na spoljašnjem nivou sadrži Lisp lista <code>((1 (2 3)) 4 5 (6 7 8) 9)</code>?</p>",
    ["<code>9</code>", "<code>7</code>", "<code>5</code>", "<code>4</code>", "<code>3</code>", "<code>1</code>"],
    [2],
    "Spoljašnji elementi su (1 (2 3)), 4, 5, (6 7 8) i 9, ukupno pet. Unutrašnji numerički atomi ne dodaju elemente spoljašnjoj listi. Ovo je pitanje 7 iz juna 2023.",
    ["lisp", "lists", "nested-lists", "length", "old-exam"]
  ),
  choice(
    16,
    "<p>Koja tvrđenja o atomima i listama u Common Lispu su tačna?</p>",
    [
      "Simbol <code>a</code> je atom.",
      "Broj <code>42</code> je atom.",
      "Prazna lista <code>()</code> nije atom.",
      "Dotted pair <code>(a . b)</code> je cons ćelija i zato nije atom.",
      "Dotted pair <code>(a . b)</code> je proper lista."
    ],
    [0, 1, 3],
    "U Common Lispu atom je sve što nije cons ćelija. Simboli i brojevi su atomi, a NIL odnosno () ima poseban dvostruki status prazne liste i atoma. Dotted pair jeste cons, ali mu rep nije lista, pa nije proper lista.",
    ["lisp", "atoms", "lists", "cons-cells", "common-lisp"]
  ),
  choice(
    17,
    "<p>Koje koncepte Standard ML nesporno podržava u smislu pitanja iz jula 2022?</p>",
    [
      "Ponovno imperativno dodeljivanje običnom <code>val</code> vezivanju.",
      "Primenu funkcije.",
      "Korisničku logičku unifikaciju termina kao u Prologu.",
      "Promenljive i vezivanja."
    ],
    [1, 3],
    "Nesporni odgovori starog pitanja su primena funkcije i promenljive. Ograda: Standard ML ima promenljivo stanje preko referenci i operatora :=, a zaključivanje tipova interno koristi unifikaciju tipskih izraza. Zato apsolutne tvrdnje da ML nema dodelu ili unifikaciju nisu precizne bez objašnjenja značenja tih pojmova.",
    ["standard-ml", "function-application", "bindings", "old-exam", "terminology"]
  ),
  choice(
    18,
    "<p>Koja tvrđenja o vezivanjima i referencama u Standard ML-u su tačna?</p>",
    [
      "Obično <code>val</code> vezivanje nije promenljiva kutija kojoj se kasnije dodeljuje druga vrednost.",
      "Novo vezivanje istog imena može zaseniti ranije vezivanje bez menjanja stare vrednosti.",
      "Izraz <code>ref 1</code> pravi promenljivu referentnu ćeliju.",
      "Naredba <code>r := 2</code> dodeljuje novu vrednost referenci <code>r</code>.",
      "Izraz <code>!r</code> pravi novu referencu."
    ],
    [0, 1, 2, 3],
    "Val uvodi vezivanje koje se ne menja; ponovljeno ime uvodi novo vezivanje. Mutable stanje je eksplicitno: ref pravi ćeliju, := je menja, a ! samo čita odnosno dereferencira postojeću ćeliju.",
    ["standard-ml", "bindings", "references", "assignment", "shadowing"]
  ),
  choice(
    19,
    "<p>Koja tvrđenja o zaključivanju tipova u Standard ML-u su tačna?</p>",
    [
      "<code>fun identitet x = x</code> ima tip <code>'a -&gt; 'a</code>.",
      "<code>fun par (x, y) = (y, x)</code> ima tip <code>'a * 'b -&gt; 'b * 'a</code>.",
      "Upotreba izraza <code>x + 1</code> ne postavlja nikakvo ograničenje tipu promenljive <code>x</code>.",
      "Operator <code>-&gt;</code> u funkcijskom tipu je levo asocijativan.",
      "Unifikacija tipskih izraza ista je korisnička operacija kao Prolog predikat <code>=/2</code>."
    ],
    [0, 1],
    "Identitet ne zahteva konkretan tip, a funkcija par samo zamenjuje mesta dvama potencijalno različitim tipovima. Aritmetički operator ograničava tip operanda, strelica se čita desno asocijativno, a interna tipska unifikacija nije isto što i unifikacija termina u Prolog programu.",
    ["standard-ml", "type-inference", "polymorphism", "function-types"]
  ),
  choice(
    20,
    "<p>Koje koncepte podržava Prolog prema klasifikaciji pitanja iz aprila 2023?</p>",
    [
      "Imperativno dodeljivanje.",
      "Primenu funkcija u Lisp smislu.",
      "Unifikaciju.",
      "Razmenu poruka.",
      "Imperativnu selekciju.",
      "Promenljive."
    ],
    [2, 5],
    "Očekivani odgovori starog roka su unifikacija i promenljive. Prolog gradi dokaze unifikacijom termina i vezivanjem logičkih promenljivih; ta vezivanja nisu promenljive kutije koje se prepisuju kao u imperativnom jeziku.",
    ["prolog", "unification", "logic-variables", "old-exam"]
  ),
  choice(
    21,
    "<p>Koja tvrđenja o osnovnoj Prolog sintaksi su tačna?</p>",
    [
      "Tačka završava klauzulu.",
      "Ime sa velikim početnim slovom tipično označava promenljivu.",
      "Zarez u telu pravila predstavlja konjunkciju ciljeva.",
      "Više klauzula istog predikata predstavlja alternative.",
      "Svaka činjenica mora sadržati operator <code>:-</code>."
    ],
    [0, 1, 2, 3],
    "Činjenica je bezuslovna klauzula i zato nema telo ni operator :-, dok pravilo tim operatorom odvaja glavu od tela. Ciljevi razdvojeni zarezom moraju svi uspeti, a naredne klauzule daju naredne alternative.",
    ["prolog", "facts", "rules", "syntax", "conjunction"]
  ),
  choice(
    22,
    `<p>Koja tvrđenja o Prolog izrazima <code>is</code> i <code>=</code> su tačna?</p><pre><code>X is 2 + 3.
Y = 2 + 3.</code></pre>`,
    [
      "Prvi izraz vezuje <code>X</code> za broj <code>5</code>.",
      "Drugi izraz vezuje <code>Y</code> za strukturu <code>2+3</code>, bez aritmetičkog izračunavanja.",
      "Oba izraza vezuju promenljivu za broj <code>5</code>.",
      "Operator <code>is</code> ne evaluira desnu stranu."
    ],
    [0, 1],
    "Operator is prvo aritmetički evaluira desnu stranu, pa rezultat unifikuje sa levom. Obični = samo unifikuje termine, tako da izraz 2+3 ostaje složeni termin, a ne postaje broj 5.",
    ["prolog", "arithmetic", "is-operator", "unification"]
  ),
  choice(
    23,
    "<p>Šta je rezultat sledeće Prolog unifikacije?</p><pre><code>f(X, b) = f(a, Y).</code></pre>",
    [
      "<code>X = a, Y = b</code>",
      "<code>X = b, Y = a</code>",
      "<code>X = Y</code>",
      "<code>false</code>"
    ],
    [0],
    "Spoljašnji funktori i arnosti su jednaki, pa se argumenti unifikuju po pozicijama. Prvi par daje X=a, a drugi Y=b; ograničenja nisu u sukobu.",
    ["prolog", "unification", "terms"]
  ),
  choice(
    24,
    "<p>Šta je rezultat sledeće Prolog unifikacije?</p><pre><code>f(X, X) = f(a, b).</code></pre>",
    [
      "<code>X = a</code>",
      "<code>X = b</code>",
      "<code>X = f(a, b)</code>",
      "<code>false</code>"
    ],
    [3],
    "Prvo pojavljivanje promenljive zahteva X=a, ali drugo bi tada zahtevalo a=b. Pošto su a i b različiti atomi, ne postoji dosledna zamena i unifikacija ne uspeva.",
    ["prolog", "unification", "logic-variables", "failure"]
  ),
  choice(
    25,
    `<p>Sa kojim vrednostima se promenljiva <code>X</code> unificira tokom svih rešenja upita <code>?- t(m, X).</code>?</p><pre><code>p(b,a).      p(m,b).      p(m,c).      p(b,f).
q(e,d).      q(m,f).      r(m,e).      r(e,m).
s(X,Y) :- p(X,Y).
s(X,Y) :- r(X,Y).
t(X,Y) :- s(X,Z), s(Z,Y).</code></pre>`,
    ["<code>a</code>", "<code>b</code>", "<code>c</code>", "<code>f</code>", "<code>m</code>", "<code>e</code>"],
    [0, 3, 4],
    "Redosled rešenja je a, f, m. Put preko p(m,b) daje a i f; p(m,c) nema nastavak; zatim r(m,e) i r(e,m) daju m. U junskom roku 2023 među ponuđenim odgovorima bili su a i f, ali iz samog programa sledi i dodatno rešenje m, pa ga ispravljena verzija pitanja mora priznati.",
    ["prolog", "backtracking", "search-order", "unification", "old-exam"]
  ),
  choice(
    26,
    "<p>Koja tvrđenja opisuju uobičajeni operativni redosled Prolog pretrage?</p>",
    [
      "Klauzule predikata pokušavaju se odozgo nadole.",
      "Ciljevi u telu pravila obrađuju se sleva nadesno.",
      "Backtracking se vraća na poslednju tačku izbora.",
      "Redosled klauzula i ciljeva može uticati na red odgovora i završavanje pretrage.",
      "Sve alternative se standardno ispituju paralelno."
    ],
    [0, 1, 2, 3],
    "Tipičan Prolog koristi dubinsku pretragu po tekstualnom redosledu. Kada cilj padne ili se zatraži sledeće rešenje, poništavaju se odgovarajuća vezivanja i bira naredna alternativa na poslednjoj tački izbora.",
    ["prolog", "backtracking", "depth-first-search", "search-order"]
  ),
  choice(
    27,
    "<p>Koja tvrđenja o currying-u i parcijalnoj primeni u Haskellu su tačna?</p>",
    [
      "Tip <code>a -&gt; b -&gt; c</code> znači <code>a -&gt; (b -&gt; c)</code>.",
      "Primena <code>f x y</code> znači <code>(f x) y</code>.",
      "Primena manje argumenata nego što curried funkcija očekuje može vratiti novu funkciju.",
      "Definicija <code>g (x, y)</code> prima jedan par, dok <code>f x y</code> prima argumente uzastopno.",
      "Parcijalna primena zahteva posebnu ključnu reč."
    ],
    [0, 1, 2, 3],
    "Strelica u tipu je desno asocijativna, a funkcijska primena levo asocijativna. Zato curried funkcija posle prvog argumenta može vratiti funkciju za preostale argumente, bez posebne sintakse.",
    ["haskell", "currying", "partial-application", "function-types"]
  ),
  choice(
    28,
    `<p>Šta je rezultat sledećeg ispravnog Haskell izraza?</p><pre><code>f a b c d e f = a - b * c + d * e - f
f1 = f 1
f2 = f1 2 3
f3 = f2 4
f3 5 6</code></pre>`,
    ["<code>-2</code>", "<code>-6</code>", "<code>9</code>", "<code>15</code>", "Neka druga vrednost."],
    [2],
    "Parcijalne primene zajedno grade puni poziv f 1 2 3 4 5 6. Račun je 1 - 2*3 + 4*5 - 6 = 1 - 6 + 20 - 6 = 9. Ovo je pitanje 27 iz jula 2022.",
    ["haskell", "currying", "partial-application", "arithmetic", "old-exam"]
  ),
  choice(
    29,
    `<p>Šta je rezultat sledećeg ispravnog Haskell izraza?</p><pre><code>f a b c d e = a - b * c + d * e
f1 = f 1
f2 = f1 2
f3 = f2 3
f3 4 5</code></pre>`,
    ["<code>-2</code>", "<code>-6</code>", "<code>-10</code>", "<code>15</code>", "Neka druga vrednost."],
    [3],
    "Vezivanja popunjavaju argumente redom, pa završni izraz znači f 1 2 3 4 5. Rezultat je 1 - 2*3 + 4*5 = 1 - 6 + 20 = 15. Ovo je pitanje 28 iz juna 2023.",
    ["haskell", "currying", "partial-application", "arithmetic", "old-exam"]
  ),
  choice(
    30,
    "<p>Prema klasifikaciji korišćenoj u pitanju o „Pi Scala” iz juna 2023, koji su odgovori bili očekivani?</p>",
    [
      "Dodeljivanje.",
      "Primena funkcija.",
      "Unifikacija.",
      "Razmena poruka.",
      "Selekcija.",
      "Promenljive."
    ],
    [1, 3, 5],
    "Očekivani ključ konkretnog roka je primena funkcija, razmena poruka i promenljive. Teorijska ograda: naziv u transkriptu verovatno označava pi-calculus, čije su nesporne osnovne ideje procesi, imena kanala, komunikacioni prefiksi i supstitucija. Primena funkcija nije univerzalno zasebna konstrukcija svakog minimalnog prikaza pi-calculusa, pa kombinaciju B, D i F treba pamtiti kao ključ tog roka, ne kao potpunu univerzalnu definiciju.",
    ["pi-calculus", "message-passing", "process-calculi", "old-exam", "terminology"]
  ),
  short(
    31,
    `<p>Šta ispisuje sledeći C++ fragment?</p><pre><code>namespace prvi {
    int vrednost() { return 5; }
    namespace drugi {
        int vrednost() { return 4; }
    }
}

std::cout &lt;&lt; prvi::vrednost()
          &lt;&lt; ":"
          &lt;&lt; prvi::drugi::vrednost();</code></pre>`,
    "5:4",
    ["5:4"],
    "Puna kvalifikacija prvi::vrednost bira spoljašnju funkciju koja vraća 5, a prvi::drugi::vrednost ugnježdenu funkciju koja vraća 4. Dvotačka je običan string između rezultata.",
    ["cpp", "namespaces", "qualified-names", "program-output"]
  ),
  short(
    32,
    "<p>Koji rezultat vraća Common Lisp izraz?</p><pre><code>(length '((a b) c (d (e)) f))</code></pre>",
    "4",
    ["4"],
    "Length broji samo elemente spoljašnje liste: (a b), c, (d (e)) i f. Citiranje sprečava evaluaciju liste kao poziva i omogućava da se struktura posmatra kao podatak.",
    ["lisp", "lists", "nested-lists", "length", "quote"]
  ),
  short(
    33,
    "<p>Napiši najopštiji tip koji Standard ML zaključuje za funkciju:</p><pre><code>fun par (x, y) = (y, x)</code></pre>",
    "'a * 'b -> 'b * 'a",
    ["'a*'b->'b*'a"],
    "Ulaz je par potencijalno različitih tipova 'a i 'b, a rezultat isti par sa zamenjenim mestima. Funkcija ne koristi operacije koje bi te tipske promenljive ograničile na konkretne tipove.",
    ["standard-ml", "type-inference", "polymorphism", "tuples"]
  ),
  short(
    34,
    `<p>Napiši redosled svih vrednosti promenljive <code>X</code> za upit <code>?- t(m, X).</code>, odvojenih zarezima.</p><pre><code>p(b,a).      p(m,b).      p(m,c).      p(b,f).
q(e,d).      q(m,f).      r(m,e).      r(e,m).
s(X,Y) :- p(X,Y).
s(X,Y) :- r(X,Y).
t(X,Y) :- s(X,Z), s(Z,Y).</code></pre>`,
    "a,f,m",
    ["a,f,m", "a;f;m", "a|f|m"],
    "Prvo Z=b preko p(m,b), pa drugi cilj daje X=a i X=f. Grana Z=c pada. Posle backtracking-a prva s klauzula prelazi na r(m,e), a s(e,X) preko r(e,m) daje X=m. To treće rešenje nije bilo ponuđeno na starom roku, ali pripada programu.",
    ["prolog", "backtracking", "search-order", "unification", "old-exam"]
  ),
  short(
    35,
    `<p>Napiši redom sve vrednosti promenljive <code>Q</code> za upit <code>?- t(P, c, Q).</code>, odvojene zarezima.</p><pre><code>p(m,b,3). p(c,e,2). p(e,c,4.5).
q(a,d,5). q(b,e,2). q(c,a,6).
r(b,f,4). r(e,b,3.5). r(m,g,5).

s(X,Y,V) :- p(X,Y,V).
s(X,Y,V) :- r(X,Y,V).
t(X,Y,Z) :- s(X,A,Z1), q(A,B,Z2), s(Y,B,Z3),
             Z is Z1 + Z2 + Z3.</code></pre>`,
    "7,7.5",
    ["7,7.5", "7;7.5", "7|7.5", "7;7,5"],
    "Prvo rešenje koristi p(m,b,3), q(b,e,2) i p(c,e,2), pa je Q=7. Posle iscrpljivanja p/3 alternativa pretraga prelazi na r(e,b,3.5), uz ista naredna dva koraka, pa dobija Q=7.5. Redosled s klauzula zato određuje i red rezultata.",
    ["prolog", "backtracking", "arithmetic", "search-order", "old-exam"]
  ),
  short(
    36,
    `<p>Napiši vezivanja <code>P</code>, <code>Q</code> i <code>C</code> za jedino rešenje upita <code>?- put(P,Q,C).</code> u obliku <code>m,c,0.5</code>.</p><pre><code>autom(m,b,3). autom(c,e,2). autom(e,c,4.5).
vozom(a,d,5). vozom(b,e,0.5). vozom(c,a,6).
avionom(b,f,4). avionom(e,b,3.5). avionom(e,c,5).

put(X,Y,Z) :- autom(X,A,Z1), vozom(A,B,Z2),
              avionom(B,Y,Z3), autom(Y,B,Z4),
              Z is Z1 + Z2 - Z3 + Z4.</code></pre>`,
    "m,c,0.5",
    ["m,c,0.5", "m;c;0.5", "m|c|0.5", "p=m,q=c,c=0.5"],
    "Lanac je autom(m,b,3), vozom(b,e,0.5), avionom(e,c,5) i autom(c,e,2). Zato su P=m i Q=c, a C=3+0.5-5+2=0.5. Ovo je čitljiva verzija pitanja 39 iz aprila 2023.",
    ["prolog", "unification", "backtracking", "arithmetic", "old-exam"]
  ),
  short(
    37,
    `<p>Koji je ishod sledećeg koda pre bilo kakvog pokušaja da se izračuna brojčani rezultat?</p><pre><code>raspon n = n : raspon (n - 2)
f a b c = a + b * c
f1 = f 2 3
funkcija [element] = 1
funkcija (prvi:drugirep)
    | drugi &gt;= 0 = funkcija [drugi:rep] + (f1 prvi)
    | drugi &lt; 0 = 1
funkcija (raspon 3)</code></pre>`,
    "Kod se ne kompajlira",
    ["kod se ne kompajlira", "compile error", "greska pri kompilaciji", "greška pri kompilaciji", "nema rezultata"],
    "Original iz juna 2023. nije ispravan Haskell. Obrazac (prvi:drugirep) vezuje samo imena prvi i drugirep, pa su drugi i rep u telu van opsega; zapis funkcija [drugi:rep] takođe nije ispravan način prosleđivanja tako konstruisane liste. Zbog compile grešaka nema brojčanog rezultata i kod se ne sme prećutno popravljati.",
    ["haskell", "pattern-matching", "lists", "compile-time", "old-exam"]
  ),
  short(
    38,
    `<p>Koji rezultat daje sledeći Haskell izraz?</p><pre><code>raspon n = n + 1 : raspon (n - 3)
funkcija [element] = 1
funkcija (prvi:drugi:rep)
    | drugi &gt; 0 = funkcija (drugi:rep) + prvi
    | drugi &lt; 0 = 2

funkcija (raspon 10)</code></pre>`,
    "26",
    ["26"],
    "Raspon počinje sa 11, 8, 5, 2, -1. Rekurzija sabira 11, 8 i 5, a kada drugi element postane -1 aktivira se grana koja vraća 2. Rezultat je 2+5+8+11=26; lenja evaluacija ne zahteva izračunavanje cele beskonačne liste. Ovo je pitanje 40 iz aprila 2023.",
    ["haskell", "lazy-evaluation", "infinite-lists", "guards", "recursion", "old-exam"]
  ),
  short(
    39,
    `<p>Koji rezultat daje sledeći Haskell izraz?</p><pre><code>raspon n = n + 1 : raspon (n - 3)
take 5 (raspon 10)</code></pre>`,
    "[11,8,5,2,-1]",
    ["[11,8,5,2,-1]", "11,8,5,2,-1"],
    "Svaki sledeći poziv smanjuje argument za 3, a glava je za jedan veća od trenutnog argumenta. Take zahteva samo prvih pet elemenata beskonačne liste, pa se dobijaju 11, 8, 5, 2 i -1.",
    ["haskell", "lazy-evaluation", "infinite-lists", "list-processing"]
  ),
  short(
    40,
    "<p>Redukuj jedan komunikacioni korak pi-calculusa:</p><pre><code>x&lt;z&gt;.P | x(y).Q</code></pre><p>Koristi oblik supstitucije iz lekcije.</p>",
    "P | Q{z/y}",
    ["p|q{z/y}", "p|q[z/y]"],
    "Izlaz i ulaz koriste isti kanal x, pa mogu komunicirati. Izlaz šalje ime z, a slobodna pojavljivanja ulaznog parametra y u nastavku Q zamenjuju se imenom z, uz izbegavanje hvatanja promenljivih. Nastavci zato postaju P | Q{z/y}.",
    ["pi-calculus", "communication", "message-passing", "substitution", "process-reduction"]
  )
];
