import type { Question } from "../schema";

const lessonId = "apstraktni-tipovi-i-enkapsulacija";
const sourceTestId = "apstraktni-tipovi-i-enkapsulacija-1";

function choice(
  originalNumber: number,
  prompt: string,
  options: string[],
  correct: number[],
  explanation: string,
  tags: string[]
): Question {
  return {
    id: `apstraktni-tipovi-i-enkapsulacija-q${String(originalNumber).padStart(2, "0")}`,
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
    id: `apstraktni-tipovi-i-enkapsulacija-q${String(originalNumber).padStart(2, "0")}`,
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

export const apstraktniTipoviIEnkapsulacijaQuestions: Question[] = [
  choice(
    1,
    "<p>Koja tvrđenja ispravno opisuju apstraktni tip podataka (ADT)?</p>",
    [
      "Određuje skup mogućih vrednosti i dozvoljenih operacija.",
      "Korisniku obavezno propisuje tačnu internu reprezentaciju.",
      "Može biti specifikovan nezavisno od konkretnog programskog jezika.",
      "Obavezno zahteva nasleđivanje.",
      "Korisnički kod mora poznavati algoritme svih operacija."
    ],
    [0, 2],
    "ADT opisuje vrednosti i operacije kao ugovor, bez obaveze da klijentu otkrije konkretnu reprezentaciju. Nasleđivanje i konkretni algoritmi mogu učestvovati u implementaciji, ali nisu deo same definicije ADT-a.",
    ["adt", "specification"]
  ),
  choice(
    2,
    "<p>Šta korisnik dobro specifikovanog ADT-a treba da vidi?</p>",
    [
      "Naziv tipa.",
      "Javne operacije.",
      "Ugovor javnih operacija.",
      "Raspored privatnih polja u memoriji.",
      "Pomoćne algoritme implementacije."
    ],
    [0, 1, 2],
    "Klijentski pogled čine ime tipa, dostupne operacije i njihovo ponašanje. Raspored polja i pomoćni algoritmi pripadaju implementaciji i treba da ostanu skriveni.",
    ["adt", "interface", "visibility"]
  ),
  choice(
    3,
    "<p>Korisniku apstraktnog tipa podataka <strong>nisu</strong> vidljivi:</p>",
    [
      "Naziv tipa.",
      "Reprezentacija tipa.",
      "Javne operacije.",
      "Implementacija operacija."
    ],
    [1, 3],
    "Korisnik mora znati ime tipa i koje javne operacije postoje, ali ne treba da vidi konkretnu reprezentaciju ni algoritme kojima su operacije realizovane. Ovo je obrazac prvog pitanja iz juna 2023.",
    ["adt", "visibility", "old-exam"]
  ),
  choice(
    4,
    "<p>Najvažnije karakteristike apstraktnog tipa podataka u terminologiji starih rokova su:</p>",
    [
      "Skrivanje informacija.",
      "Parametrizacija.",
      "Polimorfizam.",
      "Nasleđivanje.",
      "Enkapsulacija."
    ],
    [0, 4],
    "Aprilski rok iz 2023. kao traženi par navodi skrivanje informacija i enkapsulaciju. Parametrizacija, polimorfizam i nasleđivanje jesu važni koncepti, ali nisu osnovni par u ovom pitanju.",
    ["adt", "information-hiding", "encapsulation", "old-exam"]
  ),
  choice(
    5,
    "<p>Koja tvrđenja pravilno razlikuju ADT od apstraktne klase?</p>",
    [
      "ADT je jezički nezavisan koncept specifikacije tipa.",
      "Apstraktna klasa je konkretna objektno orijentisana konstrukcija.",
      "ADT ne zahteva nasleđivanje.",
      "Svaki ADT mora biti implementiran apstraktnom klasom.",
      "ADT i apstraktna klasa su sinonimi."
    ],
    [0, 1, 2],
    "ADT opisuje ugovor vrednosti i operacija, dok je apstraktna klasa jedna jezička konstrukcija koja može pomoći u implementaciji. ADT se može realizovati i modulom, paketom, običnom klasom ili C interfejsom bez nasleđivanja.",
    ["adt", "abstract-classes"]
  ),
  choice(
    6,
    "<p>Koje stavke mogu biti deo specifikacije javne operacije ADT-a?</p>",
    [
      "Potpis operacije.",
      "Tip rezultata.",
      "Preduslov.",
      "Postuslov.",
      "Moguće greške ili izuzeci.",
      "Tačna adresa na kojoj se čuvaju podaci."
    ],
    [0, 1, 2, 3, 4],
    "Specifikacija govori kako se operacija poziva i šta garantuje, uključujući uslove i greške. Fizička lokacija podataka je promenljiv implementacioni detalj, a ne deo javnog ugovora.",
    ["adt", "contracts", "preconditions", "postconditions"]
  ),
  choice(
    7,
    "<p>Koja tvrđenja o skrivanju informacija su tačna?</p>",
    [
      "Promenljive projektantske odluke zatvara iza stabilnog interfejsa.",
      "Može sakriti pomoćne funkcije i konkretne algoritme.",
      "Isto je što i kriptografska zaštita memorije.",
      "Modifikatori pristupa su jedan od mehanizama njegove realizacije.",
      "Princip je širi od same upotrebe ključne reči <code>private</code>."
    ],
    [0, 1, 3, 4],
    "Skrivanje informacija je princip projektovanja, a modifikatori pristupa su samo jedan način da se sprovede. Ono ne obećava zaštitu od debagera, refleksije ili čitanja memorije i zato nije kriptografska tajnost.",
    ["information-hiding", "accessibility"]
  ),
  choice(
    8,
    "<p>Koja tvrđenja pravilno razlikuju enkapsulaciju i skrivanje informacija?</p>",
    [
      "Enkapsulacija grupiše povezane podatke i operacije i pravi granicu.",
      "Skrivanje informacija kontroliše izlaganje implementacionih detalja.",
      "Pojmovi su povezani, ali nisu potpuni sinonimi.",
      "Svako grupisanje automatski savršeno skriva reprezentaciju.",
      "Enkapsulacija postoji samo u objektno orijentisanim jezicima."
    ],
    [0, 1, 2],
    "Enkapsulacija obezbeđuje programsku jedinicu i granicu, a skrivanje informacija određuje koje odluke ostaju iza te granice. Moduli i paketi u neobjektnim jezicima takođe mogu pružiti enkapsulaciju.",
    ["encapsulation", "information-hiding"]
  ),
  choice(
    9,
    "<p>Klasa steka javno vraća svoju internu promenljivu listu. Koje posledice i popravke su tačno opisane?</p>",
    [
      "Korisnik može zaobići operacije steka i narušiti invarijantu.",
      "Privatno backing polje samo po sebi potpuno rešava problem.",
      "Interfejs sa operacijama <code>Push</code>, <code>Pop</code> i <code>Peek</code> bolje skriva reprezentaciju.",
      "Vraćanje kopije ili read-only pogleda može smanjiti curenje reprezentacije.",
      "Kasnija promena interne reprezentacije postaje teža."
    ],
    [0, 2, 3, 4],
    "Javno dostupna promenljiva kolekcija praktično izlaže reprezentaciju čak i kada je backing polje privatno. Kontrolisane operacije, kopija ili read-only pogled čuvaju invarijantu i smanjuju vezivanje klijenta za implementaciju.",
    ["representation-exposure", "information-hiding", "invariants"]
  ),
  choice(
    10,
    "<p>Koja tvrđenja o reprezentacionoj invarijanti su tačna?</p>",
    [
      "Opisuje dozvoljena konkretna stanja tipa.",
      "Konstruktor treba da je uspostavi.",
      "Svaka javna operacija treba da je očuva.",
      "Korisnik treba neposredno da menja reprezentaciju radi njenog održavanja.",
      "Tokom interne implementacije operacije može privremeno biti narušena."
    ],
    [0, 1, 2, 4],
    "Invarijanta važi na javno vidljivim granicama: konstruktor je uspostavlja, a operacije je ponovo garantuju po završetku. Skrivanje reprezentacije sprečava klijenta da napravi stanje koje operacije ne kontrolišu.",
    ["adt", "representation-invariant"]
  ),
  choice(
    11,
    "<p>Koja tvrđenja opisuju nezavisnost od reprezentacije?</p>",
    [
      "Stek može preći sa niza na povezanu listu.",
      "Korisnički kod može ostati nepromenjen ako javni ugovor ostane isti.",
      "Javno izlaganje interne promenljive kolekcije slabi nezavisnost.",
      "Promena privatnog algoritma uvek zahteva promenu javnog API-ja.",
      "Stabilan interfejs odvaja klijenta od implementacije."
    ],
    [0, 1, 2, 4],
    "Nezavisnost od reprezentacije omogućava zamenu strukture podataka ili algoritma bez izmene klijenata. Ona prestaje da bude pouzdana kada javni API otkrije konkretne promenljive strukture implementacije.",
    ["adt", "representation-independence"]
  ),
  choice(
    12,
    "<p>Koja tvrđenja pravilno razlikuju compile-time i runtime probleme?</p>",
    [
      "Neposredan pristup nedostupnom privatnom članu tipično je compile-time greška.",
      "Povreda preduslova javne operacije može izazvati runtime izuzetak.",
      "Pristup članu označenom sa <code>private</code> proverava se tek u runtime-u.",
      "Poziv <code>Pop</code> može biti sintaksno ispravan, ali pasti pri izvršavanju ako je stek prazan."
    ],
    [0, 1, 3],
    "Pravila dostupnosti obično sprečavaju imenovanje privatnog člana već pri kompilaciji. Stanje objekta i preduslovi operacije proveravaju se pri izvršavanju, pa legalan poziv može završiti izuzetkom.",
    ["accessibility", "compile-time", "runtime"]
  ),
  choice(
    13,
    "<p>Enkapsulaciona konstrukcija u programskom jeziku C, prema mapiranju iz julskog roka 2022, jeste:</p>",
    ["Package", "Klasa", "Assembly", "Namespace", "Header file"],
    [4],
    "Standardni C nema klase, package ili namespace konstrukcije iz ponuđene podele. Javni interfejs modula tipično se objavljuje u header datoteci, dok implementacija ostaje u odgovarajućoj .c datoteci.",
    ["c", "header", "old-exam"]
  ),
  choice(
    14,
    "<p>Koja tvrđenja o obrascu opaque <code>struct</code> u C-u su tačna?</p>",
    [
      "Header može sadržati <code>typedef struct Stek Stek;</code>.",
      "Puna definicija strukture može ostati u <code>.c</code> datoteci.",
      "Klijent može koristiti pokazivač na nepotpun tip.",
      "Klijent može neposredno pristupati nepoznatim članovima nepotpunog tipa.",
      "Ovaj obrazac može realizovati ADT u C-u."
    ],
    [0, 1, 2, 4],
    "Nepotpuna deklaracija omogućava klijentu da barata pokazivačem na tip bez poznavanja njegovih članova. Puna definicija u implementacionoj datoteci čuva reprezentaciju iza funkcija objavljenih u header-u.",
    ["c", "header", "opaque-struct", "adt"]
  ),
  choice(
    15,
    "<p>Koja tvrđenja o C header datotekama i direktivi <code>#include</code> su tačna?</p>",
    [
      "<code>#include</code> tekstualno uključuje sadržaj header-a pre kompilacije.",
      "Include guard sprečava problem višestrukog uključivanja u istoj prevodilačkoj jedinici.",
      "Header je runtime modul.",
      "Ako se puna reprezentacija stavi u javni header, ona više nije tekstualno skrivena.",
      "<code>.h</code> tipično objavljuje deklaracije, a <code>.c</code> sadrži implementaciju."
    ],
    [0, 1, 3, 4],
    "Preprocesor tekstualno obrađuje #include, a guard ili #pragma once sprečava ponovljene deklaracije. Header nije runtime jedinica i skriva reprezentaciju samo ako je javni sadržaj pažljivo odvojen od privatne definicije.",
    ["c", "header", "include"]
  ),
  choice(
    16,
    "<p>Metoda koja obezbeđuje vidljivost interfejsa ADT-a u C++ prema pitanju iz aprila 2023. jeste:</p>",
    [
      "Implementaciona datoteka.",
      "Specifikacioni package.",
      "<code>public</code> modifikator jedne promenljive.",
      "<code>public</code> klauzula klase.",
      "Ništa od navedenog."
    ],
    [3],
    "Public deo klase navodi operacije dostupne klijentu i zato predstavlja interfejs ADT-a. Implementaciona datoteka može sadržati definicije tih operacija, ali ne određuje njihovu dostupnost korisniku klase.",
    ["cpp", "adt", "public", "old-exam"]
  ),
  choice(
    17,
    "<p>Entiteti označeni klauzulom <code>private</code> u C++ dostupni su:</p>",
    [
      "Članovima date klase.",
      "Članovima izvedene klase samo na osnovu nasleđivanja.",
      "Članovima <code>friend</code> klase.",
      "<code>friend</code> funkcijama.",
      "Svim funkcijama iz istog namespace-a."
    ],
    [0, 2, 3],
    "Privatnim članovima pristupaju članovi i eksplicitno deklarisani prijatelji klase. Izvedena klasa ne dobija pristup samo zato što nasleđuje bazu, a pripadnost istom namespace-u ne daje posebnu dozvolu.",
    ["cpp", "private", "friend", "old-exam"]
  ),
  choice(
    18,
    "<p>Koja tvrđenja o C++ header-u i dostupnosti članova su tačna?</p>",
    [
      "Privatna polja mogu biti tekstualno deklarisana u header-u.",
      "Tekstualna vidljivost deklaracije ne daje dozvolu pristupa članu.",
      "<code>private</code> član automatski je dostupan izvedenoj klasi.",
      "<code>public</code> deo predstavlja klijentski interfejs klase.",
      "Deklaracija <code>friend</code> može namerno dati pristup privatnim članovima."
    ],
    [0, 1, 3, 4],
    "Kompajler često mora da vidi celu deklaraciju klase u header-u, uključujući privatna polja, ali pravila pristupa i dalje zabranjuju klijentskom kodu da ih koristi. Public i private zato opisuju dozvolu, a ne puku prisutnost teksta.",
    ["cpp", "header", "accessibility"]
  ),
  choice(
    19,
    `<p>Koji fragmenti ispisuju <code>4</code> za dati C++ kod?</p><pre><code>namespace prvi
{
    int vrednost() { return 5; }
    namespace drugi { int vrednost() { return 4; } }
}</code></pre>`,
    [
      "<code>using drugi::vrednost; cout &lt;&lt; vrednost();</code>",
      "<code>using namespace prvi::drugi; cout &lt;&lt; vrednost();</code>",
      "<code>cout &lt;&lt; vrednost();</code>",
      "<code>cout &lt;&lt; prvi::vrednost();</code>",
      "<code>cout &lt;&lt; drugi::vrednost();</code>",
      "<code>cout &lt;&lt; prvi::drugi::vrednost();</code>"
    ],
    [1, 5],
    "Unutrašnji namespace može se uvesti punom using namespace direktivom ili se funkcija može imenovati punom kvalifikacijom. Ime drugi nije globalno, a prvi::vrednost vraća 5. Ovo je obrazac pitanja 19 iz aprila 2023.",
    ["cpp", "namespace", "name-lookup", "old-exam"]
  ),
  choice(
    20,
    "<p>Koja tvrđenja o C++ namespace-u su tačna?</p>",
    [
      "Može biti otvoren u više deklaracija.",
      "Njegove deklaracije mogu biti raspoređene kroz više datoteka.",
      "Automatski pruža <code>private</code> zaštitu poput klase.",
      "Omogućava kvalifikovana imena i razdvajanje istoimenih entiteta.",
      "Neimenovani namespace daje internu povezanost imenima u prevodilačkoj jedinici."
    ],
    [0, 1, 3, 4],
    "Namespace organizuje i razrešava imena i može se proširivati kroz deklaracije i datoteke. Ne zamenjuje kontrolu pristupa klase; neimenovani namespace je poseban mehanizam za internu povezanost.",
    ["cpp", "namespace"]
  ),
  choice(
    21,
    "<p>Koja tvrđenja o Java package-u su tačna?</p>",
    [
      "Grupiše tipove u imenovani prostor.",
      "Učestvuje u kontroli pristupa.",
      "Određuje se deklaracijom <code>package</code>.",
      "Uvek je isto što i jedna JAR datoteka.",
      "Jedna JAR datoteka može sadržati više paketa."
    ],
    [0, 1, 2, 4],
    "Java package organizuje kvalifikovana imena i određuje granicu default pristupa. Paket i JAR nisu isto: paket može biti raspoređen kroz više JAR-ova, a jedan JAR može sadržati više paketa.",
    ["java", "package"]
  ),
  choice(
    22,
    "<p>Koja tvrđenja važe za član Java klase koji nema naveden modifikator pristupa?</p>",
    [
      "Dostupan je u sopstvenoj klasi.",
      "Dostupan je drugim klasama istog paketa.",
      "Dostupan je svakoj klasi van paketa.",
      "Ima package-private, odnosno default pristup.",
      "Automatski ima <code>protected</code> pristup."
    ],
    [0, 1, 3],
    "Član bez modifikatora dostupan je kodu unutar istog Java paketa, uključujući sopstvenu klasu, ali ne proizvoljnom kodu van paketa. Ovo je jasna formulacija obrasca trećeg pitanja iz jula 2022.",
    ["java", "package-private", "old-exam"]
  ),
  choice(
    23,
    "<p>Koja tvrđenja o Java deklaraciji <code>import</code> su tačna?</p>",
    [
      "Omogućava korišćenje kratkog imena uvezenog tipa.",
      "Kopira klasu u trenutni paket.",
      "Menja privatni član u dostupan član.",
      "Ne menja stvarnu dostupnost tipa ili njegovih članova.",
      "Potpuno kvalifikovano ime može se koristiti i bez <code>import</code> deklaracije."
    ],
    [0, 3, 4],
    "Import utiče na razrešavanje kratkog imena, ali ne kopira deklaraciju i ne zaobilazi kontrolu pristupa. Klijent uvek može koristiti dostupno potpuno kvalifikovano ime.",
    ["java", "package", "import"]
  ),
  choice(
    24,
    "<p>Koja tvrđenja o Ada package-u su tačna?</p>",
    [
      "Specifikacija sadrži javno vidljivi deo.",
      "Specifikacija može imati <code>private</code> deo.",
      "Package body sadrži implementaciju operacija.",
      "Klijent mora videti sve detalje reprezentacije javnog tipa.",
      "Package je modularna i enkapsulaciona konstrukcija."
    ],
    [0, 1, 2, 4],
    "Ada package eksplicitno razdvaja vidljivi deo specifikacije, privatni deo i telo sa implementacijom. Privatni deo omogućava da tip bude poznat klijentu bez otkrivanja njegove pune reprezentacije.",
    ["ada", "package", "encapsulation"]
  ),
  choice(
    25,
    "<p>Koja tvrđenja pravilno razlikuju Ada klauzule <code>with</code> i <code>use</code>?</p>",
    [
      "<code>with</code> uvodi zavisnost od drugog paketa.",
      "<code>use</code> omogućava nekvalifikovane reference na njegove vidljive deklaracije.",
      "<code>with</code> i <code>use</code> su potpuni sinonimi.",
      "<code>use</code> je očekivani odgovor za uklanjanje eksplicitne kvalifikacije.",
      "Za uklanjanje kvalifikacije koristi se C direktiva <code>#include</code>."
    ],
    [0, 1, 3],
    "With čini eksterni paket dostupnim kao zavisnost, dok use uvodi njegove vidljive deklaracije u neposrednu vidljivost. Zato je use tačan odgovor na drugo pitanje iz juna 2023.",
    ["ada", "with", "use", "old-exam"]
  ),
  choice(
    26,
    "<p>Enkapsulaciona konstrukcija u programskom jeziku C# prema pitanju iz juna 2023. jeste:</p>",
    ["Klasa", "Package", "Assembly", "Namespace", "Header datoteka"],
    [2],
    "U terminologiji ovog ispitnog pitanja očekuje se assembly: binarna jedinica i granica internal pristupa. C# klasa takođe enkapsulira svoje članove, ali to nije nivo koji dato mapiranje proverava.",
    ["csharp", "assembly", "old-exam"]
  ),
  choice(
    27,
    "<p>Koja tvrđenja o .NET assembly-ju su tačna?</p>",
    [
      "Najčešće se proizvodi kao <code>.dll</code> ili <code>.exe</code>.",
      "Može sadržati CIL kod, metapodatke i manifest.",
      "Osnovna je jedinica deploymenta i verzionisanja.",
      "Predstavlja standardnu granicu <code>internal</code> pristupa.",
      "Jedan namespace mora odgovarati tačno jednom assembly-ju."
    ],
    [0, 1, 2, 3],
    "Assembly objedinjuje kompajlirani kod i metapodatke i služi kao fizička, verziona i internal granica. Namespace i assembly nisu u odnosu jedan-prema-jedan.",
    ["csharp", "assembly", "internal"]
  ),
  choice(
    28,
    "<p>Koja tvrđenja pravilno razlikuju C# namespace i assembly?</p>",
    [
      "Namespace organizuje i kvalifikuje imena.",
      "Assembly je granica <code>internal</code> pristupa.",
      "Isti namespace daje <code>internal</code> pristup i kroz različite assembly-je.",
      "Različiti namespace-ovi ne sprečavaju <code>internal</code> pristup ako je kod u istom assembly-ju.",
      "Direktiva <code>using</code> ne dodaje referencu na assembly i ne zaobilazi dostupnost."
    ],
    [0, 1, 3, 4],
    "Namespace je logički prostor imena, dok je assembly fizička i pristupna granica. Internal zavisi od sklopa, a using samo olakšava razrešavanje imena koja su već dostupna.",
    ["csharp", "namespace", "assembly", "internal"]
  ),
  choice(
    29,
    "<p>Koje stavke predstavljaju enkapsulacije imena u mapiranju iz juna 2023?</p>",
    [
      "Header datoteka u C++.",
      "Package u Javi.",
      "Assembly u C#.",
      "Namespace u C#."
    ],
    [1, 3],
    "Enkapsulacije imena definišu logičke dosege i kvalifikaciju: u ponuđenom mapiranju to su Java package i C# namespace. Header i assembly imaju druge modularne i fizičke uloge.",
    ["name-encapsulation", "java", "csharp", "old-exam"]
  ),
  choice(
    30,
    "<p>Koja mapiranja jezika na očekivanu enkapsulacionu konstrukciju su tačna?</p>",
    [
      "C — header datoteka.",
      "C++ — klasa sa <code>public</code>/<code>private</code> delovima.",
      "C# — assembly na modularnom nivou.",
      "Java — package.",
      "Ada — package.",
      "C# — namespace kao granica <code>internal</code> pristupa."
    ],
    [0, 1, 2, 3, 4],
    "Prvih pet mapiranja odgovara terminologiji lekcije i starih rokova. C# namespace organizuje imena, ali internal dostupnost određuje assembly, pa poslednje tvrđenje nije tačno.",
    ["encapsulation", "language-comparison"]
  ),
  short(
    31,
    "<p>Navedi dve stavke koje korisniku ADT-a nisu vidljive. Odvoji ih znakom <code>|</code>.</p>",
    "reprezentacija tipa | implementacija operacija",
    [
      "reprezentacija tipa|implementacija operacija",
      "implementacija operacija|reprezentacija tipa",
      "reprezentacija tipa|implementacija operacije",
      "implementacija operacije|reprezentacija tipa"
    ],
    "Korisnički interfejs otkriva naziv tipa i javne operacije, dok konkretna reprezentacija i algoritmi operacija pripadaju skrivenoj implementaciji. To je tačan rezultat prvog pitanja iz juna 2023.",
    ["adt", "visibility", "old-exam"]
  ),
  short(
    32,
    "<p>Šta čini specifikaciju ADT-a? Navedi dve stavke odvojene znakom <code>|</code>.</p>",
    "naziv tipa | javne operacije",
    [
      "naziv tipa|javne operacije",
      "naziv tipa|skup javnih operacija",
      "javne operacije|naziv tipa",
      "skup javnih operacija|naziv tipa"
    ],
    "Specifikacija je ono na šta se klijent oslanja: ime tipa i skup dostupnih operacija. Reprezentacija i algoritmi pripadaju implementaciji, ne specifikaciji.",
    ["adt", "specification"]
  ),
  short(
    33,
    "<p>Koji je osnovni preduslov operacije <code>Skini</code> nad stekom?</p>",
    "stek nije prazan",
    ["stek nije prazan", "nije prazan", "da stek nije prazan"],
    "Operacija može ukloniti i vratiti vrh samo ako element postoji. Implementacija zatim garantuje da je vraćen prethodni vrh i da stek ima jedan element manje.",
    ["adt", "preconditions", "stack"]
  ),
  short(
    34,
    "<p>Napiši osnovni uslov invarijante za imenilac racionalnog broja.</p>",
    "imenilac != 0",
    ["imenilac!=0", "imenilac≠0", "imenilac nije 0", "imenilac nije nula"],
    "Racionalan broj ne sme imati nulti imenilac. Potpunija normalizovana reprezentacija može dodatno zahtevati uzajamno proste članove i pozitivan imenilac.",
    ["representation-invariant", "rational-number"]
  ),
  short(
    35,
    "<p>Dopuni mapiranje redom za C, C++, C#, Java i Ada. Odgovore odvoji znakom <code>|</code>.</p>",
    "header datoteka | klasa | assembly | package | package",
    [
      "header datoteka|klasa|assembly|package|package",
      "header file|klasa|assembly|package|package",
      "header|klasa|assembly|package|package",
      "header datoteka|class|assembly|package|package"
    ],
    "Ispitna mapa je C/header, C++/klasa, C#/assembly, Java/package i Ada/package. Ona označava prvenstveno očekivani modularni nivo, iako jezici mogu imati više istovremenih granica enkapsulacije.",
    ["encapsulation", "language-comparison"]
  ),
  short(
    36,
    "<p>Šta ispisuje poziv iz C++ pitanja sa namespace-ovima?</p><pre><code>cout &lt;&lt; prvi::drugi::vrednost();</code></pre>",
    "4",
    ["4"],
    "Puna kvalifikacija bira funkciju vrednost iz unutrašnjeg namespace-a drugi, čije telo vraća 4. Spoljašnja funkcija prvi::vrednost vraća 5.",
    ["cpp", "namespace", "program-output", "old-exam"]
  ),
  short(
    37,
    "<p>Kako se naziva pristup člana Java klase koji nema naveden modifikator pristupa?</p>",
    "package-private",
    ["package-private", "package private", "default", "default access", "podrazumevani pristup"],
    "Java član bez modifikatora dostupan je svim klasama istog paketa, ali ne proizvoljnim klasama van paketa. Taj nivo se naziva package-private ili default pristup.",
    ["java", "package-private"]
  ),
  short(
    38,
    "<p>Koja Ada klauzula uklanja potrebu za eksplicitnom kvalifikacijom vidljivih deklaracija paketa?</p>",
    "use",
    ["use", "use klauzula"],
    "Klauzula with uvodi zavisnost od paketa, dok use omogućava da se njegove vidljive deklaracije koriste bez prefiksa imena paketa.",
    ["ada", "use", "old-exam"]
  ),
  short(
    39,
    "<p>Koja C# jedinica predstavlja standardnu granicu <code>internal</code> pristupa?</p>",
    "assembly",
    ["assembly", "sklop", ".net assembly"],
    "Internal član je dostupan kodu u istom assembly-ju nezavisno od namespace-a. Namespace organizuje imena, ali nije standardna internal granica.",
    ["csharp", "assembly", "internal"]
  ),
  short(
    40,
    "<p>Da li je <code>internal</code> član dostupan: prvo iz drugog namespace-a istog assembly-ja, a zatim iz istog namespace-a drugog assembly-ja? Odgovore odvoji znakom <code>|</code>.</p>",
    "da | ne",
    ["da|ne"],
    "Internal prati granicu assembly-ja, a ne namespace-a. Zato različit namespace u istom sklopu ne smeta pristupu, dok isti namespace u drugom sklopu ne daje pristup.",
    ["csharp", "assembly", "namespace", "internal"]
  )
];
