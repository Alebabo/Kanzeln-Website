// Build: Website und Rechtstexte unverändert nach public/ kopieren (kein Passwortschutz mehr).
import { copyFileSync } from 'fs';
for (const f of ['index.html', 'impressum.html', 'datenschutz.html', 'legal.css', 'robots.txt', 'sitemap.xml'])
  copyFileSync(new URL('../src/' + f, import.meta.url), new URL('../public/' + f, import.meta.url));
console.log('public/ aktualisiert');
