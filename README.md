# Kanzen Signature Beauty – Website

Statische One-Page-Website für Kanzen (Laser-Haarentfernung & Hautbehandlungen, Frankfurt).
Live: https://kanzen-aesthetics.de (Vercel-Projekt `coming-soon`)

## Struktur

| Pfad | Inhalt |
|---|---|
| `src/index.html` | **Hier wird gearbeitet.** Die eigentliche Website (HTML/CSS/JS in einer Datei). |
| `scripts/build.mjs` | Verschlüsselt `src/index.html` und erzeugt die passwortgeschützte Coming-Soon-Seite. |
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

- [ ] Echte Telefonnummer / WhatsApp (`tel:` und `wa.me`-Link), Adresse
- [ ] Fotos statt Platzhalter (`.ph`-Divs durch `<img>` ersetzen)
- [ ] Logo-Datei
- [ ] Impressum & Datenschutz (Pflicht!)
- [ ] Unterseiten der Behandlungen (Links laufen aktuell ins Leere)
- [ ] Farb-Switcher entfernen, sobald die Palette steht
- [ ] Google-Bewertungs-Widget
- [ ] Beim Launch: Passwortschutz entfernen (`src/index.html` direkt als `public/index.html`) und `noindex` raus
