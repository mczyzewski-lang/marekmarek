# MarekMarek.com - treści

Komplet treści dla marki osobistej „Marek, twórca marek”: lead magnet **Sprint: 7x e-mail z wideo** i newsletter **Weekly Impuls**.

## Pliki

| Plik | Zawartość |
|---|---|
| `content/00-strona-glowna.md` | Strona główna o Marku |
| `content/01-landing-page.md` | Landing sprintu (`/sprint7x/`): hero + 5 alternatywnych nagłówków, problem, format, dla kogo, 7 impulsów, kim jestem, CTA końcowe, FAQ |
| `content/02-thank-you-page.md` | Strona po zapisie + skrypt wideo 60–90 s |
| `content/03-sprint-maile-0-4.md` | Harmonogram sekwencji, maile 0–4 ze scenariuszami wideo |
| `content/04-sprint-maile-5-9.md` | Maile 5–7 ze scenariuszami wideo, mail 8 (koniec dostępu), mail 9 (przejście do Weekly Impuls) |
| `content/05-weekly-impuls.md` | Format Weekly Impuls + 5 szkiców pierwszych wydań |
| `content/06-warianty-copy-i-reklamy.md` | 10 nagłówków, 10 CTA, 10 tematów maili, 5 opisów, 5 reklam Meta/TikTok |
| `site/` | Statyczna strona: `index.html` (o Marku), `sprint7x/index.html` (landing sprintu), `dziekuje/index.html` (po zapisie, adres `/dziekuje/`), `styles.css`, `app.js`, `img/` |
| `assets/foundersai/` | Zdjęcie Marka, zdjęcie zespołu, logotypy spółek i mediów pobrane z foundersai.pl |

## Dane przeniesione z foundersai.pl

Użyte w landing page’u (pasek zaufania, sekcja „Kim jestem”) i w reklamach:

- 4 spółki, 120+ osób w zespołach, ~35 mln zł rocznego przychodu
- Pravna (usługi prawne online), Budaro (domy modułowe), Risify (psychoterapia online), Nowy Etap (mediacje)
- Media: Rzeczpospolita, Interia, Puls Biznesu, Onet, Business Insider, TVP, Forbes, TVN24

Niewykorzystane, ale dostępne na tamtej stronie: przychody i liczby klientów poszczególnych spółek, oceny Google, „Top 500 Google Ads Spent (PL)”.

## Do sprawdzenia przed publikacją

1. **Formularz zapisu nie jest podpięty.** W `site/app.js` stała `SIGNUP_ENDPOINT` jest pusta: formularz tylko przenosi na `/dziekuje/` i nikogo nie zapisuje. Trzeba wpisać adres z systemu mailowego. Brakuje też linku do polityki prywatności i wideo na stronie po zapisie.
2. **Miejsca `[TU: …]` w scenariuszach i szkicach Weekly Impuls.** To miejsca na prawdziwe przykłady z firm - celowo niewymyślone.
3. **Zdania w pierwszej osobie o przeszłości Marka** (np. „przez pierwsze miesiące używałem AI głównie do pisania tekstów”, „miałem raporty, których nie czytałem”, folder z nieudanymi reklamami). Napisane jako prawdopodobne, ale tylko Marek wie, czy są prawdziwe. Co nieprawdziwe - wyciąć.
4. **Mail 4:** zdanie, że reklamy sprintu powstały z polecenia pokazanego w mailu, będzie prawdą tylko wtedy, gdy rzeczywiście tak powstaną.
5. **Długość wideo.** FAQ mówi „kilka minut”; scenariusze są pisane na 4–6 minut plus pokaz ekranu.
6. **Obietnica osobistej odpowiedzi** (maile 7 i 8). Przy ruchu płatnym odpowiedzi może być dużo - warto ustalić, kto i w jakim czasie odpisuje.
7. **Harmonogram:** dostęp wygasa w dniu 10, przypomnienie idzie w dniu 9, mail o Weekly Impuls w dniu 11. Dzień 8 i 10 są bez wysyłki.
8. **Dane osobowe w AI.** Maile 2 i 5 przypominają o anonimizacji danych klientów przed wklejeniem do AI - zostawić.

## Deploy (Railway / Railpack)

Strona jest statyczna. Plik `Staticfile` w głównym folderze (`root: site`) mówi Railpackowi, żeby serwował folder `site/`. `.dockerignore` wyklucza z buildu wszystko poza `site/` i `Staticfile`. Ścieżki w HTML są bezwzględne (`/styles.css`, `/img/...`), więc lokalnie stronę trzeba otwierać przez serwer:

```bash
python3 -m http.server -d site 8080
```
