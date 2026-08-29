import type { Question } from "../schema";

const lessonId = "teorija-kompajlera";
const sourceTestId = "teorija-kompajlera-1";

function choice(
  originalNumber: number,
  prompt: string,
  options: string[],
  correct: number[],
  explanation: string,
  tags: string[]
): Question {
  return {
    id: `teorija-kompajlera-q${String(originalNumber).padStart(2, "0")}`,
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
    id: `teorija-kompajlera-q${String(originalNumber).padStart(2, "0")}`,
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

export const teorijaKompajleraQuestions: Question[] = [
  choice(
    1,
    "<p>Koji redosled ispravno prikazuje tipičan tok glavnih faza kompajliranja?</p>",
    [
      "Leksička analiza, sintaksna analiza, semantička analiza, generisanje međukoda, generisanje ciljnog koda",
      "Semantička analiza, leksička analiza, optimizacija, sintaksna analiza, generisanje ciljnog koda",
      "Sintaksna analiza, leksička analiza, generisanje ciljnog koda, semantička analiza",
      "Optimizacija, leksička analiza, semantička analiza, sintaksna analiza"
    ],
    [0],
    "Skener prvo formira tokene, parser proverava njihovu strukturu, a semantička analiza proverava značenje. Zatim se obično pravi IR, po potrebi optimizuje i prevodi u ciljni kod.",
    ["compiler-phases", "overview"]
  ),
  choice(
    2,
    "<p>Koje su klasifikacije grešaka tačne?</p>",
    [
      "Nedovršen string literal je tipično leksička greška.",
      "Nedostajuća zatvorena zagrada je tipično sintaksna greška.",
      "Upotreba nedeklarisanog imena je tipično semantička greška.",
      "Spor, ali ispravan kod je sintaksna greška.",
      "Sabiranje vrednosti nesaglasnih tipova je uvek leksička greška."
    ],
    [0, 1, 2],
    "Leksički nivo prepoznaje oblike, sintaksni raspored tokena, a semantički deklaracije i tipove. Performanse ispravnog programa pripadaju optimizaciji, ne sintaksnoj ispravnosti.",
    ["compiler-phases", "errors", "lexical-analysis", "syntax", "semantics"]
  ),
  choice(
    3,
    "<p>Koje poslove tipično obavlja leksički analizator?</p>",
    [
      "Grupiše znakove u lekseme.",
      "Dodeljuje leksemama vrste tokena.",
      "Može da odbaci razmake i komentare.",
      "Proverava saglasnost tipova operanada.",
      "Bira instrukcije ciljnog procesora."
    ],
    [0, 1, 2],
    "Leksički analizator, odnosno skener, pretvara tok znakova u tok tokena. Provera tipova pripada semantičkoj analizi, a izbor instrukcija generatoru ciljnog koda.",
    ["lexical-analysis", "scanner", "tokens"]
  ),
  choice(
    4,
    "<p>Koja tvrđenja ispravno razlikuju token i leksem?</p>",
    [
      "U tekstu <code>broj = 12</code>, niz <code>broj</code> je leksem.",
      "<code>ID</code> može biti vrsta tokena za mnogo različitih imena.",
      "Leksem je kategorija, a token je uvek konkretan niz znakova.",
      "Token može sadržati atribut, na primer brojčanu vrednost literala.",
      "Skener grupiše tokene u pojedinačne znakove."
    ],
    [0, 1, 3],
    "Leksem je konkretan niz znakova, dok token označava njegovu kategoriju i može nositi atribut. Jedna kategorija, kao ID, obuhvata mnogo leksema.",
    ["tokens", "lexemes", "lexical-analysis"]
  ),
  choice(
    5,
    "<p>Koja poređenja skenera i parsera su tačna?</p>",
    [
      "Skener prima znakove, a proizvodi tokene.",
      "Parser tipično prima tokene.",
      "Regularni izrazi su tipična osnova leksičkih pravila.",
      "CFG i BNF se koriste za opis sintaksnih pravila.",
      "Parser odlučuje da li je svaki identifikator deklarisan."
    ],
    [0, 1, 2, 3],
    "Skener prepoznaje lokalne oblike pomoću regularnih pravila, a parser proverava strukturu tokena prema gramatici. Deklarisanost imena je semantičko pitanje.",
    ["scanner", "parser", "regular-expressions", "cfg", "bnf"]
  ),
  choice(
    6,
    "<p>Koje lekseme prihvata pojednostavljeno pravilo za identifikator <code>[A-Za-z_][A-Za-z0-9_]*</code>?</p>",
    ["<code>ime</code>", "<code>_a2</code>", "<code>2ime</code>", "<code>a-b</code>", "<code>Z0_</code>"],
    [0, 1, 4],
    "Prvi znak mora biti slovo ili donja crta. Svaki naredni znak može biti i cifra, ali crtica nije deo ovog pravila.",
    ["regular-expressions", "identifiers", "lexical-analysis"]
  ),
  choice(
    7,
    "<p>Ako skener primenjuje pravilo najdužeg poklapanja, kako tipično razlaže ulaz <code>cena==20</code> kada postoje tokeni <code>=</code> i <code>==</code>?</p>",
    [
      "<code>ID ASSIGN ASSIGN INT_LITERAL</code>",
      "<code>ID EQUALS INT_LITERAL</code>, gde <code>EQUALS</code> odgovara <code>==</code>",
      "<code>ID ASSIGN INT_LITERAL</code>",
      "Ulaz se ne može leksički analizirati"
    ],
    [1],
    "Na poziciji operatora najduže poklapanje bira dvokarakterski leksem == umesto dva uzastopna = tokena.",
    ["lexical-analysis", "longest-match", "tokens"]
  ),
  choice(
    8,
    "<p>Za naredbu <code>x = y + 1;</code>, koja pitanja pripadaju semantičkoj, a ne sintaksnoj analizi?</p>",
    [
      "Da li su <code>x</code> i <code>y</code> deklarisani?",
      "Da li su tipovi operanada kompatibilni sa operatorom <code>+</code>?",
      "Da li je dodela dobijene vrednosti promenljivoj <code>x</code> dozvoljena?",
      "Da li se tačka-zarez nalazi na mestu koje zahteva gramatika?",
      "Da li je redosled tokena dozvoljen produkcijama?"
    ],
    [0, 1, 2],
    "Deklaracije, tipovi i dozvoljene konverzije pripadaju statici značenja programa. Oblik i raspored tokena proverava sintaksna analiza.",
    ["semantic-analysis", "syntax", "type-checking", "name-resolution"]
  ),
  choice(
    9,
    "<p>Koje poslove obično obavlja semantička analiza?</p>",
    [
      "Razrešava imena i opsege.",
      "Proverava broj i tipove argumenata poziva.",
      "Proverava dozvoljene konverzije tipova.",
      "Prepoznaje svaki komentar u ulaznoj datoteci.",
      "Učitava izvršni program u memoriju."
    ],
    [0, 1, 2],
    "Semantička analiza povezuje upotrebe imena sa deklaracijama i proverava pravila tipova. Komentare obrađuje skener, a izvršni program učitava loader.",
    ["semantic-analysis", "type-checking", "name-resolution", "scope"]
  ),
  choice(
    10,
    "<p>Koje prednosti donosi međureprezentacija (IR)?</p>",
    [
      "Odvaja svojstva izvornog jezika od ciljne mašine.",
      "Omogućava da više front end-ova deli optimizacije i back end-ove.",
      "Mora biti tekstualna i direktno izvršiva na procesoru.",
      "Može eksplicitno predstaviti tok kontrole i podatke za optimizaciju.",
      "Čini semantičku proveru nepotrebnom."
    ],
    [0, 1, 3],
    "IR je zajednički unutrašnji oblik pogodan za analize i transformacije. Ne mora biti tekstualan niti neposredno izvršiv i ne zamenjuje proveru semantike.",
    ["intermediate-code", "ir", "compiler-phases"]
  ),
  choice(
    11,
    "<p>Koji troadresni kod čuva prioritet operacija izraza <code>a = b + c * d</code>?</p>",
    [
      "<code>t1 = b + c; t2 = t1 * d; a = t2</code>",
      "<code>t1 = c * d; t2 = b + t1; a = t2</code>",
      "<code>t1 = a = b; t2 = c * d</code>",
      "<code>t1 = b * c; a = t1 + d</code>"
    ],
    [1],
    "Množenje se računa pre sabiranja, pa privremena vrednost c * d postaje operand narednog sabiranja.",
    ["intermediate-code", "three-address-code", "operator-precedence"]
  ),
  choice(
    12,
    "<p>Koji su tipični poslovi generatora ciljnog koda?</p>",
    [
      "Izbor instrukcija.",
      "Raspodela registara.",
      "Izbor adresnih režima.",
      "Razrešavanje opsega promenljivih u izvornom programu.",
      "Prepoznavanje ključnih reči."
    ],
    [0, 1, 2],
    "Back end mapira IR na resurse i instrukcije cilja. Opsezi se razrešavaju semantički, a ključne reči prepoznaje skener.",
    ["target-code", "code-generation", "register-allocation"]
  ),
  choice(
    13,
    "<p>Koja tvrđenja o ciljnom kodu, linkeru i loaderu su tačna?</p>",
    [
      "Ciljni kod može biti WebAssembly, CIL ili JVM bytecode.",
      "Linker povezuje module i razrešava spoljne simbole.",
      "Loader učitava program u memoriju.",
      "Ciljni kod uvek mora biti native mašinski kod.",
      "Linker obavlja leksičku analizu izvornog programa."
    ],
    [0, 1, 2],
    "Cilj prevoda ne mora biti fizički procesor. Linker gradi povezanu celinu od modula, dok loader priprema program za izvršavanje u memoriji.",
    ["target-code", "linker", "loader"]
  ),
  choice(
    14,
    "<p>Koje transformacije su primeri optimizacije?</p>",
    [
      "Zamena <code>3 * 4</code> konstantom <code>12</code>.",
      "Uklanjanje nedostižnog koda.",
      "Eliminacija zajedničkog podizraza kada je bezbedna.",
      "Prihvatanje programa sa sintaksnom greškom.",
      "Promena vidljivog rezultata radi kraćeg koda."
    ],
    [0, 1, 2],
    "Konstantno savijanje, uklanjanje mrtvog koda i eliminacija zajedničkih podizraza čuvaju značenje uz bolju izabranu meru. Optimizacija ne popravlja neispravnu sintaksu niti sme proizvoljno promeniti ponašanje.",
    ["optimization", "constant-folding", "dead-code", "common-subexpressions"]
  ),
  choice(
    15,
    "<p>Zašto optimizator ne sme automatski zameniti svaki izraz naizgled jednostavnijim oblikom?</p>",
    [
      "Izuzeci mogu biti vidljivo ponašanje programa.",
      "Pravila overflow-a mogu uticati na ekvivalentnost.",
      "Floating-point operacije ne prate uvek algebarske identitete realnih brojeva.",
      "Volatile i konkurentne operacije mogu imati vidljive efekte.",
      "Optimizacija po definiciji sme da promeni rezultat ako je kod brži."
    ],
    [0, 1, 2, 3],
    "Dozvoljena transformacija mora sačuvati ponašanje koje jezik smatra vidljivim. Izuzeci, aritmetička pravila i efekti memorijskih operacija zato ograničavaju optimizaciju.",
    ["optimization", "semantic-equivalence", "runtime-behavior"]
  ),
  choice(
    16,
    "<p>Koje podatke može sadržati zapis u tabeli simbola?</p>",
    [
      "Vrstu simbola i njegov tip.",
      "Opseg i vidljivost.",
      "Parametre funkcije ili metode.",
      "Vezu ka deklaraciji ili lokaciji.",
      "Obavezno kompletan izvorni program kao jedan string."
    ],
    [0, 1, 2, 3],
    "Tabela simbola mapira imena na podatke potrebne za vezivanje, proveru tipova i kasnije generisanje koda. Ne predstavlja skladište celog izvornog programa.",
    ["symbol-table", "scope", "semantic-analysis"]
  ),
  choice(
    17,
    "<p>U terminologiji starog ispitnog roka, u kojoj fazi se očekivao odgovor da se generiše tabela simbola?</p>",
    ["Generisanje koda", "Leksička analiza", "Semantička analiza", "Sintaksna analiza", "Optimizacija koda"],
    [1],
    "Stari rok očekuje leksičku analizu jer skener prepoznaje identifikatore i može napraviti početne unose. Preciznije, savremeno objašnjenje je da se tabela stvara i održava kroz više faza, dok semantička analiza upisuje i proverava tip, opseg i vezivanje.",
    ["symbol-table", "lexical-analysis", "old-exam", "historical-terminology"]
  ),
  choice(
    18,
    "<p>Koja tvrđenja o organizaciji kompajlera su tačna?</p>",
    [
      "Leksička, sintaksna i semantička analiza često pripadaju front end-u.",
      "Optimizacije nad opštim IR-om često pripadaju middle end-u.",
      "Izbor instrukcija i registara pripada back end-u.",
      "Granice faza su identične u svim knjigama i implementacijama.",
      "Generisanje IR-a se nikada ne prikazuje uz semantičku analizu."
    ],
    [0, 1, 2],
    "Podela na front, middle i back end je korisna, ali granice nisu univerzalne. Neke nastavne podele generisanje IR-a pridružuju semantičkoj analizi.",
    ["compiler-phases", "front-end", "middle-end", "back-end"]
  ),
  choice(
    19,
    "<p>Koja tvrđenja o BNF notaciji su tačna?</p>",
    [
      "Znak <code>::=</code> razdvaja neterminal od njegove zamene.",
      "Vertikalna crta razdvaja alternative.",
      "BNF se često koristi za zapis kontekstno slobodnih gramatika.",
      "Svaka produkcija mora imati terminal sa leve strane.",
      "EBNF može dodati skraćenice za opcionost i ponavljanje."
    ],
    [0, 1, 2, 4],
    "U produkciji je levo neterminal, a desno jedna ili više alternativa. EBNF proširuje osnovnu notaciju praktičnim skraćenicama.",
    ["bnf", "ebnf", "formal-grammars"]
  ),
  choice(
    20,
    "<p>Za CFG <code>G = (N, T, P, S)</code>, šta predstavljaju komponente?</p>",
    [
      "<code>N</code> je skup neterminala.",
      "<code>T</code> je skup terminala.",
      "<code>P</code> je skup produkcija.",
      "<code>S</code> je početni simbol.",
      "<code>N</code> i <code>T</code> moraju biti isti skup."
    ],
    [0, 1, 2, 3],
    "CFG čine disjunktni skupovi neterminala i terminala, produkcije i izdvojeni početni simbol.",
    ["cfg", "formal-grammars"]
  ),
  choice(
    21,
    "<p>Koja tvrđenja o regularnim jezicima i CFG jezicima su tačna?</p>",
    [
      "Svaki regularni jezik može se opisati odgovarajućom CFG/BNF gramatikom.",
      "CFG može opisati pravilno balansirane zagrade proizvoljne dubine.",
      "Svaki jezik opisan CFG-om mora biti regularan.",
      "Klasičan regularni izraz nema neograničenu memoriju za proizvoljno ugnježdenje.",
      "BNF ne može opisati nijedan jezik koji opisuje regularni izraz."
    ],
    [0, 1, 3],
    "Regularni jezici su podskup kontekstno slobodnih jezika. CFG može opisati i neregularne obrasce, kao što je proizvoljno balansiranje zagrada.",
    ["regular-languages", "cfg", "bnf"]
  ),
  choice(
    22,
    `<p>Koji stringovi pripadaju jeziku gramatike?</p><pre><code>A -&gt; B x C y
B -&gt; B D | D
C -&gt; B | B y B
D -&gt; a | b | c | d</code></pre>`,
    ["<code>aaxby</code>", "<code>axby</code>", "<code>axbycy</code>", "<code>axey</code>", "<code>abxcd</code>"],
    [0, 1, 2],
    "B je neprazan niz slova a-d. C je jedan takav blok ili dva bloka razdvojena sa y, pa A ima oblik BxBy ili BxByBy. String sa e i string bez završnog y ne pripadaju jeziku.",
    ["cfg", "string-membership", "old-exam"]
  ),
  choice(
    23,
    "<p>Koje stringove opisuje regularni izraz <code>(0|1)(01)*</code>?</p>",
    ["<code>0</code>", "<code>1</code>", "<code>001</code>", "<code>10101</code>", "<code>01</code>", "prazan string"],
    [0, 1, 2, 3],
    "Izraz zahteva jedan početni bit, a zatim nula ili više celih parova 01. Zato je dužina uvek neparna i prazan string nije dozvoljen.",
    ["regular-expressions", "language-membership", "old-exam"]
  ),
  choice(
    24,
    "<p>Koje metode pouzdano pomažu pri proveri da li su dva regularna izraza ekvivalentna?</p>",
    [
      "Traženje stringa koji prihvata tačno jedan izraz.",
      "Provera praznog i najkraćih stringova.",
      "Poređenje ograničenja dužine i susednih znakova.",
      "Zaključak da su ekvivalentni čim dele jedan prihvaćen string.",
      "Ignorisanje prioriteta operatora."
    ],
    [0, 1, 2],
    "Za neekvivalentnost je dovoljan kontraprimer. Nekoliko zajedničkih primera nije dokaz jednakosti jezika, a prioritet operatora menja značenje izraza.",
    ["regular-expressions", "equivalence", "counterexample"]
  ),
  choice(
    25,
    "<p>Koja povezivanja pojmova iz .NET izvršavanja su tačna?</p>",
    [
      "CIL je procesorski nezavisan međukod.",
      "CLI je standardizovana infrastruktura i skup pravila izvršavanja.",
      "CLR je Microsoft-ova implementacija CLI-ja za .NET.",
      "CLI i CLR su uvek potpuno isti pojam.",
      "CIL je izvorni C# kod pre kompajliranja."
    ],
    [0, 1, 2],
    "C# kompajler proizvodi CIL i metapodatke. CLI definiše infrastrukturu, dok je CLR konkretan runtime koji je implementira.",
    ["cil", "cli", "clr", "dotnet"]
  ),
  choice(
    26,
    "<p>Koja tvrđenja ispravno porede JIT i AOT?</p>",
    [
      "JIT prevodi međukod u native kod tokom izvršavanja.",
      "AOT priprema native kod pre pokretanja programa.",
      "JIT nužno ponovo prevodi istu metodu pre svakog njenog poziva.",
      ".NET može podržati i JIT i AOT scenarije.",
      "AOT znači da runtime više ne može pružati nijednu uslugu."
    ],
    [0, 1, 3],
    "JIT tipično kompajlira metodu kada zatreba i ponovo koristi dobijeni kod, dok AOT pomera prevod pre pokretanja. Izbor ne ukida nužno runtime usluge.",
    ["jit", "aot", "runtime", "dotnet"]
  ),
  choice(
    27,
    "<p>Šta tipično sadrži .NET assembly koji je proizveo C# kompajler?</p>",
    [
      "CIL instrukcije.",
      "Metapodatke o tipovima i članovima.",
      "Manifest i reference assembly-ja.",
      "Isključivo izvorni C# tekst.",
      "Obavezno samo native kod za jedan procesor."
    ],
    [0, 1, 2],
    "Tipičan managed assembly objedinjuje CIL, metapodatke i manifest. Native AOT je poseban režim, a izvorni tekst nije standardni sadržaj assembly-ja.",
    ["dotnet", "assembly", "cil", "metadata"]
  ),
  choice(
    28,
    "<p>Koja tvrđenja o tipičnom izvršavanju Java programa su tačna?</p>",
    [
      "<code>javac</code> prevodi Java izvor u JVM bytecode.",
      "JVM može interpretirati bytecode.",
      "JVM može JIT-kompajlirati često izvršavane metode.",
      "Bytecode je nužno direktno izvršiv na svakom fizičkom procesoru.",
      "Interpretacija i kompilacija se ne mogu kombinovati u istom životnom ciklusu."
    ],
    [0, 1, 2],
    "Java izvor se tipično kompajlira u prenosivi bytecode. Konkretna JVM može kombinovati interpretaciju, JIT, deoptimizaciju i druge režime.",
    ["java", "jvm", "bytecode", "jit"]
  ),
  choice(
    29,
    "<p>U standardnoj formulaciji starog roka, CIL kod se:</p>",
    ["kompajlira", "isključivo interpretira", "direktno izvršava kao instrukcije fizičkog CPU-a", "ponovo prevodi u C# izvor"],
    [0],
    "Očekivani odgovor starog roka je da se CIL kompajlira: CLR ga tipično JIT prevodi u native kod. Postoje i AOT režimi, ali CIL nije direktan skup instrukcija običnog procesora.",
    ["cil", "jit", "old-exam", "dotnet"]
  ),
  choice(
    30,
    "<p>Koja tvrđenja ispravno opisuju Java kod u obrascu starog roka?</p>",
    [
      "Java izvor se tipično kompajlira u bytecode.",
      "JVM može da interpretira bytecode.",
      "JVM može da kompajlira bytecode u native kod.",
      "Java kod se uvek samo direktno izvršava na fizičkom CPU-u.",
      "Reči kompajlira i interpretira moraju opisivati međusobno isključive ekosisteme."
    ],
    [0, 1, 2],
    "Stari rok je prihvatao i kompajliranje i interpretaciju. Preciznije, izvor se kompajlira u bytecode, a JVM zatim može kombinovati interpreter i JIT kompilaciju.",
    ["java", "jvm", "bytecode", "old-exam"]
  ),
  short(
    31,
    "<p>Koja faza tipično prijavljuje nepoznat znak u izvornom programu?</p>",
    "Leksička analiza",
    ["leksicka analiza", "leksicki analizator", "skener"],
    "Nepoznat znak sprečava skener da formira važeći leksem i token, pa je problem leksički.",
    ["lexical-analysis", "errors"]
  ),
  short(
    32,
    "<p>Kako se zove konkretan niz znakova, kao što je <code>suma</code>, koji skener klasifikuje tokenom <code>ID</code>?</p>",
    "Leksem",
    ["leksem"],
    "Leksem je konkretan tekst u programu, dok je ID njegova kategorija tokena.",
    ["lexemes", "tokens"]
  ),
  short(
    33,
    `<p>Napiši troadresni kod za <code>r = p + q * 2</code> koristeći privremene promenljive <code>t1</code> i <code>t2</code>. Naredbe razdvoji tačka-zarezom.</p>`,
    "t1 = q * 2; t2 = p + t1; r = t2",
    ["t1=q*2;t2=p+t1;r=t2", "t1 = q * 2; t2 = p + t1; r = t2"],
    "Najpre se izračunava proizvod, zatim zbir, pa se rezultat dodeljuje promenljivoj r.",
    ["intermediate-code", "three-address-code"]
  ),
  short(
    34,
    "<p>Koja su dva najkraća stringa jezika opisanog regularnim izrazom <code>(0|1)(01)*</code>? Napiši ih redom kao <code>0,1</code>.</p>",
    "0,1",
    ["0,1", "0, 1"],
    "Ponavljanje (01)* može se primeniti nula puta, pa ostaje obavezan samo prvi bit: 0 ili 1.",
    ["regular-expressions", "language-membership"]
  ),
  short(
    35,
    `<p>Koji od stringova <code>aaxby</code>, <code>axey</code> i <code>abxcd</code> pripada jeziku?</p><pre><code>A -&gt; B x C y
B -&gt; B D | D
C -&gt; B | B y B
D -&gt; a | b | c | d</code></pre>`,
    "aaxby",
    ["aaxby"],
    "Za aaxby, prvi B daje aa, a C preko B daje b. axey sadrži nedozvoljeno e, a abxcd nema obavezno završno y.",
    ["cfg", "string-membership", "old-exam"]
  ),
  short(
    36,
    "<p>Kako se zove procesorski nezavisan međukod koji tipično proizvodi C# kompajler?</p>",
    "CIL",
    ["cil", "common intermediate language", "msil", "il"],
    "CIL je Common Intermediate Language, istorijski često nazivan MSIL ili IL.",
    ["cil", "dotnet", "intermediate-code"]
  ),
  short(
    37,
    "<p>Kako se zove Microsoft-ova implementacija CLI-ja za .NET?</p>",
    "CLR",
    ["clr", "common language runtime"],
    "CLI je standard infrastrukture, a CLR je Microsoft-ov konkretan Common Language Runtime.",
    ["cli", "clr", "dotnet"]
  ),
  short(
    38,
    "<p>Koji alat tipično prevodi datoteku <code>.java</code> u JVM bytecode?</p>",
    "javac",
    ["javac"],
    "Java kompajler javac proizvodi .class datoteke sa JVM bytecode-om.",
    ["java", "javac", "bytecode"]
  ),
  short(
    39,
    "<p>Kako se zove optimizacija koja izraz <code>3 * 4</code> tokom kompajliranja zamenjuje vrednošću <code>12</code>?</p>",
    "Konstantno savijanje",
    ["konstantno savijanje", "constant folding", "constant-folding"],
    "Kada su operandi poznate konstante, kompajler može unapred izračunati rezultat uz očuvanje semantike.",
    ["optimization", "constant-folding"]
  ),
  short(
    40,
    `<p>U kom opsegu se nalazi simbol <code>x</code> koji se pronalazi za upotrebu unutar bloka?</p><pre><code>globalni opseg: x : int
  opseg funkcije: p : bool
    opseg bloka: x : string</code></pre>`,
    "U opsegu bloka",
    ["u opsegu bloka", "opseg bloka", "blok", "najblizi opseg", "najbliži opseg"],
    "Pretraga počinje u najbližem opsegu, pa unutrašnji x tipa string zaklanja globalni x.",
    ["symbol-table", "scope", "shadowing"]
  )
];
