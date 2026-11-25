# Kanzen Signature Beauty – Website

Statische One-Page-Website für Kanzen (Laser-Haarentfernung & Hautbehandlungen, Frankfurt).
Live: https://kanzen-aesthetics.de (Vercel-Projekt `coming-soon`)

## Struktur

| Pfad | Inhalt |
|---|---|
| `src/index.html` | **Hier wird gearbeitet.** Die eigentliche Website (HTML/CSS/JS in einer Datei). |
| `scripts/build.mjs` | Kopiert `src/` nach `public/` (läuft automatisch bei Vercel). |
| `src/impressum.html`, `src/datenschutz.html`, `src/legal.css` | Rechtstexte – werden beim Build unverschlüsselt nach `public/` kopiert. |
| `public/index.html` | Build-Ergebnis – wird deployed. Nicht von Hand bearbeiten. |

## Workflow

```bash
npm run dev      # src/ lokal ansehen (ohne Passwort)
npm run build    # src/ nach public/ kopieren
```

Nach Änderungen in `src/` `npm run build` ausführen und `public/` mit committen.

## Offene Punkte vor Launch

- [ ] Telefonnummer, E-Mail, Adresse im Skript unter `CONTACT` eintragen (Buttons erscheinen automatisch)
- [x] Fotos für alle drei Behandlungen (Carbon Peel & Microneedling: Unsplash-Lizenz)
- [ ] Eigene Studio-/Behandlungsfotos, sobald vorhanden
- [ ] Logo-Datei
- [ ] Impressum & Datenschutz: Entwürfe in `src/impressum.html` / `src/datenschutz.html` – [Platzhalter] füllen und prüfen lassen
- [x] „Mehr erfahren“ öffnet die passende FAQ-Antwort (Unterseiten optional später)
- [ ] Echte Google-Rezensionen eintragen (`REVIEWS`, `GOOGLE_RATING`) – Testeinträge entfernt
- [x] Schriften lokal gehostet (`public/assets/fonts`), keine Verbindung zu Google Fonts
- [x] Passwortschutz entfernt
