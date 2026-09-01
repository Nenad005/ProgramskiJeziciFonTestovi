# Dodavanje sadržaja

`questions.generated.json` sadrži migrirana pitanja iz dva stara HTML testa.
Nova pitanja se dodaju u `questions/custom.ts` ili u dodatne fajlove u istom
direktorijumu. Svako pitanje mora imati stabilan, globalno jedinstven `id`, jednu
lekciju i najmanje jedan konceptualni tag.

`old-exams.generated.json` sadrži pitanja iz Markdown transkripata u
`../transcripts`. Posle izmene transkripata fajl se ponovo generiše komandom
`npm run content:old-exams`. Uvoznik u `tools/import-old-exams.mjs` primenjuje
kuratorske `exclusions` i `overrides`: OCR greške se popravljaju prema smislu
pitanja, a stavke koje nije moguće pouzdano rekonstruisati se izostavljaju.
Zato generisani testovi predstavljaju kurirani izbor, a ne kompletan prepis roka.

Testovi su definisani u `catalog.ts` i samo referenciraju ID-jeve pitanja. Novo
pitanje može zato pripadati većem broju budućih testova bez kopiranja sadržaja.

## Novi test

1. Dodaj pitanja u `questions/custom.ts` i proveri ih šemom iz `schema.ts`.
2. Dodaj definiciju testa u `tests` niz u `catalog.ts`.
3. Navedi stabilan `slug`, pripadajuće lekcije i `questionIds`.
4. Pokreni `npm test` i `npm run build`.

`tools/extract-questions.mjs` služi samo za ponovljivu migraciju dva originalna
HTML testa. Komanda `npm run content:extract` menja samo generisani JSON i ne
dodiruje nova pitanja iz `questions/` direktorijuma.
