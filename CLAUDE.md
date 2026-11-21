# MarekMarek.com

Marka osobista „Marek, twórca marek”. Lead magnet: Sprint: 7x e-mail z wideo. Newsletter: Weekly Impuls. Całość po polsku.

Nazwa lead magnetu to „Sprint: 7x e-mail z wideo” (wcześniej „Sprint: 7x Impuls” - zmienione, bo było niezrozumiałe; decyzja Marka, 2026-11-21). „Impuls” zostaje jako określenie pojedynczego e-maila („każdy e-mail to impuls do działania”) i w nazwie Weekly Impuls. Skrót w przyciskach: „Sprint 7x”. Każdy dzień sprintu to jeden obszar firmy: strategia i decyzje, sprzedaż, marka, marketing, dane, realizacja i procesy, Twoja firma.

## Zasada nadrzędna: zaufanie przed konwersją

To jest marka osobista. Marek woli mniej kliknięć i niższą konwersję niż utratę zaufania do siebie (decyzja Marka, 2026-11-21). W praktyce:

- przy wyborze między mocniejszym a uczciwszym sformułowaniem wygrywa uczciwsze,
- żadnego clickbaitu, sztucznej pilności ani obietnic bez pokrycia,
- nie wymyślamy historii, liczb ani przykładów z firm Marka; czego nie wiemy, oznaczamy `[TU: …]`,
- ograniczenie dostępu do 10 dni tłumaczymy wprost („sprint, nie biblioteka”), bez straszenia.

## Odpowiedzi na maile

Marek nie zakłada newslettera, w którym czyta i odpisuje na każdą odpowiedź (decyzja Marka, 2026-11-21). Na stronie nie obiecujemy „odpisz, przeczytam / odpowiem”. Uwaga: sekwencja maili w `content/03` i `content/04` oraz skrypt wideo w `content/02` wciąż zawierają takie zaproszenia i obietnicę z maila 7 - do przerobienia po decyzji Marka.

## Fakty

- Spółki: Pravna, Nowy Etap, **Risify** (nie „Rightsify”), Budaro.
- Liczby i media do użycia: patrz `README.md` (źródło: foundersai.pl). Przychód podajemy jako „ponad 35 mln zł” / „>35 mln zł” (wybór Marka).
- Oceny Google: Pravna 4,7 (1000+), Nowy Etap 4,8 (850+), Risify 4,8 (120+), Budaro 5,0 (25+).
- Liczba klientów: Pravna 21 000+, Nowy Etap 7000+, Risify 5000+, Budaro 100+.
- Nie kopiujemy grafiki foundersai.pl - stamtąd pochodzą tylko dane i zdjęcia.

## Język

Nie używamy: „zrewolucjonizuj swój biznes”, „zarabiaj dzięki AI”, „sekrety AI”, „magiczny prompt”, „gwarantowany wynik”, „AI zrobi wszystko za Ciebie”, „kurs, który odmieni Twoje życie”.

Używamy: „impuls do działania”, „realne przykłady”, „z moich projektów”, „do przełożenia na Twój biznes”, „bez hype’u”, „nie do kolekcjonowania”, „jeden ruch do przodu”, „AI jako narzędzie właściciela firmy”, „marki, sprzedaż, procesy, dane”.

Nie używamy długiego myślnika (pauzy) - zawsze zwykły łącznik „-” (decyzja Marka, 2026-11-21).

Ton: praktyk, nie guru. Konkretnie, osobiście, z lekką autoironią. Tam, gdzie się da, formy neutralne płciowo wobec odbiorcy.

## Wygląd

Motyw „Social Bold (Growth)” (wybór Marka, 2026-11-21): kolor główny `#7C3AED`, żółty `#FACC15` **tylko dla przycisków CTA** (i tła finałowej sekcji zapisu), podświetlenie słów i ozdobniki w fiolecie (wyjątki: tytuł nad boksem z firmami, pierwszy tydzień na osi impulsów na stronie głównej i 7 dni na osi w sekcji „Czym jest Sprint” są żółte), kolor dodatkowy `#111827`, tekst `#FFFFFF`, tło `#1E1B4B`. Tokeny są na górze `site/styles.css`.

Gdzieniegdzie klimat blueprintu, zawsze fioletowy: siatka kreślarska (`.bp`), znaczniki narożne (`.marks`), przerywane linie, etykiety pismem maszynowym („Fig. 01”). Oszczędnie - nie na każdej sekcji. Logotypy spółek są ciemne, więc stoją na białej karcie w 5 kolumnach (liczba klientów + ocena Google); gdy rząd nie mieści się na ekranie, boks przypina się i przewijanie w dół przesuwa rząd w bok. Przyciski CTA mają wspólną animację (puls + przebłysk). Logotypy mediów: białe, jednokolorowe PNG w `site/img/media/` (wycięte z plików foundersai.pl), pokazywane małe. Przy CTA zawsze informacja, że sprint jest bezpłatny. Finał landingu: sekcja w kolorze akcentu z ciemną siatką blueprintu, fioletowy kontener zapisu „wyskakuje” przy przewijaniu; landing nie ma stopki.

Logo: „MAREK” dwa razy, drukowanymi, jedno pod drugim - górne ucięte w połowie od dołu, dolne nachodzi na nie.

## Formularz

Pola: imię i e-mail, razem z przyciskiem w osobnym kontenerze. Na jednym ekranie ma być widoczne tylko jedno CTA (dlatego w nagłówku nie ma przycisku). W mailach powitanie `Cześć {{imie}},`. Pod każdym formularzem: informacja „Bezpłatnie” i zdanie o zgodzie na maile.

## Struktura

- `content/` - źródło prawdy dla tekstów.
- `site/` - statyczna strona złożona z tych tekstów: `/` (o Marku), `/sprint7x/` (landing sprintu), `/dziekuje/` (po zapisie). Zmieniając tekst, zmień oba miejsca.
