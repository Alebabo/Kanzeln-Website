# Kanzen Signature Beauty – Website

Statische One-Page-Website für Kanzen (Laser-Haarentfernung & Hautbehandlungen, Frankfurt).
Live: https://kanzen-aesthetics.de (Vercel-Projekt `coming-soon`)

## Struktur

| Pfad | Inhalt |
|---|---|
| `src/index.html` | **Hier wird gearbeitet.** Die eigentliche Website (HTML/CSS/JS in einer Datei). |
| `scripts/build.mjs` | Verschlüsselt `src/index.html` und erzeugt die passwortgeschützte Coming-Soon-Seite. |
| `src/impressum.html`, `src/datenschutz.html`, `src/legal.css` | Rechtstexte – werden beim Build unverschlüsselt nach `public/` kopiert. |
| `public/index.html` | Build-Ergebnis – wird deployed. Nicht von Hand bearbeiten. |

## Passwortschutz

Besucher sehen nur „Coming Soon“. Klick darauf öffnet ein Passwortfeld; mit dem richtigen
Passwort wird die Website im Browser entschlüsselt (AES-GCM, PBKDF2). Ohne Passwort ist der
Inhalt auch im Quelltext nicht lesbar.

Passwort ändern: `SITE_PASSWORD=neuesPasswort npm run build`
(ohne Variable wird das aktuelle Standardpasswort verwendet).

## Workflow

```bash
npm run dev      # src/ lokal ansehen (ohne Passwort)
npm run build    # public/index.html neu erzeugen
```

Nach jeder Änderung an `src/index.html` **immer `npm run build` ausführen** und
`public/index.html` mit committen.

## Offene Punkte vor Launch

- [ ] Telefonnummer, E-Mail, Adresse im Skript unter `CONTACT` eintragen (Buttons erscheinen automatisch)
- [x] Fotos für alle drei Behandlungen (Carbon Peel & Microneedling: Unsplash-Lizenz)
- [ ] Eigene Studio-/Behandlungsfotos, sobald vorhanden
- [ ] Logo-Datei
- [ ] Impressum & Datenschutz: Entwürfe in `src/impressum.html` / `src/datenschutz.html` – [Platzhalter] füllen und prüfen lassen
- [x] „Mehr erfahren“ öffnet die passende FAQ-Antwort (Unterseiten optional später)
- [ ] Echte Google-Rezensionen eintragen (`REVIEWS`, `GOOGLE_RATING`, `GOOGLE_PROFILE_URL`) – Testeinträge entfernen
- [x] Schriften lokal gehostet (`public/assets/fonts`), keine Verbindung zu Google Fonts
- [ ] Beim Launch: Passwortschutz entfernen (`src/index.html` direkt als `public/index.html`) und `noindex` raus
