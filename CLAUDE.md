# MarekMarek.com

Marka osobista „Marek, twórca marek”. Lead magnet: Sprint: 7x e-mail z wideo. Newsletter: Weekly Impuls. Całość po polsku.

Nazwa lead magnetu to „Sprint: 7x e-mail z wideo” (wcześniej „Sprint: 7x Impuls” — zmienione, bo było niezrozumiałe; decyzja Marka, 2026-11-21). „Impuls” zostaje jako określenie pojedynczego e-maila („każdy e-mail to impuls do działania”) i w nazwie Weekly Impuls. Skrót w przyciskach: „Sprint 7x”. Każdy dzień sprintu to jeden obszar firmy: strategia i decyzje, sprzedaż, marka, marketing, dane, realizacja i procesy, Twoja firma.

## Zasada nadrzędna: zaufanie przed konwersją

To jest marka osobista. Marek woli mniej kliknięć i niższą konwersję niż utratę zaufania do siebie (decyzja Marka, 2026-11-21). W praktyce:

- przy wyborze między mocniejszym a uczciwszym sformułowaniem wygrywa uczciwsze,
- żadnego clickbaitu, sztucznej pilności ani obietnic bez pokrycia,
- nie wymyślamy historii, liczb ani przykładów z firm Marka; czego nie wiemy, oznaczamy `[TU: …]`,
- ograniczenie dostępu do 10 dni tłumaczymy wprost („sprint, nie biblioteka”), bez straszenia.

## Fakty

- Spółki: Pravna, Nowy Etap, **Risify** (nie „Rightsify”), Budaro.
- Liczby i media do użycia: patrz `README.md` (źródło: foundersai.pl). Przychód podajemy jako „ponad 35 mln zł” / „>35 mln zł” (wybór Marka).
- Oceny Google: Pravna 4,7 (1000+), Nowy Etap 4,8 (850+), Risify 4,8 (120+), Budaro 5,0 (25+).
- Nie kopiujemy grafiki foundersai.pl — stamtąd pochodzą tylko dane i zdjęcia.

## Język

Nie używamy: „zrewolucjonizuj swój biznes”, „zarabiaj dzięki AI”, „sekrety AI”, „magiczny prompt”, „gwarantowany wynik”, „AI zrobi wszystko za Ciebie”, „kurs, który odmieni Twoje życie”.

Używamy: „impuls do działania”, „realne przykłady”, „z moich projektów”, „do przełożenia na Twój biznes”, „bez hype’u”, „nie do kolekcjonowania”, „jeden ruch do przodu”, „AI jako narzędzie właściciela firmy”, „marki, sprzedaż, procesy, dane”.

Ton: praktyk, nie guru. Konkretnie, osobiście, z lekką autoironią. Tam, gdzie się da, formy neutralne płciowo wobec odbiorcy.

## Wygląd

Motyw „Social Bold (Growth)” (wybór Marka, 2026-11-21): kolor główny `#7C3AED`, akcent i podświetlenie słów `#FACC15`, kolor dodatkowy `#111827`, tekst `#FFFFFF`, tło `#1E1B4B`. Tokeny są na górze `site/styles.css`.

Gdzieniegdzie klimat blueprintu, zawsze fioletowy: siatka kreślarska (`.bp`), znaczniki narożne (`.marks`), przerywane linie, etykiety pismem maszynowym („Fig. 01”). Oszczędnie — nie na każdej sekcji. Logotypy spółek są ciemne, więc stoją na białej karcie, pod każdym ocena Google. Logotypy mediów: białe, jednokolorowe PNG w `site/img/media/` (wycięte z plików foundersai.pl), pokazywane małe. Przy CTA zawsze informacja, że sprint jest bezpłatny. Finał landingu: sekcja w kolorze akcentu z ciemną siatką blueprintu, fioletowy kontener zapisu „wyskakuje” przy przewijaniu; landing nie ma stopki.

## Formularz

Pola: imię i e-mail. W mailach powitanie `Cześć {{imie}},`. Pod każdym formularzem: informacja „Bezpłatnie” i zdanie o zgodzie na maile.

## Struktura

- `content/` — źródło prawdy dla tekstów.
- `site/` — statyczna strona złożona z tych tekstów: `/` (o Marku), `/sprint7x/` (landing sprintu), `/dziekuje/` (po zapisie). Zmieniając tekst, zmień oba miejsca.
